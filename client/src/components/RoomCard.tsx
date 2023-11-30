import { usernameAtom } from '../../store/atoms/usernameState';
import { roomAtom } from '../../store/atoms/roomState';
import { useContext, useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Select, Option
} from "@material-tailwind/react";

import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../App';
import { twMerge } from 'tailwind-merge';

export default function RoomCard(): React.ReactElement{

const [ name, setName ] = useState('');
const setUsernameState = useSetRecoilState(usernameAtom);
const setRoomState = useSetRecoilState(roomAtom);
const roomState = useRecoilValue(roomAtom);

const socket = useContext(SocketContext)

const navigate = useNavigate();
const handleclick = () =>{
  setUsernameState(name)
  
  if(name && roomState){
    socket?.emit('join_room', { name, room:roomState});
    navigate('/chat');
  }else{
    alert('select name or room');
  }
}
  return (
      
    <div className="flex justify-center">
      <Card className={twMerge(`w-80 md:w-96 bg-myColor-800 bg-opacity-10 rounded-lg`)}>
        <CardHeader
          className="mb-4 grid h-28 place-items-center bg-white bg-opacity-80 hover:bg-green-500"
        >
          <Typography variant="h3" className='text-black '>
            chatRooom
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          <Input variant="outlined" name="name" label="Name" className='text-white'  onChange={(e)=>{setName(e.target.value)}} crossOrigin="anonymous"/>
          <div className="">
          <div>
            <Select label="Select Room">
              <Option onClick={()=>setRoomState('Room 1')}>Room 1</Option>
              <Option onClick={()=>setRoomState('Room 2')}>Room 2</Option>
              <Option onClick={()=>setRoomState('Room 3')}>Room 3</Option>
            </Select>
          </div>
            
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="filled" fullWidth onClick={handleclick} className='bg-black font-bold text-sm'>
            Join Room
          </Button>
        </CardFooter>
      </Card>
      
    </div>
    
  );
}