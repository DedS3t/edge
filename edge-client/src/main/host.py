from extra import YELLOW, RED, RESET, getRam, HOST_DOCUMENTATION
from net.PortScanner import openPorts
from threading import Thread
from .Node import *
import sys


def handleNode(node):
    print(YELLOW + f"Node {node.index} has {node.ram} available")
    node.create()


def host():
    NUM_OF_NODES = 1
    LOWER_PORT = 1025
    UPPER_PORT = 65534

    if len(sys.argv) == 2: NUM_OF_NODES = 1

    for i in range(len(sys.argv)):
        if sys.argv[i] == "--nodes":
            try:
                NUM_OF_NODES = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--nodes'." + RESET)
                print(HOST_DOCUMENTATION)
                return 
        elif sys.argv[i] == "--port":
            try:
                LOWER_PORT = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--port'" + RESET)
                print(HOST_DOCUMENTATION)
                return
        elif sys.argv[i] == "--uport":
            try:
                UPPER_PORT = int(sys.argv[i+1])
            except Exception:
                print(RED + "Incorrect usage of '--uport'")
                print(HOST_DOCUMENTATION)
                return 
        elif sys.argv[i] == "help" or sys.argv[i] == "--help" or sys.argv[i] == "-help":
            print(HOST_DOCUMENTATION)
            return

    print(YELLOW + f"Searching for {NUM_OF_NODES} available nodes" + RESET)


    ram = getRam()

    ports = openPorts(LOWER_PORT, UPPER_PORT, "127.0.0.1", NUM_OF_NODES)

    print(YELLOW + f"AVAILABLE RAM: {ram}" + RESET)

    nodeThreads = []

    for i in range(len(ports)):
        thread = Thread(target=handleNode, args=(Node(ports[i],'127.0.0.1',ram/len(ports), len(ports), i), ), daemon=True)
        thread.start()
        nodeThreads.append(thread)
    
    for thread in nodeThreads:
        thread.join()

