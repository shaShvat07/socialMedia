
module.exports.chatSockets = function(socketServer){

    const io = require('socket.io')(socketServer, {
        cors: {
            origin: "http://localhost:8000",
            methods: ["GET", "POST"],
            transports: ['websocket', 'polling'],
            credentials: true
        },
        allowEIO3: true
    });

    io.sockets.on('connection', function(socket){
        console.log('New Connection Received', socket.id);
    });


}