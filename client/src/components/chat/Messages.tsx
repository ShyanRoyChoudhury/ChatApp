import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../App";
import { Typography } from "@material-tailwind/react";

interface MessageProps{
    message: string,
    username: string,
    _createdtime_: number
}

const Messages = () => {
    let socket = useContext(SocketContext);

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

        return () => socket?.off('receive_message');
    },[socket]);
    
    useEffect(() =>{
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
    }, [socket])

    function formatDateFromTimeStamp(timestamp: number){
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return(
        <div>
            {messagesReceived.map((msg, i)=>(
            <div className="bg-teal-500 relative">
                <div key={i} className="flex">
                    <div><Typography variant="h5">{msg.username}</Typography></div>
                    <div className="absolute right-1">{formatDateFromTimeStamp(msg._createdtime_)}</div>
                </div>
                    <p>{msg.message}</p>
                <br />
            </div>
            ))}

        </div>
    )
}

export default Messages;