import {
    List,
    ListItem,
    ListItemPrefix,
    Avatar,
    Card,
    Typography,
  } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../App";
   
  export function ListCard() {

    let socket = useContext(SocketContext);
    let [ chatRoomUsers, setChatRoomUSers ] = useState([]);

    useEffect(():any => {
      socket?.on('Room_users', (data)=>{
        console.log(data);
        setChatRoomUSers(data)
        console.log(chatRoomUsers)
      })

      return () => socket?.off('Room_users');
    }, [socket]);

    /*
    
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="candice" src="https://docs.material-tailwind.com/img/face-1.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Tania Andrew
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Software Engineer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="alexander" src="https://docs.material-tailwind.com/img/face-2.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                Backend Developer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <Avatar variant="circular" alt="emma" src="https://docs.material-tailwind.com/img/face-3.jpg" />
            </ListItemPrefix>
            <div>
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                UI/UX Designer @ Material Tailwind
              </Typography>
            </div>
          </ListItem>

          */
    return (
      <Card className="h-60 overflow-y-scroll w-full">
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