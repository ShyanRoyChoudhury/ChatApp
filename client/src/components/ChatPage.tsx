import { usernameAtom } from "../../store/atoms/usernameState";
import { roomAtom } from "../../store/atoms/roomState";
import TextBox from "./TextBox";
import { useRecoilValue } from 'recoil';
import { Sidebar } from "./Sidebar";

interface ChatRoomProps{
    className?: string
}

function ChatPage({ className }: ChatRoomProps): React.ReactElement{

    let usernameState = useRecoilValue(usernameAtom) 
    let roomState = useRecoilValue(roomAtom);
    console.log('atom:',usernameState)
    return(
        <div className="md:grid md:grid-cols-4">
            <div className="pr-4">
                <Sidebar />
            </div>
            <div className="col-span-3">
                
                <div>
                    
                    {usernameState}
                    {roomState}
                </div>

                <div className="TextBox w-full md:w-3/4">
                    <TextBox className="w-full"/>
                </div>
            </div>

            
        </div>
    )
}

export default ChatPage;