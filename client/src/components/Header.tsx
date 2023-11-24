import { Typography } from "@material-tailwind/react"
import { Link, useNavigate } from "react-router-dom"

export function Header(){
    let navigate = useNavigate()
    return(
        <div className="flex shadow-md border-none">
            <div className="pl-4 p-1 items-center">
            <Link to={'/'}>
                <img src="/ai(1).png" width={50} height={50} alt="logo"/>
            </Link>
            </div>
            <div className="items-center pt-2">
                <Link to={'/'}>
                    <Typography variant="h4" color="gray">chatRooom</Typography>
                </Link>
            </div>
        </div>
    )
}

