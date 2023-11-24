function leaveRoom(userId: string, chatRoomUsers:any[]){
    return chatRoomUsers.filter((user) => user.id != userId)
}

export default leaveRoom;