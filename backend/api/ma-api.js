


function startSession(req,res){
    const data = req.data;
    console.log(data);
    console.log('Starting Session...');
    res.end('Starting Session...');
}


module.exports = {
    startSession : startSession
}