import React, { useState } from 'react';
import './dashboard.css'
import { motion } from "framer-motion"
import {FaChevronLeft} from 'react-icons/fa'
import {MdWorkOutline} from 'react-icons/md'
import {AiOutlineWallet, AiOutlineHome, AiOutlineTeam, AiOutlineProfile} from 'react-icons/ai'
import { NavLink, Link, Outlet } from 'react-router-dom';

const Dashboard = ({applyUsers, userClass}) => {
    const [open, setOpen] = useState(true);
    return (
        <div className="flex">
            <motion.div 
            animate={{ width: !open ? '80px' : '210px',
                transition:{
                    duration: 0.5,
                    type: 'spring',
                    damping: 10, 
                }
            }}
            className="!hidden sm:!block h-screen bg-blue-100 z-20 sm:relative"
            >
                <div className="bg-base-100 hidden sm:block border-r rounded-lg p-2 h-full">
                    <div onClick={() => setOpen(!open)} className={`${!open && "rotate-180"} absolute cursor-pointer p-1 border-white border-2 rounded-full text-primary font-bold top-8 -right-2.5 bg-white`}> <FaChevronLeft /> </div>
                    <div className="flex items-center pt-4">
                        {/* <img src={logo} className={`cursor-pointer w-14 duration-500 ${!open && 'rotate-[360deg]'}`} alt="" /> */}
                        {open && <h1 className={`text-primary ml-2 origin-left text-2xl cursor-pointer whitespace-nowrap duration-300 font-medium`}><Link to='/'>E.F.P USA</Link></h1>}
                        {!open && <h1 className={`text-primary ml-2 origin-left text-2xl cursor-pointer whitespace-nowrap duration-300 font-medium`}><Link to='/'>E.F.P</Link></h1>}
                    </div>
                    <div className="mt-4">
                        <ul className=" menu overflow-y-auto">
                            <li className='font-bold my-1'>
                                <NavLink to='/dashboard/'
                                    className={({ isActive }) =>
                                    isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                                 }
                                >
                                    <AiOutlineWallet size={'20px'} /> 
                                    <h1 className={`origin-left whitespace-nowrap duration-300 font-medium ${!open && 'scale-0 hidden'}`}>Wallet</h1>
                                </NavLink>
                            </li>
                            <li className='font-bold my-1'>
                                <NavLink to='/dashboard/work'
                                className={({ isActive }) =>
                                    isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                                }
                                >
                                    <MdWorkOutline size={'20px'} /> 
                                    <h1 className={`origin-left whitespace-nowrap duration-300 font-medium ${!open && 'scale-0 hidden'}`}>Works</h1>
                                </NavLink>
                            </li>
                            <li className='font-bold my-1'>
                                <NavLink to='/dashboard/team'
                                    className={({ isActive }) =>
                                    isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                                 }
                                >
                                    <AiOutlineTeam size={'20px'} /> 
                                    <h1 className={`origin-left whitespace-nowrap duration-300 font-medium ${!open && 'scale-0 hidden'}`}>Team</h1>
                                </NavLink>
                            </li>
                            <li className='font-bold my-1'>
                                <NavLink to='/dashboard/me'
                                    className={({ isActive }) =>
                                    isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                                 }
                                >
                                    <AiOutlineProfile size={'20px'} /> 
                                    <h1 className={`origin-left whitespace-nowrap duration-300 font-medium ${!open && 'scale-0 hidden'}`}>Profile</h1>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div> 
            </motion.div>
            <div className="bg-[#d7ebe4] flex-1 relative p-2 sm:p-4 h-screen overflow-y-auto">
                <div className="p-2 hidden sm:p-3 border sm:flex justify-between mb-2 sm:mb-3 items-center bg-white rounded-lg">
                    <div className="">
                        <h1 className='text-primary text-sm sm:text-lg md:text-2xl font-bold'>Welcome to Expert Future Plan USA</h1>
                    </div>
                </div>
                <Outlet />
                <div className="fixed px-3 p-1 bottom-0 left-0 border-t border-[#bed6cd] sm:hidden w-full bg-white">
                    <ul className='flex justify-between items-center'>
                        <li className=''>
                            <NavLink to='/'
                                className={({ isActive }) =>
                                isActive ? 'border-b border-primary pt-2 text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                            }
                            >
                                <div className='flex justify-center'>
                                    <AiOutlineHome size={'20px'} /> 
                                </div>
                                <p className={`text-[12px] font-bold`}>Home</p>
                            </NavLink>
                        </li>
                        <li className=''>
                            <NavLink to='/dashboard/'
                                className={({ isActive }) =>
                                isActive ? 'border-b border-primary pt-2 text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                            }
                            >
                                <div className='flex justify-center'>
                                    <AiOutlineWallet size={'20px'} /> 
                                </div>
                                <p className={`text-[12px] font-bold`}>Wallet</p>
                            </NavLink>
                        </li>
                        <li className=''>
                            <NavLink to='/dashboard/work'
                            className={({ isActive }) =>
                                isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                            }
                            >
                                <div className='flex justify-center'>
                                    <MdWorkOutline size={'20px'} /> 
                                </div> 
                                <p className={`text-[12px] font-bold`}>Works</p>
                            </NavLink>
                        </li>
                        <li className=''>
                            <NavLink to='/dashboard/team'
                                className={({ isActive }) =>
                                isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                            }
                            > 
                                <div className='flex justify-center'>
                                    <AiOutlineTeam size={'20px'} /> 
                                </div> 
                                <p className={`text-[12px] font-bold`}>Team</p>
                            </NavLink>
                        </li>
                        <li className=''>
                            <NavLink to='/dashboard/me'
                                className={({ isActive }) =>
                                isActive ? 'border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]' : 'hover:bg-[#d6f8f5]'
                            }
                            >
                                <div className='flex justify-center'>
                                    <AiOutlineProfile size={'20px'} /> 
                                </div> 
                                <p className={`text-[12px] font-bold`}>Profile</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;