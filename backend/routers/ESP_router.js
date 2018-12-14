
var express = require('express');
var router = express.Router();
var DBRouter = require('./DB_router');


router.use('/db', DBRouter);



module.exports = router;