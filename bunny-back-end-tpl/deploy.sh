#!/bin/bash

echo "Pulling repository from Github"
git pull

echo "Building application via Docker Compose"
docker-compose up -d --build

#echo "Pulling application image from Docker Hub"
#docker-compose pull

#echo "Building application bunny-back-end-tpl via Docker Compose"
#docker-compose up -d --no-deps bunny-back-end-tpl
