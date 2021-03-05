'use strict';

const io = require('socket.io-client');
const faker = require('faker');
const supportServer = io.connect('http://localhost:3000/support');

supportServer.emit('getAll');

setInterval(() => {
    const newObj = new Student();
    supportServer.emit('help-ticket', newObj);
}, 3000)

supportServer.on('help-ticket', (payload) => {
    console.log(`${payload.TAjobTitle} ${payload.teachingAssistant} will help you shortly!`);
});

supportServer.on('conclusion', payload => {
    setTimeout(() => {
        console.log(`Hope you enjoyed your help ${payload.studentName}! Have a great day!`)
    }, 6000);
})

class Student {
    constructor() {
        this.studentName = faker.name.findName();
        this.supportId = faker.random.uuid();
        this.tableName = faker.music.genre();
        this.TAjobTitle = faker.name.title();
        this.teachingAssistant = faker.name.firstName();
        }
}