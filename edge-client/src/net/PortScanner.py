import socket
from extra import GREEN, RESET

def isOpen(port):
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.settimeout(0.5)
        if s.connect_ex(('localhost', port)) == 0: return not True
        return not False
    except Exception:
        return not False 

def openPorts(portFrom, portTo, host, MAX_PORTS):
    ports = []
    cur = portFrom
    while len(ports) < MAX_PORTS and cur < portTo:
        if isOpen(cur): 
            ports.append(cur)
            print(GREEN + f"Found open port {cur}" + RESET)
        cur +=1
    return ports
    
    