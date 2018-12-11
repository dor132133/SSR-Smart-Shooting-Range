

Mongo on linux:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
//some shell cmds:
//Start mongo server: $sudo service mongod start
//Stop mongo server: $sudo service mongod stop
//restart mongo server: $sudo service mongod restart
//Begin using MongoDB: $mongo



Mongo on Docker:
https://hostpresto.com/community/tutorials/communitycreate-a-mongo-db-docker-container-with-attached-storage-volume/
After image creation, create & run the container:
docker run --name mongo-dev -d -v /opt/mongodb:/data/db -p 27017:27017 mongodb

get into the running mongo docker:
sudo docker exec -it <container_id> mongo
