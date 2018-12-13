

Mongo on linux:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
//some shell cmds:
//Start mongo server: $sudo service mongod start
//Stop mongo server: $sudo service mongod stop
//restart mongo server: $sudo service mongod restart
//Begin using MongoDB: $mongo



Mongo on docker:
1. pull mongo image from Docker-Hub
2. create docker container:
    sudo docker run -p 27017:27017 --name mongo-cont -d mongo
    -mongo-cont: container-name
    -mongo: image-name
    - -p: expose container's ip to local network 

-----SOME USEFULE DOCKER CMDS-----
#Show docker running containers:
    docker ps 
    docker ps --all
#watching container metadata:
     docker inspect
#get into the running docker machine:
    sudo docker exec -it <container_id> bash
#get into the running docker mongodb:
    sudo docker exec -it <container_id> mongo

-----SOME USEFULE MONGO CMDS-----
#list of databases
    show dbs
#switch database
    use <db-name>
#list of collections
    show collections
