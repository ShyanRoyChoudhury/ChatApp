import Messages from "./Messages";

interface ChatProps{
    children?: string;
}

export function Chat({children}: ChatProps):React.ReactElement{
    return(
        <div className="p-2">
            <Messages />
        </div>
    )
}