const express = require("express");
const socketio = require('socket.io')
const http = require('http')
const path = require("path");
const app = express()
const sms = require('./model/sms')

const server = http.createServer(app)

const io = socketio(server)
const port = process.env.PORT || 3333
const connect = path.join(__dirname, '../public')
app.use(express.static(connect))

io.on('connection', (socket) => {
    console.log('done');
    socket.on('sendLocation', (data) => {
        console.log(data);
        io.emit('locationMessage', sms(JSON.stringify(data)))

    })
})



server.listen(port, () => {
    console.log(`Running on port: ${port}`);
})