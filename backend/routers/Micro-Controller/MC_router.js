
var express = require('express');
var router = express.Router();
var DBRouter = require('../routes/DB');


router.use('/DB', DBRouter);