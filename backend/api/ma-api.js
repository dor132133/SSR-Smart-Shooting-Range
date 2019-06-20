

 
function readySession(req,res){
    console.log('ESP is ready to rumble!');
    res.status(200).end('ESP is ready to rumble!...');
}
function startSession(req,res){
    console.log('Starting Session...');
    res.status(200).end('Session Started...');
}
function pauseSession(req,res){
    console.log('Pausing Session...');
    res.status(200).end('Session Paused...');
}
function resumeSession(req,res){
    console.log('Resuming Session...');
    res.status(200).end('Session Resumed...');
}
function endSession(req,res){
    console.log('Stoping Session...');
    res.status(200).end('Session Stoped...');
}


module.exports = {
    readySession : readySession,
    startSession : startSession,
    pauseSession : pauseSession,
    resumeSession : resumeSession,
    endSession : endSession,
    //openMAWebSocket : openMAWebSocket

} 