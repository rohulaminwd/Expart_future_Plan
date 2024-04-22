import React from 'react';
import { IoMdClose } from "react-icons/io";
import { FaArrowRight, FaBlogger } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import DashRoutes from '../../data/others';

const DashboardMenu = ({ me, setMenu }) => {
    return (
        <>
            <div>
                <input type="checkbox" id="dash-menu" className="modal-toggle" />
                <div className="modal modal-middle h-screen shadow-none bg-base-100">
                    <div className="p-5 bg-base-100 h-screen flex justify-between flex-col !shadow-none w-full rounded-none">
                        <div>
                            <div className='flex px-2 items-center justify-between'>
                                <h3 className='text-2xl font-bold'>Menu</h3>
                                <label htmlFor="dash-menu" className="">
                                    <IoMdClose size={24} />
                                </label>
                            </div>
                            <hr className='my-5' />
                            <ul className="menu bg-base-100">
                                {DashRoutes?.map((item, index) => (
                                    <li key={index} onClick={() => setMenu(false)} className="font-bold my-1">
                                        <NavLink
                                            to={item?.path}
                                            className={({ isActive }) =>
                                                isActive
                                                    ? "border-r-[4px] border-purple-600 rounded-l-md text-purple-600 bg-gradient-to-r from-[#fff] to-purple-200"
                                                    : "hover:bg-gradient-to-r from-[#fff] to-purple-100 hover:border-r-[4px] border-purple-300"
                                            }
                                        >
                                            {item?.icon}
                                            <h1
                                                className={`origin-left whitespace-nowrap duration-300 font-medium`}
                                            >
                                                {item?.label}
                                            </h1>
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='border-t pt-5'>
                            <li className="pl-2 ml-0 list-none">
                                <div className="w-full p-0 d dropdown-top">
                                    <div className='flex w-full justify-between items-center'>
                                        <div className='flex items-center gap-x-2'>
                                            <Link to={"/dashboard/me"} >
                                                <label
                                                    htmlFor="dash-menu"
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
                                            </Link>
                                            <h1 className="text-xl py-1 text-blue-900">
                                                {me?.name?.firstName} {me?.name?.lastName}
                                            </h1>
                                        </div>
                                        <label htmlFor="dash-menu" className="text-gray-600">
                                            <FaArrowRight size={24} />
                                        </label>
                                    </div>

                                </div>
                            </li>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardMenu;