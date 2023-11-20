import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";

type TextBoxProps = {
    className ?: string 
}

export default function TextBox({className}: TextBoxProps): React.ReactElement{

    const [text, setText] = React.useState("");
    

    //const onChange = (({ target }: React.ChangeEvent<HTMLInputElement>)=>{setText(target.value)})
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
        >
          Send
        </Button>
      </div>
    )
}



