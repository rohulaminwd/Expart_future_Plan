import React, { useContext, useState } from "react";
import "./dashboard.css";
import { motion } from "framer-motion";
import { FaChevronLeft } from "react-icons/fa";
import { BsPlusCircle, BsPlusCircleFill } from "react-icons/bs";
import { HiArrowSmLeft } from "react-icons/hi";
import {
  MdArrowDropDown,
  MdArrowRight,
  MdOutlineSportsEsports,
  MdSportsEsports,
} from "react-icons/md";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import {
  RiFileInfoFill,
  RiFileInfoLine,
  RiTaskFill,
  RiTaskLine,
  RiTeamFill,
  RiTeamLine,
} from "react-icons/ri";
import { titleMarquee } from "../../data/titleMerqueeData";
import TitleMarquee from "../../Components/TitleMarquee";
import UserProfileImg from "../../Components/UserProfileImg";
import { MeContext } from "../../App";
import DashRoutes from "../../data/others";
import DashboardMenu from "../../Share/ui/DashboardMenu";

const Dashboard = ({ applyUsers, userClass }) => {
  const [me] = useContext(MeContext);
  const [open, setOpen] = useState(true);
  const [menu, setMenu] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const marqueeTitle = titleMarquee?.find((i) => i?.route === pathname);
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className="flex">
      <motion.div
        animate={{
          width: !open ? "80px" : "210px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="!hidden sm:!block h-screen bg-purple-50 z-20 sm:relative"
      >
        <div className="bg-base-100 hidden sm:block border-r rounded-lg p-2 h-full">
          <div
            onClick={() => setOpen(!open)}
            className={`${
              !open && "rotate-180"
            } absolute cursor-pointer p-1 border-white border-2 rounded-full text-purple-700 font-bold top-8 -right-2.5 bg-white`}
          >
            {" "}
            <FaChevronLeft />{" "}
          </div>
          <div className="flex items-center pt-4">
            {/* <img src={logo} className={`cursor-pointer w-14 duration-500 ${!open && 'rotate-[360deg]'}`} alt="" /> */}
            {open && (
              <h1
                className={`text-purple-700 ml-2 origin-left text-2xl cursor-pointer whitespace-nowrap duration-300 font-medium`}
              >
                <Link to="/">E.F.P USA</Link>
              </h1>
            )}
            {!open && (
              <h1
                className={`text-purple-700 ml-2 origin-left text-2xl cursor-pointer whitespace-nowrap duration-300 font-medium`}
              >
                <Link to="/">E.F.P</Link>
              </h1>
            )}
          </div>
          <div className="mt-4">
            <ul className=" menu overflow-y-auto">
              {DashRoutes?.map((item, index) => (
                <li key={index} className="font-bold my-1">
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
                      className={`origin-left whitespace-nowrap duration-300 font-medium ${
                        !open && "scale-0 hidden"
                      }`}
                    >
                      {item?.label}
                    </h1>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
      <div className="bg-gray-100 flex-1 pb-[60px] sm:pb-0 sm:px-4 relative h-screen overflow-y-auto">
        <div className="p-2 sm:p-3 sm:rounded-lg mb-2 sm:mb-3 shadow-md bg-white">
          <div className="flex items-center w-full justify-between">
            <span className="cursor-pointer" onClick={goBack}>
              <HiArrowSmLeft size={24} />
            </span>
            {!marqueeTitle ? (
              <h1 className="text-primary text-sm sm:text-lg md:text-2xl font-bold">
                Expert Future Plan USA
              </h1>
            ) : (
              <div className="text-primary w-full text-sm sm:text-xl xl:text-2xl font-bold">
                <TitleMarquee title={marqueeTitle?.title} />
              </div>
            )}
            <Link to="/dashboard/me">
              <UserProfileImg
                me={me}
                textColor="sm:text-[14px] ring-offset-[1px] text-[12px] text-white"
                className="w-6 h-6 sm:w-8 bg-secondary ring-[#91f2dc] sm:h-8 ring-[2px] "
              />
            </Link>
          </div>
        </div>
        <Outlet />
        <div className="fixed px-3 p-1 py-1.5 bottom-0 left-0 border-t border-[#bed6cd] sm:hidden w-full bg-white">
          <ul className="flex justify-between items-center">
            <li className="">
              <NavLink
                to="/dashboard/"
                className={({ isActive }) =>
                  isActive
                    ? "border-t border-primary pt-2 text-[#156c65] bg-[#d6f8f5]"
                    : "hover:bg-[#d6f8f5]"
                }
              >
                <div className="flex justify-center">
                  {pathname === "/dashboard/" ? (
                    <AiFillHome size={"20px"} />
                  ) : (
                    <AiOutlineHome size={"20px"} />
                  )}
                </div>
                <p className={`text-[12px] font-bold`}>Wallet</p>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/dashboard/about"
                className={({ isActive }) =>
                  isActive
                    ? "border-t border-primary pt-2 text-[#156c65] bg-[#d6f8f5]"
                    : "hover:bg-[#d6f8f5]"
                }
              >
                <div className="flex justify-center">
                  {pathname === "/dashboard/about" ? (
                    <RiFileInfoFill size={"20px"} />
                  ) : (
                    <RiFileInfoLine size={"20px"} />
                  )}
                </div>
                <p className={`text-[12px] font-bold`}>About</p>
              </NavLink>
            </li>
            <li className="text-purple-700 dropdown dropdown-top">
              <label
                onClick={() => setMenu(true)}
                htmlFor="dash-menu"
                className=""
              >
                <div className="flex justify-center">
                  <BsPlusCircleFill size={32} />
                </div>
              </label>
            </li>
            <li className="">
              <NavLink
                to="/dashboard/work"
                className={({ isActive }) =>
                  isActive
                    ? "border-t border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]"
                    : "hover:bg-[#d6f8f5]"
                }
              >
                <div className="flex justify-center">
                  {pathname === "/dashboard/work" ? (
                    <RiTaskFill size={"20px"} />
                  ) : (
                    <RiTaskLine size={"20px"} />
                  )}
                </div>
                <p className={`text-[12px] font-bold`}>Works</p>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/dashboard/team"
                className={({ isActive }) =>
                  isActive
                    ? "border-t border-primary rounded-l-md text-[#156c65] bg-[#d6f8f5]"
                    : "hover:bg-[#d6f8f5]"
                }
              >
                <div className="flex justify-center">
                  {pathname === "/dashboard/team" ? (
                    <RiTeamFill size={"20px"} />
                  ) : (
                    <RiTeamLine size={"20px"} />
                  )}
                </div>
                <p className={`text-[12px] font-bold`}>Team</p>
              </NavLink>
            </li>
          </ul>
          {menu && <DashboardMenu me={me} setMenu={setMenu} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
