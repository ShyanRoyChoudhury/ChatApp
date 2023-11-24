import { usernameAtom } from "../../store/atoms/usernameState";
import TextBox from "./TextBox";
import { useRecoilValue } from 'recoil';
import { Sidebar } from "./Sidebar";
import { Chat } from "./chat/Chat";
interface ChatRoomProps{
    className?: string
}

function ChatPage({ className }: ChatRoomProps): React.ReactElement{

    let usernameState = useRecoilValue(usernameAtom) 
    
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