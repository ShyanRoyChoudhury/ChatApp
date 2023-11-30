import { Typography } from "@material-tailwind/react";
import { GoChevronDown } from "react-icons/go";
import RoomCard from "./RoomCard";
import Footer from "./Footer";
function LandingPage(){
    return(
        <div>
            <div className="p-12 md:p-20"></div>
            <div className="px-8 lg:flex lg:pl-20">
                <div className="lg:w1/2">
                    <Typography variant="h1" className="pb-4 text-4xl md:text-6xl">
                    chatRooom: Where Conversations Come to Life!
                    </Typography>
                    <br/>
                    <Typography variant="h4">Connect, Communicate, Collaborate</Typography>
                    <br/>
                    <Typography variant="h6">Discover a new world of seamless communication with chatRooom. 
                        Whether you're chatting with friends, collaborating with colleagues, 
                        or meeting new people, 
                        our chat app is designed to elevate your conversations.
                    </Typography>
                </div>
                <div className="lg:hidden flex-col flex relative pt-40 justify-center items-center animate-pulse">
                    <div className="absolute top-16"><GoChevronDown size={50}/></div>
                    <div className="absolute top-20"><GoChevronDown size={50}/></div>
                    <div className="absolute top-24 "><GoChevronDown size={50}/></div>    
                </div>
                <div className="pt-40 lg:pt-0 justify-center  lg:w-1/2 mx-10 pb-10">
                    <RoomCard />
                </div>
                
            </div>
            <div className="mt-28">
                    <Footer />
            </div>
        </div>
    )
}

export default LandingPage;