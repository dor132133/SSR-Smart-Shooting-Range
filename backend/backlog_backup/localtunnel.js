var localtunnel = require('localtunnel');
 
var tunnel = localtunnel(8081, function(err, tunnel) {
    if (err) 
        throw err;
    console.log(tunnel.url);

   
});
 
setTimeout(()=>{
    tunnel.on('close', function() {
        // tunnels are closed
    });
}, 10000)