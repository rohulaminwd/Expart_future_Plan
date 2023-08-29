import React, { useContext, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";

const UserInfo = ({ userInfo }) => {
  const user = userInfo[0];
  const type = userInfo[1];
  return (
    <div>
      <input type="checkbox" id="user-info" className="modal-toggle" />
      <div className="modal h-screen modal-middle">
        <div className="modal-box bg-blue-100 h-auto px-3 pt-2 pb-4">
          <label
            htmlFor="user-info"
            className="btn z-50 btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="mt-3 bg-[#f3f9fb] border overflow-hidden rounded-xl border-[#f0d2fc]">
            <h1 className="text-purple-700 border-b bg-[#f0d2fc] py-1 border-[#f0d2fc] px-3 font-bold text-[20px]">
              {type} {user?.length}
            </h1>
            <div className="">
              {user?.map((i, index) => (
                <div
                  key={index}
                  className="py-2 px-3 flex items-center justify-between border-b border-[#f0d2fc]"
                >
                  <div className="flex items-center gap-x-2">
                    <h1 className="font-bold">{index + 1}</h1>
                    <div className="w-6 h-6 grid place-content-center rounded-full bg-[#7e16a0] ring ring-[#d583f5] ring-offset-base-100 ring-offset-1">
                      {!i?.imageURL && (
                        <h2 className="text-white text-[12px] font-bold">
                          {i?.name?.firstName?.slice(0, 1)}
                          {i?.name?.lastName?.slice(0, 1)}
                        </h2>
                      )}
                      {i?.imageURL && (
                        <img
                          src={i?.imageURL}
                          className="w-full rounded-full"
                          alt="pic"
                        />
                      )}
                    </div>
                    <h1 className="flex text-[14px] items-center">
                      {i?.name?.firstName} {i?.name?.lastName}
                    </h1>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <span className="font-bold ml-2 cursor-pointer text-purple-600">
                      <BsInfoCircle size={18} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
