const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')

io.on('connection', client => {
  client.on('newMessage', data => {
    data.at = new Date().toLocaleString()
    io.sockets.emit('newMessage', data)
  })

  setInterval(() => {
    client.emit('newMessage', { who: 'Server', what: `current server time is ${new Date().toLocaleString()}`, at: new Date().toLocaleString() })
  }, 5000)
})

app.use(express.static(path.resolve(__dirname, 'assets', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'assets', 'index.html'))
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
