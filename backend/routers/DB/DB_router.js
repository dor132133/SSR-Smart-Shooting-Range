

var express = require('express');
var router = express.Router();
var db = require('../../db/db_utils');


router.get('/collection',db.getCollection);
// router.get('/document',db.getPersonsByAge);
// router.post('/addDocument/',db.addPerson);