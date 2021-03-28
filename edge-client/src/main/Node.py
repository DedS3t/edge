import os
import requests
from utils import getAuth
from extra import getCpuData, getRam
from extra import RED, GREEN , RESET, YELLOW, BLUE
import socketio
import socket
import json
import random
from random import randint  
import string

class Node:

    def __init__(self, port, host, ram, totalNodes, index):
        self.port = port 
        self.host = host
        self.ram = ram 
        self.totalNodes = totalNodes
        self.index = index
        self.isBusy = False
        self.server = socketio.Client()
        self.id = None
        self.token = None
        self.server.connect('http://localhost:3333')
    def create(self):
        
        formData = {
            "host": self.host,
            "port": self.port,
            "mem_avail": self.ram,
            "cpu_avail": getCpuData(),
            "jwt": "Authorization:Bearer " + getAuth()
        }   

        try:
            if randint(1,2) == 1:
                self.server.emit('join-node', {"host_port": f"{self.host}:{self.port}"})
                self.server.emit('create-node', formData)
            else:
                self.server.emit('create-node', formData)
                self.server.emit('join-node', {"host_port": f"{self.host}:{self.port}"})
            
            print(GREEN + f"Succesfully launched node {self.index}" + RESET)
            self.eventSetup()
            
            try:
                self.serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                self.serverSocket.bind((self.host, self.port))
                print(YELLOW + "Started looking for jobs..." + RESET)
            except Exception as e:
                print(RED + f"Error occured, shutting node {self.index} down")
                self.serverSocket.close()
                if os.getenv("debug"):
                    print(str(e))
        except Exception as e:
            print(RED + f"Failed launching node {self.index}" + RESET)
            if os.getenv("debug"):
                print("In create")
                print(str(e))
    def eventSetup(self):
        @self.server.on('node-ping')
        def onPing(data):
            if not self.isBusy:
                self.id = data
                if data != 'none':
                    print(YELLOW + "Getting pinged" + RESET)
                self.server.emit('node-ready',{"jwt": "Authorization:Bearer " + getAuth(), "host": self.host, "port": self.port, "job_uuid": data})
                self.server.emit('node-avail', {"cpu_avail": getCpuData(), "mem_avail":getRam(),"jwt": "Authorization:Bearer " + getAuth(),"host_port":f"{self.host}:{self.port}"})
            else:
                self.server.emit('node-busy', {"jwt": "Authorization:Bearer " + getAuth(), "host": self.host, "port": self.port, "job_uuid": data})
        @self.server.on('node-start')
        def nodeStart(data):
            print(GREEN + "Found job" + RESET)
            self.listenJobs(data["ftp_key"])

    def listenJobs(self, token):
        self.isBusy = True
        try:
            self.serverSocket.listen()
            conn, addr = self.serverSocket.accept()
            with conn:
                requirmentsList = ""
                auth = conn.recv(1024).decode()
                if token not in auth:
                    print(RED + f"Job request not authorized:\nauth is {auth} ")
                    conn.close()
                else:
                    print(GREEN + "Job authorized" + RESET)
                    conn.send("success".encode())

                    requirements = conn.recv(len("requirements")).decode()
                    if "requirements" != requirements:
                        print(RED + "Job failed to send dependencies")
                    else:
                        
                        while True:
                            data = conn.recv(1024)
                            if not data or "--client-done-sending-depen--" in data.decode(): break
                            requirmentsList += data.decode() 
                        print(GREEN + f"Received dependencies" + RESET)
                        conn.send("success".encode())

                        # meta data
                        metaData = conn.recv(1024)
                        metaData = json.loads(metaData.decode())
                        conn.send("received".encode())
                        print(metaData)
                        files = []
                        for _ in range(metaData['files']):
                            file = conn.recv(1024).decode().split(" ")[-1]
                            conn.send(f"starting {file}".encode())
                            breakStr = f"--client-done-sending-{file}-"
                            contents = ""
                            while True:
                                data = conn.recv(1024)
                                if not data: break
                                elif breakStr in data.decode():
                                    contents += data.decode()[:data.decode().find(breakStr)]
                                    break
                                contents += data.decode()
                            files.append({"name": file, "contents": contents})
                            conn.send(f"received {file}".encode())
                            print(f"Received file, size {len(contents)}")
                        print(len(files))
                        conn.close()


                        cwd = os.getcwd()
                        cfd = os.path.dirname(os.path.abspath(__file__))
                        os.chdir(os.path.join(cfd, "docker"))
                        self.container = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(20))
                        '''
                        with open("docker-compose.yaml", "r") as f:
                            data = f.read()
                            startIndex = data.find("container_name: ") + len("container_name: ")
                            endIndex = len(data) - 1
                            while not data[endIndex].isalpha():
                                endIndex -= 1
                            
                            data[startIndex:endIndex] = self.container
                            with open("docker-compose.yaml", "w") as fw:
                                fw.write(data)
                        '''     

                        fileList = os.listdir("src")
                        for tempFile in fileList:
                            os.remove(os.path.join("src",tempFile))

                        with open(os.path.join("src","requirements.txt"), "w") as f:
                            f.write(requirmentsList)

                        for receivedFile in files:
                            if receivedFile["name"] == metaData["entryFile"]:
                                with open(os.path.join("src", "app.py"), "w") as f:
                                    f.write(receivedFile["contents"])         
                            else:
                                with open(os.path.join("src", receivedFile["name"]), "w") as f:
                                    f.write(receivedFile["contents"])
                            print(BLUE + f"Saving file {receivedFile['name']}" + RESET)
                        
                        os.system("./oneshot.sh")
                        with open("logs.txt", "r") as f:
                            os.chdir(cwd)
                            self.server.emit("job-finished",{"output":f.read(),"job_uuid":self.id,"jwt": "Authorization:Bearer " + getAuth()}) 
                        print(GREEN + "Succesfully completed job" + RESET)
                        self.isBusy = False
        except Exception as e:
            print(RED + f"Error occured, shutting node {self.index} down")
            self.serverSocket.close()
            if os.getenv("debug"):
                print("In job listener")
                print(str(e))
                