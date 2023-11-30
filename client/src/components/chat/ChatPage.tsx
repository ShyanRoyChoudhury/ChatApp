
import TextBox from "./TextBox";

import { Sidebar } from "../Sidebar";
import { Chat } from "./Chat";


function ChatPage(): React.ReactElement{
 
    
    return(
        <div className="md:grid lg:grid-cols-4 ">
            <div className="pr-4 hidden lg:flex ">
                <Sidebar className="p-2 "/>
            </div>
            <div className="col-span-3">
                
                <div className="">
                    
                    <Chat />
                </div>

                <div className="TextBox w-full lg:w-9/12 p-4">
                    <TextBox className="w-full"/>
                </div>
            </div>

            
        </div>
    )
}

export default ChatPage;