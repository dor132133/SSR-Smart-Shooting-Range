
var express = require('express');
var router = express.Router();
var maAPI = require('../api/ma-api');

router.get('/ready-session',maAPI.readySession);
router.get('/start-session',maAPI.startSession);
router.get('/pause-session',maAPI.pauseSession);
router.get('/resume-session',maAPI.resumeSession);
router.get('/end-session',maAPI.endSession);

module.exports = router;