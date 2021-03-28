from extra import YELLOW, RESET, RED, GREEN
import requests
import os 
from pathlib import Path



def signup():


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
        createRes = requests.post(f"{HOST}:{PORT}/user/create", json = formData)

        if createRes.status_code != 201:
            print(RED + "There was an error with signup up" + RESET)
            return 
        
        authRes = requests.post(f"{HOST}:{PORT}/user/auth", json = formData)

        if authRes.status_code != 201:
            print(RED + "There was an error with signup up" + RESET)
            return 
        
        with open(os.path.join(str(Path.home()),".config/edge/auth.txt") ,"w") as file:
            file.write(authRes.json()['access_token'])
        print(GREEN + "You have succesfully signed up" + RESET)

    except Exception as e:
        print(RED + "There was an error with signup" + RESET)
        if os.getenv("debug"):
            print(str(e))


