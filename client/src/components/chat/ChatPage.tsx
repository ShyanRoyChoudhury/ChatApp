
import TextBox from "./TextBox";

import { Sidebar } from "../Sidebar";
//import { Chat } from "./Chat";
import Messages from "./Messages";
import { usernameAtom } from "../../../store/atoms/usernameState";
import { useRecoilValue } from "recoil";

function ChatPage(): React.ReactElement{
    
    const username = useRecoilValue(usernameAtom)

    return(
        <div>
            <div className="md:grid lg:grid-cols-4 ">
                <div className="pr-4 hidden lg:flex ">
                    <Sidebar className="p-2 "/>
                </div>
                <div className="col-span-3 flex flex-col">                 
                    <div className="p-2 overflow-y-auto flex-grow"
                    style={{height: "76vh"}}>
                        
                        <Messages currentUser={username}/>
                    </div>
                    <div className="TextBox w-full lg:w-9/12 p-4">
                        <TextBox className="w-full"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatPage;