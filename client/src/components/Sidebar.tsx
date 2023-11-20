import { Button } from "@material-tailwind/react"

interface SidebarProps{
    className?: string
}

export const Sidebar:React.FC<SidebarProps> = ({className}) => {
    return(
        <div>
            <Button className="bg-red-600">Leave</Button>
        </div>
    )
} 