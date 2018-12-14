

Mongo on linux:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
//some shell cmds:
//Start mongo server: $sudo service mongod start
//Stop mongo server: $sudo service mongod stop
//restart mongo server: $sudo service mongod restart
//Begin using MongoDB: $mongo


Mongo on Docker:
1. pull mongo image from Docker-Hub
    docker pull mongo
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
#get container logs:
    docker container logs [OPTIONS] CONTAINER
        --details		Show extra details provided to logs
        --follow , -f		Follow log output
        --since		Show logs since timestamp (e.g. 2013-01-02T13:23:37) or relative (e.g. 42m for 42 minutes)
        --tail	all	Number of lines to show from the end of the logs
        --timestamps , -t		Show timestamps

-----SOME USEFULE MONGO CMDS-----
#list of databases
    show dbs
#switch database
    use <db-name>
#list of collections
    show collections
