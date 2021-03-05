'use strict';

// Dependencies
const socketio = require('socket.io');

// Creates a Port
const io = socketio(3000);

// Create Namespace
const support = io.of('/support');

const helpQueue = {
    received: {},
    inProgress: {},
    completed: {},
}

support.on('connection', socket => {
    console.log('Support connection created', socket.id);
    
    socket.on('help-ticket', payload => {
        helpQueue.received[payload.messageId] = payload;
        console.
        support.emit('received', payload);
    })

    socket.on('in-progress')

    socket.on('completed')
});
