#include <bits/stdc++.h>

using namespace std;

bool invalid = false;
vector<string> answers;

int main() {
Q1:
    system("clear");
    cout << "--- Edge installer ---\n" << endl;
    cout << "What OS are you on?" << endl;
    cout << "[0] Windows" << endl;
    cout << "[1] MacOS" << endl;
    cout << "[2] Linux" << endl;
    if (invalid) {
        cerr << "invalid choice!" << endl;
    }
    cout << "Your choice (0-2): ";
    int q1;
    cin >> q1;
    if (!q1) {
        cerr << "Please install and use WSL, then select Linux" << endl;
        exit(1);
    } else if (q1 == 1) {
        cerr << "There is no MacOS support yet.\nUse your favorite Linux container and then select Linux!" << endl;
        exit(1);
    } else if (q1 == 2) {
        invalid = false;
        answers.emplace_back("OS - Linux");
    } else {
        invalid = true;
        goto Q1;
    }

Q2:
    system("clear");
    cout << "--- Edge installer ---\n" << endl;
    for (auto s: answers) {
        cout << s << endl;
    }
    cout << endl;
    cout << "Nice! What package manager do you want to use?" << endl;
    cout << "[0] APT (Debian)" << endl;
    cout << "[1] PACMAN+AUR (Arch), aka yay" << endl;
    cout << "[2] PORTAGE (Gentoo), aka emerge" << endl;
    cout << "[3] I'll manually install dependencies, so just tell me what I need!" << endl;
    // cout << "[4] DNF (Fedora) *not supported yet" << endl;
    // cout << "[5] XBPS+SRC (Void) *not supported yet" << endl;
    if (invalid) {
        cerr << "invalid choice!" << endl;
    }
    cout << "Your choice (0-3): ";
    int q2;
    cin >> q2;
    if (!q2) {
        invalid = false;
        answers.emplace_back("Package manager - APT");
    } else if (q2 == 1) {
        invalid = false;
        answers.emplace_back("Package manager - PACMAN+AUR");
    } else if (q2 == 2) {
        invalid = false;
        answers.emplace_back("Package manager - PORTAGE");
    } else if (q2 == 3) {
        invalid = false;
        answers.emplace_back("Package manager - none");
    } else {
        invalid = true;
        goto Q2;
    }

Q3:
    system("clear");
    cout << "--- Edge installer ---\n" << endl;
    for (auto s: answers) {
        cout << s << endl;
    }
    cout << endl;
    cout << "What init system are you using" << endl;
    cout << "[0] SystemD (Select this if not sure)" << endl;
    cout << "[1] OpenRC" << endl;
    cout << "[2] Don't touch my init system" << endl;
    if (invalid) {
        cerr << "invalid choice!" << endl;
    }
    cout << "Your choice (0-2): ";
    int q3;
    cin >> q3;
    if (!q3) {
        invalid = false;
        answers.emplace_back("Init system - SystemD");
    } else if (q3 == 1) {
        invalid = false;
        answers.emplace_back("Init system - OpenRC");
    } else if (q3 == 2) {
        invalid = false;
        answers.emplace_back("Init system - none");
    } else {
        invalid = true;
        goto Q3;
    }

    /* installing packages */
    system("clear");
    cout << "--- Edge installer ---\n" << endl;
    for (auto s: answers) {
        cout << s << endl;
    }
    cout << endl;
    // python
    cout << "checking for Python 3..." << endl;
    int r1 = system("which python3");
    if (r1) {
        if (q2 == 3) {
            cerr << "You need python3 to continue" << endl;
            exit(1);
        }
        cout << "Installing python3..." << endl;
        if (!q2) {
            cout << "sudo apt install python3" << endl;
            system("sudo apt install python3");
        } else if (q2 == 1) {
            cout << "yay -S python" << endl;
            system("yay -S python");
        } else if (q2 == 2) {
            cerr << "Python should be already installed! What are you smoking?" << endl;
            cerr << "I can't use python (emerge) to install python!!" << endl;
            cerr << "Please fix your system." << endl;
            exit(1);
        }
    } else {
        cout << "Python 3 (python3) found!" << endl;
    }
    // pip
    cout << "checking for Python 3 package manager..." << endl;
    int r2 = system("which pip3");
    if (r2) {
        if (q2 == 3) {
            cerr << "You need pip3 to continue" << endl;
            exit(1);
        }
        cout << "Installing pip3..." << endl;
        if (!q2) {
            cout << "sudo apt install python3-pip" << endl;
            system("sudo apt install python3-pip");
        } else if (q2 == 1) {
            cout << "yay -S python-pip" << endl;
            system("yay -S python-pip");
        } else if (q2 == 2) {
            cout << "sudo emerge -avuUD dev-python/pip" << endl;
            system("sudo emerge -avuUD dev-python/pip");
        }
    } else {
        cout << "Python 3 package manager (pip3) found!" << endl;
    }
    // docker
    cout << "checking for Docker..." << endl;
    int r3 = system("which docker");
    if (r3) {
        if (q2 == 3) {
            cerr << "You need docker to continue" << endl;
            exit(1);
        }
        cout << "Installing docker..." << endl;
        if (!q2) {
            cout << "sudo apt install docker" << endl;
            system("sudo apt install docker");
        } else if (q2 == 1) {
            cout << "yay -S docker" << endl;
            system("yay -S docker");
        } else if (q2 == 2) {
            cout << "sudo emerge -avuUD app-emulation/docker" << endl;
            system("sudo emerge -avuUD app-emulation/docker");
        }
    } else {
        cout << "Docker (docker) found!" << endl;
    }
    // docker-compose
    cout << "checking for Docker Compose..." << endl;
    int r4 = system("which docker-compose");
    if (r4) {
        if (q2 == 3) {
            cerr << "You need docker-compose to continue" << endl;
            exit(1);
        }
        cout << "Installing docker-compose..." << endl;
        if (!q2) {
            cout << "sudo apt install docker-compose" << endl;
            system("sudo apt install docker-compose");
        } else if (q2 == 1) {
            cout << "yay -S docker-compose" << endl;
            system("yay -S docker-compose");
        } else if (q2 == 2) {
            cout << "sudo emerge -avuUD app-emulation/docker-compose" << endl;
            system("sudo emerge -avuUD app-emulation/docker-compose");
        }
    } else {
        cout << "Docker Compose (docker-compose) found!" << endl;
    }

    // start services
    cout << "starting services..." << endl;
    if (!q3) {
        cout << "sudo systemctl enable docker.service" << endl;
        system("sudo systemctl enable docker.service");
        cout << "sudo systemctl start docker.service" << endl;
        system("sudo systemctl start docker.service");
    } else if (q3 == 1) {
        cout << "sudo rc-update add docker default" << endl;
        system("sudo rc-update add docker default");
        cout << "sudo rc-service docker start" << endl;
        system("sudo rc-service docker start");
    }

    // installing executable dependencies
    cout << "installing program dependencies..." << endl;
    cout << "pip3 install --user -r requirements.txt" << endl;
    system("pip3 install --user -r requirements.txt");

    // installing executable
    cout << "installing Edge (edge) to ~/.local/bin/..." << endl;
    system("mkdir ~/.local/");
    system("mkdir ~/.local/bin/");
    system("cp edge ~/.local/bin/edge");
    system("rm -r ~/.local/bin/edge-src/");
    system("cp -r src/ ~/.local/bin/edge-src/");
    system("mkdir ~/.config/");
    system("mkdir ~/.config/edge/");

    cout << "\nEdge has been installed. Reopen your terminal to use Edge" << endl;
    cout << "invoke Edge with `edge` as local user, and make sure ~/.local/bin is on your $PATH" << endl;
}
