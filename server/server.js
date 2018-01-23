const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
//Express will manually setup the http server if you don't.
//In this case we are setting up the server. Two servers are not being created.
//All this is done so we can attach Socket.io directly into our web server.

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    //socket.emit is to specific connection
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); 

    //socket.broadcast.emit is to all connections accept that specific socket
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'Someone just joined the chat'));  
     
    socket.on('createMessage', (newMessage) => {
        console.log('createEmail', newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text))
    });

    socket.on('disconnect', (socket) => { //socket.on lets us setup event handlers for the individual socket
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});