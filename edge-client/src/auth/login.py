
from extra import YELLOW, RESET, RED, GREEN
import requests
import os 
from pathlib import Path


def login():

    username = input("Enter a username ")
    password = input("Enter a password ")

    print(YELLOW + "[LOADING]" + RESET)

    formData = {
        "username": username,
        "password": password 
    }
    HOST = os.getenv("LB_HOST")
    PORT = os.getenv("LB_PORT")
    try:
        req = requests.post(f"{HOST}:{PORT}/user/auth", json = formData)

        if req.status_code != 201:
            print(RED + "There was an error with logging in" + RESET)
            return 
        
        with open(os.path.join(str(Path.home()),".config/edge/auth.txt"),"w") as file:
            file.write(req.json()['access_token'])
        print(GREEN + "You have succesfully logged in" + RESET)
    except Exception as e:
        print(RED + "There was an error with logging in" + RESET)
        if os.getenv("debug"):
            print(str(e))