const express = require('express')
const expressWs = require('express-ws')

const app = express()
expressWs(app)

const port = process.env.PORT || 3001
let connects = []
let numbers = []

app.use(express.static('public'))

app.ws('/ws', (ws, req) => {
  connects.push(ws)

  ws.on('message', (message) => {
    console.log('Received:', message)
    if(message == 'sum'){
      message = 'sum = ';
      let sum = 0
      for (let index = 0; index < numbers.length; index++) {
        sum += numbers[index]
      }
      message += sum
    }else if(message == 'ave'){
      message = 'sum = ';
      let sum = 0
      for (let index = 0; index < numbers.length; index++) {
        sum += numbers[index]
      }
      message += sum / numbers.length
    }else if(message == 'show'){
      message = 'show numbers:';
      for (let index = 0; index < numbers.length; index++) {
        message += numbers.index + ' '
      }
    }else if(message == 'clear'){
      numbers = []
      message += sum / numbers.length
    } else{
      numbers.push(Number(message))
      message = 'push' + message
    }

    connects.forEach((socket) => {
      if (socket.readyState === 1) {
        // Check if the connection is open
        socket.send(message)
      }
    })
  })

  ws.on('close', () => {
    connects = connects.filter((conn) => conn !== ws)
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
