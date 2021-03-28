
import psutil 

def getRam():
    return psutil.virtual_memory().available


def getCpuData():
    return psutil.cpu_freq().current * (100 - (sum(psutil.cpu_percent(percpu = True)) / psutil.cpu_count())) * psutil.cpu_count(logical=False)