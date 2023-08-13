import React, { useContext, useState } from "react";
import bg1 from "../assets/images/banks.jpg";
import { FaPhone } from "react-icons/fa";
import UserProfileImg from "../Components/UserProfileImg";
import ProfileInformation from "../Components/ProfileInformation";

const UserDetails = ({ setOpenUserDetails, refetch, openUserDetails }) => {
  const { name, imageURL, address, phoneNumber, balance, role } =
    openUserDetails;

  return (
    <div>
      <input type="checkbox" id="user-details" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="bg-[#f7f2f7] relative !p-0 mb-10 sm:pb-0  h-screen modal-box w-full sm:!w-11/12 !max-w-5xl">
          <label
            htmlFor="user-details"
            className="btn z-50 btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover -z-10 w-full relative overflow-hidden rounded-b-[100px] h-[280px] sm:h-[320px] bg-gradient-to-t from-cyan-500 to-blue-500"
          >
            <div className="absolute z-10 w-full h-full top-0 left-0 bg-gradient-to-t from-[#52cce7d9] to-[#5270e7d3]">
              <div className="w-full absolute top-3 left-0 flex items-center justify-between px-2">
                <a className="block" href={`tel:${phoneNumber}`}>
                  <button className="btn btn-circle btn-ghost bg-green-200  text-green-700 btn-sm">
                    <span className="">
                      <FaPhone />
                    </span>
                  </button>
                </a>
              </div>
              <div className="cursor-pointer mb-9 relative w-28 h-28 sm:w-36 sm:h-36 mx-auto flex justify-center pt-6">
                {imageURL && (
                  <div className="avatar">
                    <div className=" w-28 h-28 sm:w-36 sm:h-36 ring-[6px] rounded-full bg-secondary flex items-center justify-center ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                      <img src={imageURL} alt="profile" />
                    </div>
                  </div>
                )}
                {!imageURL && (
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                    <UserProfileImg
                      me={openUserDetails}
                      textColor="sm:text-[70px] ring-offset-[3px] text-[60px] text-white"
                      className="w-28 h-28 sm:w-36 bg-secondary sm:h-36 ring-[6px] "
                    />
                  </div>
                )}
              </div>
              <p className="text-3xl mt-3 font-bold text-white text-center">
                {name?.firstName} {name?.lastName}
              </p>
              <p className="text-2xl sm:mt-1 font-bold text-[#f0e0fc] text-center">
                {balance} $
              </p>
            </div>
          </div>

          <div className="w-full -mt-[60px] px-2 sm:px-4">
            <ProfileInformation user={openUserDetails} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
