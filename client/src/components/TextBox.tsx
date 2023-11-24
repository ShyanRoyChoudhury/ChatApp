import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { SocketContext } from "../App";
import { useRecoilValue } from "recoil";
import { usernameAtom } from "../../store/atoms/usernameState";
import { roomAtom } from "../../store/atoms/roomState";

type TextBoxProps = {
    className ?: string 
}

export default function TextBox({className}: TextBoxProps): React.ReactElement{

    const [text, setText] = React.useState("");
    
    const socket = React.useContext(SocketContext);
    const name = useRecoilValue(usernameAtom);
    const room = useRecoilValue(roomAtom)

    const handleSendMessage = () => {
      if(text !== ''){
        let _createdtime_ =  Date.now();
        socket?.emit('send_message', {
          name, room, text, _createdtime_
        });
      }
    }

    return(
      <div className={twMerge(`relative flex`, className)} >
        <Input
          type="text"
          label="Message..."
          value={text}
          color="green"
          onChange={(e)=>{setText(e.target.value)}}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
        />
        <Button
          size="sm"
          color={text ? "green" : "light-green"}
          disabled={!text}
          className="!absolute right-2.5 top-1 rounded-full hover:scale-105"
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </div>
    )
}



