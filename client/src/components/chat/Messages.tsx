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

const Messages:React.FC<MessageComponentProps> = ({currentUser}) => {
    let socket = useContext(SocketContext);
    
    let messageRef = useRef<HTMLDivElement>(null)
    let [messagesReceived, setMessagesReceived ] = useState<MessageProps[]>([]);

    useEffect(():any =>{
        socket?.on('receive_message', (data)=>{
            //console.log(data);
            setMessagesReceived((state)=>[
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    _createdtime_: data._createdtime_
                }
            ])
        });
        socket?.on('messages', (data) => {
            console.log(data),
            setMessagesReceived((state)=>[
                ...state,
                {
                    message: data.message,
                    username: data.username,
                    _createdtime_: data._createdtime_
                }
            ])
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
            <div className={` ${msg.username===currentUser ? "bg-teal-500 ml-auto": "bg-blue-400"} whitespace-normal overflow-y-auto 
            overflow-x-hidden w-8/12 relative mb-2 p-2 rounded-md`} style={{ wordWrap: 'break-word' }}>
                <div key={i} className="flex ">
                    <div>
                        <Typography variant="h6">{msg.username}</Typography>
                    </div>
                    <div className="absolute right-1 text-sm">{formatDateFromTimeStamp(msg._createdtime_)}</div>
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