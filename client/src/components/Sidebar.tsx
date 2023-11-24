import { Button } from "@material-tailwind/react"
import { ListCard } from './ListCard';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { SocketContext } from "../App";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../../store/atoms/usernameState";
import { roomAtom } from "../../store/atoms/roomState";
interface SidebarProps{
    className?: string
}

export const Sidebar:React.FC<SidebarProps> = ({className}) => {
    let navigate = useNavigate();

    let socket = useContext(SocketContext);
    let name = useRecoilValue(usernameAtom);
    let room = useRecoilValue(roomAtom);
    
    const leaveRoom = () => {
        socket?.emit('leave_room', {name, room})
        navigate('/');
    }
    return(
        <div className="w-full">
            <div className="px-6 pt-40 h-100">
                <ListCard/>
            </div>
            <div className="px-6 pt-20">
                <Button fullWidth className="bg-red-600 shadow-lg hover:bg-red-800"
                    onClick={leaveRoom}>
                        Leave</Button>
            </div>
        </div>
    )
} 