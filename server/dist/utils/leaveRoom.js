"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function leaveRoom(userId, chatRoomUsers) {
    return chatRoomUsers.filter((user) => user.id != userId);
}
exports.default = leaveRoom;
