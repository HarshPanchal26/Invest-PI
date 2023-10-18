const { Server: HttpServer } = require('http');
const { Socket, Server , io } = require('socket.io');
const { v4 } = require('uuid');

class ServerSocket {
    io;
    users;

    constructor(server) {
        this.users = {};
        this.io = new Server(server, {
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            // reconnection: true, // Enable reconnection
            // reconnectionAttempts: 3, // Number of reconnection attempts
            // reconnectionDelay: 1000, // Delay between reconnection attempts in milliseconds
            // reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
            cors: {
                origin: 'http://localhost:3000',
                methods: ['GET', 'POST']
            }
        });

        this.io.on('connect', this.StartListeners);
    }

    StartListeners = (socket) => {
        console.log('==========================>>>>Message received from ' + socket.id);

        socket.on('handshake', () => {
            console.info('Handshake From ' + socket.id);
        });

        socket.on('disconnect', () => {
            console.info('Disconnect received from: ' + socket.id);
        });
    }
}

// const ServerSocket = (serverInstance )=>{

// }   

module.exports = { ServerSocket };
