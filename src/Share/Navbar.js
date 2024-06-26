import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";

import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { FaBlogger } from "react-icons/fa";
import { BiMessageSquareDetail } from "react-icons/bi";
import logo from "../assets/images/logo1.png";
import Loading from "./Loading";
import LogOutModule from "../Modale/LogOutModule";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useContext } from "react";
import { MeContext } from "../App";
import { useEffect } from "react";
import {
  MdOutlineDashboardCustomize,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { RiMenuFoldFill } from "react-icons/ri";
import SidebarMenu from "./ui/SidebarMenu";

const Navbar = ({ userClass }) => {
  const usertoken = localStorage.getItem("accessToken");
  const [logout, setLogout] = useState(null);
  const [me, isLoading] = useContext(MeContext);
  const [stickyClass, setStickyClass] = useState("0");

  function stickNavbar() {
    let windowHeight = window.scrollY;
    windowHeight > 200 ? setStickyClass("sticky-nav") : setStickyClass("");
  }

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
  }, []);

  // if (isLoading) {
  //   <Loading />;
  // }

  const navigate = useNavigate();
  // const logOut = () => {
  //   navigate("/");
  //   localStorage.removeItem("accessToken");
  // };

  const menuItems = (
    <>
      <li className="mx-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-transparent text-primary px-3 rounded-none"
              : "px-1 hover:bg-transparent rounded-none mx-3 text-white"
          }
        >
          <div className="sm:flex justify-center sm:items-center">
            <div className="font-bold fontSize text-[18px] sm:hidden flex justify-center">
              <AiOutlineHome />
            </div>
            <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
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
              ? "bg-transparent text-primary px-3 rounded-none "
              : "px-1 hover:bg-transparent rounded-none mx-3 text-white"
          }
        >
          <div className="sm:flex justify-center sm:items-center">
            <div className="font-bold fontSize text-[18px] sm:hidden flex justify-center">
              <BiMessageSquareDetail />
            </div>
            <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
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
              ? "bg-transparent text-primary  px-3 rounded-none "
              : "px-1 hover:bg-transparent rounded-none mx-3 text-white"
          }
        >
          <div className="sm:flex justify-center sm:items-center">
            <div className="font-bold fontSize text-[18px] sm:hidden flex justify-center">
              <FaBlogger />
            </div>
            <span className="ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm">
              Blog
            </span>
          </div>
        </NavLink>
      </li>
    </>
  );

  const ProfileItems = (
    <>
      <li className="pl-2 ml-0 list-none">
        {usertoken ? (
          <div className="dropdown p-0 dropdown-end">
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
    </>
  );
  return (
    <>
      <div
        className={` ${stickyClass} absolute top-0 left-0 duration-300 z-50 font-bold bg-transparent backdrop-blur-sm text-cyan-900 w-full`}
      >
        <div className="navbar px-4 max-w-7xl flex items-center justify-between mx-auto">
          <div className="">
            <img src={logo} className="w-[80px]" alt="logo" />
          </div>
          <div className="hidden md:flex">
            <div className="flex">
              <ul className="menu menu-horizontal mr-5 font-bold p-0">
                {menuItems}
              </ul>
            </div>
            <div>{ProfileItems}</div>
          </div>
          <label htmlFor="sidebar-menu" className=" text-white md:hidden">
            <RiMenuFoldFill size={28} />
          </label>
        </div>
      </div>
      {logout && <LogOutModule logout={logout} setLogout={setLogout} />}
      <SidebarMenu me={me} usertoken={usertoken} setLogout={setLogout} />
    </>
  );
};

export default Navbar;
