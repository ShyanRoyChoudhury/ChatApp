import { Typography } from "@material-tailwind/react";
import { twMerge } from "tailwind-merge";
import { AiFillLinkedin } from 'react-icons/ai';
import { RiTwitterXFill } from 'react-icons/ri';
import { BsGithub } from 'react-icons/bs';
import { AiTwotoneHeart } from 'react-icons/ai';

interface FooterProps{
className ?: string;
}

const Footer: React.FC<FooterProps> = ({className}) => {
    
    const bgcolor = 'bg-myColor-800 bg-opacity-10';
    return(
        <div className={twMerge(bgcolor, className)}>
            <div className="md:flex mx-12 md:mx-32">
                <div className="pt-14  md:flex-col w-full md:w-1/2">
                    <div>
                        <Typography variant="h2">Let's keep in touch!</Typography>
                    </div>
                    <div>
                    Find me on any of these platform, I will respond in 1-2 business days.
                    </div>
                    <div className="flex mt-6">
                            <a className='bg-white  shadow-lg font-normal h-10 w-10 
                                            items-center flex justify-center align-center rounded-full 
                                            outline-none focus:outline-none mr-2 text-black' 
                            href='https://github.com/ShyanRoyChoudhury'>
                            <BsGithub/>
                        </a>
                        <a className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 
                                            items-center flex justify-center align-center rounded-full 
                                            outline-none focus:outline-none mr-2" 
                            href='https://linkedin.com/in/shyan-roy-choudhury-79a860198'>
                            <AiFillLinkedin/>
                        </a>
                        <a className="bg-white text-blueGray-800 shadow-lg font-normal h-10 w-10 
                                            items-center flex justify-center align-center rounded-full 
                                            outline-none focus:outline-none mr-2 text-black"
                            href='https://twitter.com/kenobi8356'>
                            <RiTwitterXFill/>
                        </a>
                    </div>
                </div>
                <div className="mt-14 md:flex-col w-full md:w-1/2">
                    <div className="md:flex ">
                        <div className="md:ml-auto">
                            <div className="block uppercase text-sm text-gray-500 ">Useful Links</div>
                            <ul>
                                <li>About</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <hr className="my-6 border-gray-300 mx-12 md:mx-32"></hr>
            <div>
                <div className="justify-center pb-4 flex">
                    <div className="text-sm font-semibold">
                        Made with love by RC
                    </div>
                    <div className="py-0.25 pl-1">
                        <AiTwotoneHeart size={20}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;