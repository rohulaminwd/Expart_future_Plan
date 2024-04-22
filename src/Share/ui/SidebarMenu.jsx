import React from 'react';
import { AiOutlineHome, AiOutlineLogin, AiOutlineSetting } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { IoMdClose } from "react-icons/io";
import { FaArrowRight, FaBlogger } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdOutlineAccountCircle, MdOutlineDashboardCustomize, MdOutlineManageAccounts } from 'react-icons/md';

const SidebarMenu = ({ me, usertoken, setLogout }) => {
    return (
        <>
            <div>
                <input type="checkbox" id="sidebar-menu" className="modal-toggle" />
                <div className="modal modal-middle h-screen shadow-none bg-base-100">
                    <div className="p-5 bg-base-100 h-screen flex justify-between flex-col !shadow-none w-full rounded-none">
                        <div>
                            <div className='flex px-2 items-center justify-between'>
                                <h3 className='text-2xl font-bold'>Menu</h3>
                                <label htmlFor="sidebar-menu" className="">
                                    <IoMdClose size={24} />
                                </label>
                            </div>
                            <hr className='my-5' />
                            <ul className="menu bg-base-100">
                                <li className="mx-1">
                                    <NavLink
                                        to="/"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-transparent text-primary px-1  rounded-none"
                                                : "px-1 hover:bg-transparent rounded-none "
                                        }
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="font-bold fontSize flex justify-center">
                                                <AiOutlineHome size={24} />
                                            </div>
                                            <span className="ml-1 mt-0  hide-p text-[20px]">
                                                Home
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="mx-1">
                                    <NavLink
                                        to="/about"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-transparent text-primary px-1 rounded-none "
                                                : "px-1 hover:bg-transparent rounded-none "
                                        }
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="font-bold fontSize  flex justify-center">
                                                <BiMessageSquareDetail size={24} />
                                            </div>
                                            <span className="ml-1 mt-0 hide-p text-[20px]">
                                                About
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="mx-1">
                                    <NavLink
                                        to="/blog"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-transparent text-primary px-1  rounded-none "
                                                : "px-1 hover:bg-transparent rounded-none"
                                        }
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="font-bold fontSize text-[18px]  flex justify-center">
                                                <FaBlogger size={24} />
                                            </div>
                                            <span className="ml-1 mt-0 hide-p text-[20px]">
                                                Blog
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="mx-1">
                                    <NavLink
                                        to="/signIn"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-transparent text-primary px-1  rounded-none "
                                                : "px-1 hover:bg-transparent rounded-none"
                                        }
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="font-bold fontSize flex justify-center">
                                                <AiOutlineLogin size={24} />
                                            </div>
                                            <span className="ml-1 mt-0 hide-p text-[20px]">
                                                sign In
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                                <li className="mx-1">
                                    <NavLink
                                        to="/signUp"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "bg-transparent text-primary px-1  rounded-none "
                                                : "px-1 hover:bg-transparent rounded-none"
                                        }
                                    >
                                        <div className="flex justify-center items-center">
                                            <div className="font-bold fontSize text-[18px]  flex justify-center">
                                                <MdOutlineAccountCircle size={24} />
                                            </div>
                                            <span className="ml-1 mt-0 hide-p text-[20px]">
                                                Sign Up Now
                                            </span>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className='border-t pt-5'>
                            <li className="pl-2 ml-0 list-none">
                                {usertoken ? (
                                    <div className="dropdown w-full p-0 d dropdown-top">
                                        <div className='flex w-full justify-between items-center'>
                                            <div className='flex items-center gap-x-2'>
                                                <label
                                                    tabindex="0"
                                                    className="btn btn-ghost btn-circle online avatar"
                                                >
                                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                                        {me?.image && <img src={me?.image} alt="profile" />}
                                                        {!me?.image && (
                                                            <div className="w-full">
                                                                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                                                                    <h2 className="text-xl uppercase font-bold text-white">
                                                                        {me?.name?.firstName?.slice(0, 1)}
                                                                        {me?.name?.lastName?.slice(0, 1)}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </label>
                                                <h1 className="text-xl py-1 text-blue-900">
                                                    {me?.name?.firstName} {me?.name?.lastName}
                                                </h1>
                                            </div>
                                            <label htmlFor="sidebar-menu" className="text-gray-600">
                                                <FaArrowRight size={24} />
                                            </label>
                                        </div>
                                        <ul
                                            tabindex="0"
                                            className="p-2 py-3 shadow-md border text-cyan-800 bg-[#fafbfbbc] border-[#9dbcd5a1] top-[60px] menu menu-compact dropdown-content bg-base-100 rounded-box w-48"
                                        >
                                            <div className="text-center border-b-2 border-blue-200 mb-3">
                                                <div className="avatar online">
                                                    <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        {/* { me?.image? <img src={me?.image} alt='profile' /> : <img src={profile} alt='profile' />} */}
                                                        {me && (
                                                            <div className="w-full">
                                                                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                                                                    <h2 className="text-3xl uppercase font-bold text-white">
                                                                        {me?.name?.firstName?.slice(0, 1)}
                                                                        {me?.name?.lastName?.slice(0, 1)}
                                                                    </h2>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <h1 className="text-xl py-1 text-blue-900">
                                                    {me?.name?.firstName} {me?.name?.lastName}
                                                </h1>
                                            </div>
                                            <li className="font-bold">
                                                <NavLink
                                                    to="/dashboard/"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]"
                                                            : "hover:bg-[#d6f8f5]"
                                                    }
                                                >
                                                    <MdOutlineDashboardCustomize size={"20px"} />
                                                    <h1
                                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                                    >
                                                        Dashboard
                                                    </h1>
                                                </NavLink>
                                            </li>
                                            <li className="font-bold">
                                                <NavLink
                                                    to="/dashboard/me"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]"
                                                            : "hover:bg-[#d6f8f5]"
                                                    }
                                                >
                                                    <MdOutlineManageAccounts size={"20px"} />
                                                    <h1
                                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                                    >
                                                        Update Profile
                                                    </h1>
                                                </NavLink>
                                            </li>
                                            <li className="font-bold">
                                                <NavLink
                                                    to="/dashboard/"
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "border-r-[4px] border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]"
                                                            : "hover:bg-[#d6f8f5]"
                                                    }
                                                >
                                                    <AiOutlineSetting size={"20px"} />
                                                    <h1
                                                        className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                                    >
                                                        Setting
                                                    </h1>
                                                </NavLink>
                                            </li>
                                            <label
                                                onClick={() => setLogout("logout")}
                                                htmlFor="Logout-modal"
                                                className="px-5 hover:text-accent flex items-center gap-2 cursor-pointer"
                                            >
                                                <HiOutlineLogout size={"20px"} /> Sign Out
                                            </label>
                                        </ul>
                                    </div>
                                ) : (
                                    <li className="mx-1">
                                        <NavLink className="" to="/signIn">
                                            <div className="sm:flex justify-center sm:items-center">
                                                <span className="ml-1 mt-0 block text-white sm:text-[18px] text-sm">
                                                    Sign In
                                                </span>
                                            </div>
                                        </NavLink>
                                    </li>
                                )}
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarMenu;