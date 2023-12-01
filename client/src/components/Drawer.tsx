import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { SocketContext } from "../App";
import { useRecoilValue } from "recoil";
import { IoReorderThreeSharp } from "react-icons/io5";
import { ListCard } from "./ListCard";
import { usernameAtom } from "../../store/atoms/usernameState";
import { roomAtom } from "../../store/atoms/roomState";

export function DrawerComponent() {
  const [openRight, setOpenRight] = React.useState(false);

  let socket = useContext(SocketContext);
  let name = useRecoilValue(usernameAtom);
  let room = useRecoilValue(roomAtom);
  
  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);
 
  let navigate = useNavigate();
  const leaveRoom = () => {
    socket?.emit('leave_room', {name, room})
    navigate('/');
}
  return (
    <div className="">
      <div className="flex flex-wrap gap-4 lg:hidden">
        <div onClick={openDrawerRight}><IoReorderThreeSharp size={30}/></div>
      </div>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 bg-black"
      >
        <div className="relative h-full">

            <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="white">
                chatRooom
            </Typography>
            <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
                </svg>
            </IconButton>
            </div>
            
            <div className="">
                <ListCard />
            </div>
            <div className="absolute bottom-0 w-full">
            <Button size="sm" fullWidth variant="outlined" color="red" onClick={leaveRoom}>
                Leave Room
            </Button>
            
            </div>
        </div>
      </Drawer>
    </div>
  );
}