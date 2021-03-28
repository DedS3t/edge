
import os
from pathlib import Path


def getAuth():
    if os.path.exists(os.path.join(str(Path.home()),".config/edge/auth.txt")):
        with open(os.path.join(str(Path.home()),".config/edge/auth.txt"), "r") as file:
            return file.readline()
    return "-1"