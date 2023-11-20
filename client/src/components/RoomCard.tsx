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

interface RoomCardProps{
    className ?: string
}

export default function RoomCard({className}: RoomCardProps): React.ReactElement{

const [ name, setName ] = useState('');
const setUsernameState = useSetRecoilState(usernameAtom);
const setRoomState = useSetRecoilState(roomAtom);
const roomState = useRecoilValue(roomAtom);

const socket = useContext(SocketContext)

const navigate = useNavigate();
const usernameState = useRecoilValue(usernameAtom);
const handleclick = () =>{
  setUsernameState(name)
  
  if(usernameState && roomState){
    socket?.emit('join_room', { usernameState, roomState});
    navigate('/chat');
  }else{
    alert('select name or room');
  }
}
  return (
    <div>
      
      <div className="flex justify-center">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input variant="outlined" name="name" label="Name" className='' onChange={(e)=>{setName(e.target.value)}}/>
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
            <Button variant="gradient" fullWidth onClick={handleclick}>
              Join Room
            </Button>
          </CardFooter>
        </Card>
        
      </div>
    </div>
  );
}