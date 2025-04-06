const {Server} = require('socket.io')
const  http = require('http')
const express = require('express')

const app = express();
const server = http.createServer(app);

function getRecieverSocketId(userId){
    return connectedUsersMap[userId];
}

const connectedUsersMap = {}; //userId

const io = new Server(server,{
    cors : {
        origin : ["http://localhost:5173"]
    }
})
io.on("connection",(socket)=>{

    const userId = socket.handshake.query.userId;
    if(userId) connectedUsersMap[userId] = socket.id;

    io.emit("getOnlineUsers",Object.keys(connectedUsersMap));

    socket.on("disconnect",()=>{

    delete connectedUsersMap[userId];
    
    io.emit("getOnlineUsers",Object.keys(connectedUsersMap));
    
    })
})

module.exports = {app,server,io,getRecieverSocketId}