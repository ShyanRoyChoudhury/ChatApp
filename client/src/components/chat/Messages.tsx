import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../../App";
import { Typography } from "@material-tailwind/react";

interface MessageProps{
    message: string,
    username: string,
    _createdtime_: number
}

interface MessageComponentProps{
    currentUser: string;
}
interface messagesType{
    message: string,
    username: string,
    _createdtime_: number
}
const Messages:React.FC<MessageComponentProps> = ({currentUser}) => {
    const socket = useContext(SocketContext);
    
    const messageRef = useRef<HTMLDivElement>(null)
    const [messagesReceived, setMessagesReceived ] = useState<MessageProps[]>([]);

    useEffect(() =>{

        const handleMessage = (data: messagesType) => {
            setMessagesReceived((state)=>[
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    _createdtime_: data._createdtime_
                }
            ])
        }
        socket?.on('receive_message', (data: messagesType)=>{
            handleMessage(data)
            
        });
        socket?.on('messages', (data:messagesType) => {
            handleMessage(data)
        })

        return () => {
            socket?.off('receive_message');
            socket?.off('messages');
        }
    },[socket]);
    
    
/*
    useEffect(() => {
        if(messageRef.current){
            messageRef.current.scrollIntoView({ behavior: 'smooth'})
        }
    },[messageRef])

*/  // not working needss fix


    function formatDateFromTimeStamp(timestamp: number){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return(
        <div className=" flex flex-col">
            {messagesReceived.map((msg, i)=>(
            <div className={` ${msg.username===currentUser ? "bg-teal-700 ml-auto": "bg-blue-500"} whitespace-normal overflow-y-auto 
            overflow-x-hidden w-8/12 relative mb-2 p-2 rounded-md`} style={{ wordWrap: 'break-word' }}>
                <div key={i} className="flex ">
                    <div className="flex-shrink-0 ">
                        <Typography variant="h6" >{msg.username}</Typography>
                    </div>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center p-1">
                    <div className="ml-auto text-sm">{formatDateFromTimeStamp(msg._createdtime_)}</div>

                        </div>
                    </div>
                    <br />
                </div>
                <div>
                    <p>{msg.message}</p>
                </div>
                    
            </div>
            ))}
            <div ref={messageRef}></div>

        </div>
    )
}

export default Messages;