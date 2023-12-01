import { Typography } from "@material-tailwind/react"
import { Link, useLocation } from "react-router-dom"
import { DrawerComponent } from "./Drawer";
export function Header(){
    const location = useLocation();

    const isChatPage = location.pathname === '/chat';
    return(
        <div className="flex">
            <div className="flex shadow-md border-none mt-12 px-8 lg:pl-12 w-10/12">
                <div className="lg:pl-12 p-1 items-center">
                <Link to={'/'}>
                    <img src="/ai(1).png" width={50} height={50} alt="logo" className="opacity-80"/>
                </Link>
                </div>
                <div className="items-center pt-2 pl-6">
                    <Link to={'/'}>
                        <Typography variant="h4" className="font:semibold">chatRooom</Typography>
                    </Link>
                </div>
            </div>
            <div className="mt-12 w-2/12">
                {isChatPage && <DrawerComponent />}
            </div>
        </div>
    )
}

