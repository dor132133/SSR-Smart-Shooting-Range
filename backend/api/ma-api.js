


function startSession(req,res){
    const data = req.body;
    console.log(data);
    console.log('Starting Session...');
    res.status(200).end('Starting Session...');
}


module.exports = {
    startSession : startSession
} 