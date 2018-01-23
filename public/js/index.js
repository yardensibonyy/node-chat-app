var socket = io();
//We are not using arrow functions since not all the browsers support them
socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        to:"another guy",
        text:"Hey! How you doin?"
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New Message', message);
});