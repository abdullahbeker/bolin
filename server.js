const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const path = require('path')

io.on('connection', client => {
  console.log('A client connected')
})

app.use(express.static(path.resolve(__dirname, 'assets', 'dist')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'assets', 'index.html'))
})

http.listen(3000, () => {
  console.log('listening on port 3000')
})
