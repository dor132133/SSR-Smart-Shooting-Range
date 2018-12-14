
1. initial git rep
2. install nodejs 
3. initial npm project
4. server.js - a primary REST-API with mongoClient
5. set Mongo on Docker: mongo_README.txt
6. create mongodb-init.js: initial database, collections using mongoClient
7. create routing
8. install automatic app restart with npm install -g nodemon


9. Expose local app to the world:
 list of all tcp availble ports in linux: ss -lntu 
    a.ssh -R 80:localhost:8081 ssh.localhost.run
    enable my own "DNS" for ssh tunnel: add the ip/hostname in the local computer /etc/hosts file

10. docker-compose: create 2 docker containers:
     1.rest-app container: using dockerfile (node:latest image)
     2.mongo-cont container: pull mongo image (from Docker-Hub)
     usage:
          1. docker-compose build
          2. docker-compose up
          3. docker compose ps
          4. docker-compose stop
          5. docker-compose down
          6. docker-compose restart
          7. docker-compose logs -follow --timestamps
          8. docker-compose config
     give up mongo Docker