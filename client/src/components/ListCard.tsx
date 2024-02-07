import {
    List,
    ListItem,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";
   
type userData = {
  id?: number,
  name: string
}

  export function ListCard() {

    const socket = useContext(SocketContext);
    const [ chatRoomUsers, setChatRoomUsers ] = useState<userData[]>([]);

    useEffect(() => {
      const handleRoomUsers = (data: userData[]) => {
        setChatRoomUsers(data);
      };
    
      socket?.on('Room_users', handleRoomUsers);
    
      return () => {
        socket?.off('Room_users', handleRoomUsers);
      };
    }, [socket, setChatRoomUsers]);

    return (
      <Card className="h-60 overflow-y-auto w-full">
          {chatRoomUsers.length > 0 && <Typography variant="h5">Users:</Typography>}
        <List>
          {chatRoomUsers.map((user:userData) => (
            <ListItem 
              key={user.id}>
                <div>
                  <Typography variant="h6" color="blue-gray">{user.name}</Typography>  
                </div>
              </ListItem>
          ))}
          
        </List>
      </Card>
    );
  }