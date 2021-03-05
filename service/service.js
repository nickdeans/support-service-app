'use strict';

const io = require('socket.io-client');
const supportServer = io.connect('http://localhost:3000/support');

supportServer.emit('getAll');

supportServer.on('help-ticket', payload => {
    setTimeout(() => {
        supportServer.emit('received', payload);
        console.log(`${payload.studentName} is requesting help at the ${payload.tableName} Table`);
        supportServer.emit('inProgress', payload);
    }, 4000);
})

supportServer.on('helping', payload => {
    setTimeout(() => {
        supportServer.emit('received', payload);
        // supportServer.emit('helping', payload);
        supportServer.emit('completed', payload);
    }, 5000);
})

supportServer.on('conclusion', payload => {
    setTimeout(() => {
        console.log(`Great Help ${payload.teachingAssistant}, Mission Accomplished!`)
    }, 6000);
})

