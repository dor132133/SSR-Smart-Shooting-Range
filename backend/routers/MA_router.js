
var express = require('express');
var router = express.Router();
var MAapi = require('../api/ma-api');

router.post('/start-session',MAapi.startSession);

module.exports = router;