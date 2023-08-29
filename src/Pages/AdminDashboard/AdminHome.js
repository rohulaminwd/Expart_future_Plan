import React, { useContext, useState } from "react";
import taka from "../../assets/icons/taka (1).png";
import taka2 from "../../assets/icons/taka1 (2).png";
import taka3 from "../../assets/icons/taka1 (3).png";
import taka4 from "../../assets/icons/taka1 (4).png";
import taka5 from "../../assets/icons/taka1 (5).png";
import taka6 from "../../assets/icons/taka1 (1).png";
import { UserContext } from "../../App";
import UserProfileImg from "../../Components/UserProfileImg";
import { GrUserAdmin } from "react-icons/gr";
import SubAdminController from "../../Modale/SubAdminController";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

const AdminHome = () => {
  const [subAdminController, setSubAdminController] = useState(null);
  const [users, userLoading, userRefetch, userError, blocked] =
    useContext(UserContext);
  const subAdmin = users?.filter((i) => i?.role?.includes("subAdmin"));
  const admin = users?.find((i) => i?.role?.includes("admin"));
  if (admin) {
    subAdmin.push(admin);
  }
  return (
    <div className="p-2 sm:p-0">
      <div className="sm:mt-5 bg-white overflow-hidden relative rounded-2xl">
        <div className="text-center cursor-pointer sm:mt-3 px-3 py-8 sm:py-12 rounded-2xl">
          <h2 className="text-4xl sm:text-6xl text-purple-700 font-bold">
            100.00 $
          </h2>
          <p className="text-xl text-purple-400 mt-2">Total company Balance</p>
        </div>
        <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -left-10 -top-10"></div>
        <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -bottom-10 -right-10"></div>
        {/* <div className="sm:w-20 sm:h-20 w-16 h-16 absolute opacity-50 rounded-full bg-purple-300 left-5 top-5"></div> */}
      </div>

      <div className="relative sm:mt-5 mt-4 overflow-hidden bg-white rounded-xl p-3 sm:p-4">
        <div className="sm:w-40 -z-1 sm:h-40 w-32 h-32 opacity-30 absolute rounded-full bg-blue-200 -left-10 -top-10"></div>
        <div className="sm:w-40 sm:h-40 w-32 h-32 opacity-30 absolute rounded-full bg-blue-200 -bottom-10 -right-10"></div>
        <div className="flex relative z-50 items-center mb-3 justify-between gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Yesterday Income
                </h1>
              </div>
            </div>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka5} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Yesterday Income
                </h1>
              </div>
            </div>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka3} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Today Income
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center justify-between gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka6} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Weekly Income
                </h1>
              </div>
            </div>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka4} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Monthly Income
                </h1>
              </div>
            </div>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center sm:gap-2">
              <div className="w-9 hidden sm:block sm:w-16 -ml-1">
                <img src={taka2} className="w-full" alt="taka" />
              </div>
              <div className="text-center w-full sm:text-left">
                <h3 className="font font-bold text-purple-700 sm:mb-1 text-lg sm:text-2xl">
                  00 $
                </h3>
                <h1 className="text-[12px] text-purple-400 sm:text-xl">
                  Company Bunas
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative sm:mt-5 mt-4 overflow-hidden bg-white rounded-xl p-0 sm:p-4">
        <div className="sm:w-40 -z-1 sm:h-40 w-32 h-32 opacity-30 absolute rounded-full bg-blue-200 -left-10 -top-10"></div>
        <div className="sm:w-40 sm:h-40 w-32 h-32 opacity-30 absolute rounded-full bg-blue-200 -bottom-10 -right-10"></div>
        <div
          tabIndex={0}
          className="collapse collapse-arrow rounded-lg border border-purple-200 bg-purple-50"
        >
          <div className="collapse-title font-bold text-2xl">
            Sub Admin controller
          </div>
          <div className="collapse-content">
            {subAdmin?.map((i) => (
              <label
                onClick={() => setSubAdminController([i, "active"])}
                htmlFor="subAdmin"
                key={i?._id}
                className={`${
                  i?.subAdminStatus === "active"
                    ? "bg-purple-700 text-white"
                    : "bg-white text-purple-500"
                }  cursor-pointer p-2 sm:p-3 my-2 flex items-center justify-between rounded-md`}
              >
                <div className="flex items-center gap-x-2">
                  <div className="hidden sm:block">
                    <UserProfileImg
                      me={i}
                      textColor="sm:text-[14px] ring-offset-[1px] text-[12px] text-white"
                      className="w-7 h-7 bg-purple-700 ring-[3px] ring-[#c591f2]"
                    />
                  </div>
                  <h2 className="font-bold text-lg">
                    {i?.name?.firstName} {i?.name?.lastName}
                  </h2>
                </div>
                <div className="flex items-center gap-x-2">
                  {i?.subAdminStatus === "active" ? (
                    <span>Active</span>
                  ) : (
                    <span>DeActive</span>
                  )}
                  <span className="font-bold text-xl">
                    <MdOutlineAdminPanelSettings />
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center w-full my-4 justify-between gap-3 sm:gap-6">
        <div className="bg-cover sm:mt-5 w-full bg-white rounded-md">
          <div className="text-center cursor-pointer sm:mt-3 py-3 text-primary shadow-md rounded-md">
            <h2 className="text-xl sm:text-5xl font-bold">100.00 $</h2>
            <p className="text-[14px] sm:text-xl">Total Users</p>
          </div>
        </div>
        <div className="bg-cover w-full sm:mt-5 bg-white rounded-md">
          <div className="text-center cursor-pointer sm:mt-3 py-3 shadow-md text-primary rounded-md">
            <h2 className="text-xl sm:text-5xl font-bold">100.00 $</h2>
            <p className="text-[14px] sm:text-xl">Withdraw Request</p>
          </div>
        </div>
      </div>
      {subAdminController && (
        <SubAdminController
          subAdminController={subAdminController}
          setSubAdminController={setSubAdminController}
          refetch={userRefetch}
        />
      )}
    </div>
  );
};

export default AdminHome;
