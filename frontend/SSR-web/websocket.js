


const WebSocket = require('ws')




   console.log('creating....')
    const url = 'ws://192.168.14.184'
    const ws = new WebSocket(url)
    ws.onopen = () => {
      console.log('webSocket connecting successfully!')
      //ws.send('hey')
    }
    ws.onerror = error => {
      console.log('WebSocket error: ', error)
    }
    
    ws.onmessage = (message) => {
      console.log('onMessage!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!s')
      console.log(message.data)
    }
    
    setTimeout(function(){
      ws.send('msg1')
      setTimeout(function(){
        ws.send('finish')
        // ws.close()
      },200)
      // ws.close()
    },10000)


