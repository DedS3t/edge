

FULL_DOCUMENTATION = """
usage: edge login - "log in (you won't be able to use the software without authentication)"
usage: edge signup - "create new account (you won't be able to use the software without authentication)"
usage: edge run "directory" [--cpu num] [--mem num] [--nodes num] [--timeout num] - "Run certain file with dependencies in the pool"
usage: edge host [--nodes num] [--port num] [--uport num] - "Add yourself to the computing pool running multiple nodes"  
"""


RUN_DOCUMENTATION = """
usage: edge run "directory" [--cpu num] [--mem num] [--nodes num] [--timeout num]
    - [--cpu] minimum cpu required to run your job
    - [--mem] minimum memory required to run your job
    - [--timeout] maximum amount of time a node can take before being discarded
    - [--nodes] amount of nodes requested
"Run a certain directory with dependencies in the computing pool."
"""

HOST_DOCUMENTATION = """
usage: edge host [--nodes num] [--port num] [--uport num] 
    - [--nodes] number of nodes to run on your machine
    - [--port] the start of the port search
    - [--uport] the end of the port search
"Add yourself to the computing pool running multiple nodes"
"""

