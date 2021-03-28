import sys 
import os
from extra import RED, RESET, GREEN, YELLOW, RUN_DOCUMENTATION
from utils import getAuth
import socket
import socketio
import uuid
from threading import Thread
import json


def sendFileToNode(nodeData):
    clientSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    clientSocket.connect((nodeData["host"], nodeData["port"]))
    clientSocket.send(nodeData["token"].encode())

    if "success" not in clientSocket.recv(1024).decode():
        print(RED + "Node failed to authenticate" + RESET)
        return 
    
    clientSocket.send("requirements".encode())
    if nodeData["requirements"] != None:
        with open(nodeData["requirements"], "r") as f:
            for line in f:
                clientSocket.send(line.encode())
    clientSocket.send("--client-done-sending-depen--".encode())
    if "success" not in clientSocket.recv(1024).decode():
        print(RED + "Failed to send dependencies to node" + RESET)
        return 
    
    pythonFiles = [file for file in os.listdir(nodeData["folderPath"]) if file.split(".")[-1] == "py"]
    if len(pythonFiles) < 1:
        print(RED + "No python entry points were found for your projects. Python is the only supported language at this point" + RESET)
        exit()
    pythonFile = pythonFiles[0]
    if len(pythonFiles) > 1:
        print(YELLOW + "Found multiple possible entry points to python application; " + ",".join(pythonFiles) + RESET)
        pythonFile = ""
        while pythonFile not in pythonFiles:
            pythonFile = input("Please enter entry point to python application: ")
    
    data = {
        "entryFile": pythonFile,
        "files": len(pythonFiles),
    }

    clientSocket.send(json.dumps(data).encode())
    if "received" not in clientSocket.recv(1024).decode():
        print(RED + "Failed sending metadata to node" + RESET)
        return 
    
    for file in pythonFiles:
        sendFile(clientSocket, file, data)
    
    print(GREEN + "Node has succesfully got the files" + RESET)
    clientSocket.close()

def sendFile(socketConn, file, data):
    print(YELLOW + f"Transfering file {file}..." + RESET)
    socketConn.send(("File: " + file).encode())

    if f"starting {file}" not in socketConn.recv(1024).decode():
        print(RED + f"Failed sending file {file}" + RESET)
        return

    with open(file, "r") as f:
        for line in f:
            socketConn.send(line.encode())
        socketConn.send(f"--client-done-sending-{file}-".encode())
        if f"received {file}" in socketConn.recv(1024).decode():
            print(GREEN + f"Transfered file: {file}" + RESET)
        else:
            print(RED + f"Failed transfering file {file}" + RESET)


def run():
    if len(sys.argv) == 2:
        print(RED + "Missing arguments. " + RESET)
        print(RUN_DOCUMENTATION)
        return

    folderPath = sys.argv[2]
    NODES = 1
    cpu = 0.1
    mem = 0.1
    timeout = 2000
    for i in range(len(sys.argv)):
        if sys.argv[i] == "--nodes":
            try: 
                NODES = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--nodes'." + RESET)
                print(RUN_DOCUMENTATION)
                return 
        elif sys.argv[i] == "--cpu":
            try: 
                cpu = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--cpu'." + RESET)
                print(RUN_DOCUMENTATION)
                return 
        elif sys.argv[i] == "--mem":
            try: 
                mem = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--mem'." + RESET)
                print(RUN_DOCUMENTATION)
                return 
        elif sys.argv[i] == "--timeout":
            try: 
                timeout = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--timeout'." + RESET)
                print(RUN_DOCUMENTATION)
                return 
        elif sys.argv[i] == "help" or sys.argv[i] == "--help" or sys.argv[i] == "-help":
            print(RUN_DOCUMENTATION)
            return
    if not os.path.exists(folderPath):
        print(RED + f"Directory {folderPath} not found")
        return
    requirements = None
    if not os.path.exists(os.path.join(folderPath,"requirements.txt")):
        print(YELLOW + f"Requirements.txt missing in {os.path.dirname(folderPath)}, assuming zero dependencies")
    else:
        requirements = os.path.join(os.path.dirname(folderPath),"requirements.txt")

    job_uuid = str(uuid.uuid4())
    sio = socketio.Client()
    sio.connect("http://localhost:3333")
    params = {
        "nodes": NODES,
        "jwt": "Authorization:Bearer " + getAuth(),
        "mem": mem,
        "cpu": cpu,
        "timeout": timeout,
        "uuid": job_uuid,
    }
    sio.emit('create-job', params)

    threadList = []

    @sio.on("job-created")
    def jobCreated():
        print(GREEN + "Job succesfully createed" + RESET)

        sio.emit("join-job", {"job_uuid": job_uuid})

        @sio.on("node-ready")
        def nodeReady(data):
            print(GREEN + "Node found" + RESET)

            node = {
                "host": data["host"],
                "port": data["port"],
                "token": data["ftp_key"],
                "folderPath": folderPath,
                "requirements": requirements,
            }        
            
            tempThread = Thread(target = sendFileToNode, args=(node, ), daemon=True)
            tempThread.start()
            threadList.append(tempThread)
            @sio.on("job-finished")
            def jobFinished(data):
                print(GREEN + f"Job finished, output is:\n{data['output']}" + RESET)
                exit()
            if(len(threadList) == NODES):
                for thread in threadList: thread.join()