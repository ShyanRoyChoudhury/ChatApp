"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const PORT = 4000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const leaveRoom_1 = __importDefault(require("../utils/leaveRoom"));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});
const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];
io.on('connection', (socket) => {
    console.log(`user connected ${socket.id}`);
    socket.on('join_room', (data) => {
        const { name, room } = data;
        socket.join(room);
        console.log(data);
        let _createdtime_ = Date.now();
        socket.to(room).emit('receive_message', {
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
            const { name, room, text, _createdtime_ } = data;
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
        });
        allUsers.push({ id: socket.id, name, room });
        let chatRoomUsers = allUsers.filter((user) => user.room === room);
        socket.to(room).emit('Room_users', chatRoomUsers); // to other participants
        socket.emit('Room_users', chatRoomUsers); // to sender
        socket.on('leave_room', (data) => {
            const { name, room } = data;
            socket.leave(room);
            console.log('roomleft');
            let _createdtime_ = Date.now();
            allUsers = (0, leaveRoom_1.default)(socket.id, allUsers); //update the all users present in the room
            socket.to(room).emit('Room_users', allUsers);
            socket.to(room).emit('receive_message', {
                message: `${name} has left the chat`,
                username: CHAT_BOT,
                _createdtime_
            });
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected ${socket.id}`);
            allUsers = (0, leaveRoom_1.default)(socket.id, allUsers);
            const rooms = Object.keys(socket.rooms); // getting the rooms user was part of
            rooms.forEach((room) => {
                io.to(room).emit('Room_users', allUsers);
            });
        });
    });
});
server.listen(PORT, () => {
    console.log(`Server  running on port ${PORT}`);
});
