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
        const { name, room } = data;
        socket.join(room);

        console.log(data);
        
        let _createdtime_ = Date.now();
        socket.to(room).emit('receive_message',{
            message: `${name} has joined the Room`,
            username: CHAT_BOT,
            _createdtime_
        });

        socket.emit('receive_message', {
            message: `Welcome ${name}`,
            username: CHAT_BOT,
            _createdtime_
        });

        socket.on('send_message', (data) => {
            const { name, room, text, _createdtime_} = data;
            io.in(room).emit('receive_message', (data));

            // db connection to be added here
            // .......
            //
            //
            //
        })

        allUsers.push({id: socket.id, name, room});
        let chatRoomUsers = allUsers.filter((user)=>user.room === room);
        socket.to(room).emit('Room_users', chatRoomUsers);  // to other participants
        socket.emit('Room_users', chatRoomUsers);   // to sender
    })
});

server.listen(PORT, ()=>{
    console.log(`Server  running on port ${PORT}`);
});
