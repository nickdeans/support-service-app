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
        helpQueue.received[payload.supportId] = payload;
        logger('Help-Ticket', payload);

        support.emit('help-ticket', payload);
    })

    socket.on('inProgress', payload => {
        helpQueue.inProgress[payload.supportId] = payload;
        logger('In Progress', payload);

        socket.emit('helping', payload);      
    })

    socket.on('received', payload => {
        delete helpQueue.received[payload.supportId];
        delete helpQueue.inProgress[payload.supportId];
        delete helpQueue.completed[payload.supportId];

        // logger('helping', payload);
        support.emit('completed', payload);
    })

    socket.on('getAll', () => {
        for(let key in helpQueue.received) {
            socket.emit('help-ticket', helpQueue.received[key]);
        }
        for(let key in helpQueue.inProgress) {
            socket.emit('inProgress', helpQueue.inProgress[key]);
        }
        for(let key in helpQueue.completed) {
            socket.emit('completed', helpQueue.completed[key]);
        }
    })

    socket.on('completed', payload => {
        helpQueue.completed[payload.supportId] = payload;
        logger('Help Ticket Completed', payload)

        support.emit('conclusion', payload);
    })
});


function logger(event, payload){
    let time = new Date();
    console.log({ event, time, payload});
}