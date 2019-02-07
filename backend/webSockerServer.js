





//creates a new server on port 8082
const WebSocket = require('ws')
const wss = new WebSocket.Server({ port: 8082 })
console.log('WebSockerServer listen on localhost:8082...')
wss.on('connection', ws => {
    ws.on('message', message => {
        console.log(`Received message => ${message}`)
    })
    ws.send('ho!') 
})


