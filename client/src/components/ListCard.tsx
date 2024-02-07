import {
    List,
    ListItem,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";
   
  export function ListCard() {

    const socket = useContext(SocketContext);
    const [ chatRoomUsers, setChatRoomUSers ] = useState([]);

    useEffect(():any => {
      socket?.on('Room_users', (data)=>{
        setChatRoomUSers(data)
      })

      return () => socket?.off('Room_users');
    }, [socket]);

    return (
      <Card className="h-60 overflow-y-auto w-full">
          {chatRoomUsers.length > 0 && <Typography variant="h5">Users:</Typography>}
        <List>
          {chatRoomUsers.map((user:any) => (
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