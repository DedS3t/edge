import sys 
from utils import getAuth
from extra import RED, RESET, FULL_DOCUMENTATION
from dotenv import load_dotenv
from auth import login,signup 
from main import run,host
import os
load_dotenv()



def main():
    if len(sys.argv) <= 1:
        print(RED + "Incorrect args" + RESET)
        print(FULL_DOCUMENTATION)
        return

    command = sys.argv[1]

    if command == "login":
        login()
    elif command == "signup":
        signup()
    elif command == "host":
        if getAuth() != "-1": host()
        else: print(RED + "You must be authneticated before running this" + RESET)
    elif command == "run":
        if getAuth() != "-1": run()
        else: print(RED + "You must be authneticated before running this" + RESET)
    elif command == "help" or command == "-help" or command == "--help" or command == "h":
        print(FULL_DOCUMENTATION)
    else:
        print(RED + "Command not found" + RESET)
        print(FULL_DOCUMENTATION)
    


if __name__ == "__main__":
    main()