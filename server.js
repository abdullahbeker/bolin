const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')
const port = process.env.PORT || 3000

io.on('connection', client => {
  client.on('newMessage', data => {
    const date = new Date()
    data.at = `${date.getHours()}:${date.getMinutes()}`
    io.sockets.emit('newMessage', data)
  })

  setInterval(() => {
    const date = new Date()
    client.emit('newMessage', {
      who: 'Server',
      what: `current server time is ${new Date().toLocaleString()}`,
      at: `${date.getHours()}:${date.getMinutes()}`,
    })
  }, 5000)
})

app.use(express.static(path.resolve(__dirname, 'assets', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'assets', 'index.html'))
})

http.listen(port, () => {
  console.log('listening on port 3000')
})
