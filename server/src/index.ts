import express from 'express';
var http = require('http');
import cors from 'cors';
import { Server } from 'socket.io';
const port = 3000 || process.env.PORT;
const app = express();
app.use(cors());
app.use((req, res, next)=> {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
    next();
})
import leaveRoom from '../utils/leaveRoom';

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
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
            socket.to(room).emit('messages', {
                message: text,
                username: name,
                _createdtime_
            });
            socket.emit('messages', {
                message: text,
                username: name,
                _createdtime_
            });
            


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

        socket.on('leave_room', (data)=>{
            const { name, room } = data;
            socket.leave(room);
            console.log('roomleft')
            
            let _createdtime_ = Date.now();
            allUsers = leaveRoom(socket.id, allUsers) //update the all users present in the room
            socket.to(room).emit('Room_users', allUsers)
            
            socket.to(room).emit('receive_message', {
                message: `${name} has left the chat`,
                username: CHAT_BOT,
                _createdtime_
            })
        })

        socket.on('disconnect', () => {     //  handle user disconnect event
            console.log(`User disconnected ${socket.id}`);

            allUsers = leaveRoom(socket.id, allUsers);

            const rooms = Object.keys(socket.rooms); // getting the rooms user was part of

            rooms.forEach((room) => {   // update user list in each rooms
                io.to(room).emit('Room_users', allUsers);
            })
        });

    })
});

server.listen(port, ()=>{
    console.log(`Server  running on port ${port}`);
});
