#!/usr/bin/env sh

sudo docker-compose build &&
sudo docker-compose up;
sudo docker logs container > logs.txt
