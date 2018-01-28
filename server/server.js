const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);

//Express will manually setup the http server if you don't.
//In this case we are setting up the server. Two servers are not being created.
//All this is done so we can attach Socket.io directly into our web server.
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    //socket.on lets us setup event handlers for the individual socket
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }
        let userList = users.getUserList(params.room);
        userList.forEach((user) => {
            if (params.name === user) {
                return callback('Name is already taken in this room. Please chose another.');
            }
        });
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        //io.emit fires to all the connections
        //socket.emit fires to specific connection
        //socket.broadcast.emit fires to all the connections accept that specific socket
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app')); 
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));  
        callback();
    });
    
    socket.on('createMessage', (newMessage, callback) => {
        let user = users.getUser(socket.id);
        if (user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
        }
        callback(); //sets text box to empty string
    });

    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    socket.on('disconnect', () => { 
        let user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });
});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});