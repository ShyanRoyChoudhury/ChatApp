import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
const PORT = 4000;
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

const CHAT_BOT = 'ChatBot';

let chatRoom = '';
let allUsers:any[] = [];

io.on('connection', (socket) =>{
    console.log(`user connected ${socket.id}`)

    socket.on('join_room', (data) => {
        const { username, room } = data;
        socket.join(room);


        let _createdtime_ = Date.now();
        socket.to(room).emit('receive_message',{
            message: `${username} has joined the Room`,
            username: CHAT_BOT,
            _createdtime_
        });

        socket.emit('receive_message', {
            message: `Welcome ${username}`,
            username: CHAT_BOT,
            _createdtime_
        });

        allUsers.push({id: socket.id, username, room});
        let chatRoomUsers = allUsers.filter((user)=>user.room === room);
        socket.to(room).emit('Room_users', chatRoomUsers);  // to other participants
        socket.emit('Room_users', chatRoomUsers);   // to sender
    })
});

server.listen(PORT, ()=>{
    console.log(`Server  running on port ${PORT}`);
});
