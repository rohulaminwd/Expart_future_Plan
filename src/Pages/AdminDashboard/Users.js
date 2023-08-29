import React, { useEffect } from "react";
import { useState } from "react";
import DeleteModalConfirm from "../../Modale/DeleteModalConfirm";
import Loading from "../../Share/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { useContext } from "react";
import { UserContext } from "../../App";
import { BsArrowReturnLeft } from "react-icons/bs";
import { BiBlock } from "react-icons/bi";
import {
  MdAdminPanelSettings,
  MdDelete,
  MdOutlineAdminPanelSettings,
} from "react-icons/md";
import BlockUser from "../../Modale/BlockUser";
import UserDetails from "../../Modale/UserDetails";
import CreateAdmin from "../../Modale/CreateAdmin";

const Users = () => {
  const [users, userLoading, userRefetch, userError, blocked] =
    useContext(UserContext);
  const [deleteModule, setDeletingModal] = useState(null);
  const [openBlock, setOpenBlock] = useState(null);
  const [createAdmin, setOpenCreateAdmin] = useState(null);
  const [openUserDetails, setOpenUserDetails] = useState(null);
  const [data, setData] = useState(users);
  const method = "users";

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setData(users);
  }, [users]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data?.filter((user) =>
    user.name?.firstName.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleClass = (selectData) => {
    if (selectData === "All") {
      return setData(users);
    } else if (selectData === "Blocked") {
      return setData(blocked);
    } else if (selectData === "subAdmin") {
      const data = users?.filter((i) => i?.role?.includes(selectData));
      return setData(data);
    } else if (selectData === "ActivePlan") {
      const ActiveUser = users?.filter((i) => i?.plan?.length > 0);
      return setData(ActiveUser);
    } else if (selectData === "DeActive") {
      const DeActiveUser = users?.filter((i) => i?.plan?.length <= 0);
      return setData(DeActiveUser);
    } else if (selectData === "FreePlan") {
      const ActiveFreePlan = users?.filter((i) => {
        const freePlan = i?.plan?.find((x) => x?.planDuration === "15-Days");
        return freePlan;
      });
      return setData(ActiveFreePlan);
    }
  };

  return (
    <div className="p-2 sm:p-0">
      <div className="text-center w-full flex items-center gap-3 justify-between p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white">
        <div className="">
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearch}
            className="border rounded-3xl w-[150px] sm:w-auto ring-[#b06fff]-focus ring-[#eddeff] border-[#eddeff] ring-2 outline-0 p-1 px-3"
            placeholder="Search User"
            name=""
            id=""
          />
        </div>
        <div
          className={`flex bg-[#f3f9fb] max-w-[500px] border border-[#eddeff] rounded-3xl w-full`}
        >
          <div className="w-[100px] bg-[#eddeff] flex items-center justify-center rounded-r-none rounded-3xl">
            <span className="text-xl font-bold text-purple-700">
              {data?.length}
            </span>
          </div>
          <select
            onChange={(e) => handleClass(e.target.value)}
            className="text-sm border px-3 py-2 rounded-l-none rounded-3xl w-full"
          >
            <option value="All" select>
              All
            </option>
            <option value="subAdmin">SubAdmin</option>
            <option value="ActivePlan">ActivePlan</option>
            <option value="FreePlan">FreePlan</option>
            <option value="DeActive">DeActive</option>
            <option value="InvestUser">InvestUser</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>
      </div>
      <div className="gap-3 h-auto justify-between">
        <div className="w-full max-h-screen overflow-y-scroll">
          <motion.div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredUsers?.map((user) => (
                <>
                  <motion.div
                    key={user._id}
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="bg-cover overflow-hidden cursor-pointer border-[#dedede] border-[1px] hover:border-purple-600 rounded-xl p-3 bg-[#ffffff] shadow-md border-[#eddeff]"
                  >
                    <div className="relative">
                      <div className="flex gap-3 items-center">
                        <label
                          htmlFor="user-details"
                          onClick={() => setOpenUserDetails(user)}
                          className="cursor-pointer"
                        >
                          <div className="w-9 h-9 shadow-md bg-purple-700 rounded-full flex items-center justify-center ring ring-purple-300 ring-offset-base-100 ring-offset-2">
                            <h2 className="text-[18px] uppercase font-bold text-white">
                              {user?.name?.firstName?.slice(0, 1)}
                              {user?.name?.lastName?.slice(0, 1)}
                            </h2>
                          </div>
                        </label>
                        <div className="">
                          <h2 className="text-[16px] font-bold">
                            {user?.name?.firstName} {user?.name?.lastName}
                          </h2>
                          <h2 className="text-[14px]">{user?.role}</h2>
                        </div>
                      </div>
                      <div className="absolute -top-3 grid place-content-center -right-[16px] w-20 h-7 rounded-full bg-[#eddeff] border border-[#e7d5fd] text-purple-700">
                        <h1 className="capitalize p-0 m-0 font-bold">
                          {user?.balance} $
                        </h1>
                      </div>
                      <div className="absolute top-[30px] right-0">
                        <p className="text-[12px]">
                          {format(new Date(user?.createdAt), "PP")}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-[#eddeff] mt-2 pt-2">
                      <a className="block" href={`tel:${user?.phoneNumber}`}>
                        <button className="btn btn-ghost bg-purple-100 hover:text-white hover:bg-purple-700  text-purple-700 btn-xs">
                          <span className="">{user?.phoneNumber}</span>
                        </button>
                      </a>
                      <div className="flex items-center">
                        {user?.role === "user" && (
                          <label
                            onClick={() =>
                              setOpenCreateAdmin([user, "subAdmin"])
                            }
                            htmlFor="createAdmin"
                            className="btn ml-1 px-1 btn-ghost text-[#c945ee] btn-xs"
                            disabled={user?.role === "admin"}
                          >
                            <span className=" text-xl font-bold px-0 mx-0">
                              <MdOutlineAdminPanelSettings size={20} />
                            </span>
                          </label>
                        )}
                        {user?.role === "subAdmin" && (
                          <label
                            onClick={() =>
                              setOpenCreateAdmin([user, "backAdmin"])
                            }
                            htmlFor="createAdmin"
                            className="btn ml-1 px-1 btn-ghost text-[#b73ada] btn-xs"
                            disabled={user?.role === "admin"}
                          >
                            <span className=" text-xl font-bold px-0 mx-0">
                              <MdAdminPanelSettings size={20} />
                            </span>
                          </label>
                        )}
                        {user?.status === "active" && (
                          <label
                            onClick={() => setOpenBlock([user, "block"])}
                            htmlFor="blocked"
                            className="btn ml-1 px-1 btn-ghost text-[#ee4b45] btn-xs"
                            disabled={user?.role === "admin"}
                          >
                            <span className=" text-xl font-bold px-0 mx-0">
                              <BiBlock />{" "}
                            </span>
                          </label>
                        )}
                        {user?.status === "block" && (
                          <label
                            onClick={() => setOpenBlock([user, "unblock"])}
                            htmlFor="blocked"
                            className="btn ml-1 px-1 btn-ghost text-[#929090] btn-xs"
                            disabled={user?.role === "admin"}
                          >
                            <span className=" text-xl font-bold px-0 mx-0">
                              <BsArrowReturnLeft />
                            </span>
                          </label>
                        )}
                        <label
                          onClick={() => setDeletingModal(user)}
                          htmlFor="delete-confirm-modal"
                          className="btn ml-1 px-1 btn-ghost text-red-700 btn-xs"
                          disabled={user?.role === "admin"}
                        >
                          <span className=" text-xl font-bold px-0 mx-0">
                            <MdDelete />{" "}
                          </span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                </>
              ))}
              {!filteredUsers?.length && (
                <div className="text-center w-full mt-8">
                  <h3 className="text-3xl text-purple-700 font-bold">
                    No User Found
                  </h3>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {deleteModule && (
        <DeleteModalConfirm
          deleteModule={deleteModule}
          setDeletingModal={setDeletingModal}
          refetch={userRefetch}
          method={method}
        />
      )}
      {openBlock && (
        <BlockUser
          blocked={openBlock}
          setOpenBlock={setOpenBlock}
          refetch={userRefetch}
        />
      )}
      {createAdmin && (
        <CreateAdmin
          createAdmin={createAdmin}
          setOpenCreateAdmin={setOpenCreateAdmin}
          refetch={userRefetch}
        />
      )}
      {openUserDetails && (
        <UserDetails
          openUserDetails={openUserDetails}
          setOpenUserDetails={setOpenUserDetails}
          method={method}
        />
      )}
    </div>
  );
};

export default Users;
