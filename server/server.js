const path = require('path');
const http = require('http');
var express = require('express');
const socketIO = require('socket.io');

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
    //socket.on lets us setup event handlers for the individual socket
    socket.on('disconnect', (socket) => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});