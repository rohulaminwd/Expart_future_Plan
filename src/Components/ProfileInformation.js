import { Link } from "react-router-dom";
import money from "../assets/icons/money.svg";
import admin from "../assets/icons/admin.svg";
import active from "../assets/icons/activeplan.png";
import password1 from "../assets/icons/password (3).png";
import password3 from "../assets/icons/password (1).png";

const ProfileInformation = ({ user, setUpdateModal }) => {
  return (
    <div className="w-full border bg-[#e3f5ff]  shadow-md !z-[900] rounded-2xl sm:p-3 p-2">
      <div className="flex justify-between w-full gap-2">
        <Link to="/dashboard/planDetails" className="w-full">
          <div className="p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg">
            <div className="w-6 sm:w-12">
              <img src={active} className="w-full" alt="" />
            </div>
            <div>
              <h3 className="text-secondary font-bold sm:text-3xl">Plan</h3>
              <p className="text-xs sm:text-sm">Active</p>
            </div>
          </div>
        </Link>

        <div className="p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg">
          <div className="w-8 sm:w-12">
            <img src={money} className="w-full" alt="" />
          </div>
          <div>
            <h3 className="text-secondary font-bold sm:text-3xl">
              {user?.balance}
            </h3>
            <p className="text-xs sm:text-sm">Balance</p>
          </div>
        </div>

        {user?.role === "admin" && (
          <Link to="/admin-dashboard" className="w-full">
            <div className="p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg">
              <div className="w-6 sm:w-12">
                <img src={admin} className="w-full" alt="" />
              </div>
              <div>
                <h3 className="text-secondary font-bold sm:text-3xl">Admin</h3>
                <p className="text-xs sm:text-sm">Send Sms</p>
              </div>
            </div>
          </Link>
        )}
      </div>

      <div className="flex mt-3 justify-between w-full gap-2">
        <label
          onClick={() => setUpdateModal([user, "bankCard"])}
          htmlFor="update-password"
          className="w-full cursor-pointer"
        >
          <div className="p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg">
            <div className="w-6 sm:w-12">
              <img src={password1} className="w-full" alt="" />
            </div>
            <div>
              <h3 className="text-secondary font-bold sm:text-3xl">Account</h3>
              <p className="text-xs sm:text-sm">Add Account Card</p>
            </div>
          </div>
        </label>

        <label
          onClick={() => setUpdateModal([user, "account"])}
          htmlFor="update-password"
          className="w-full cursor-pointer"
        >
          <div className="p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg">
            <div className="w-6 sm:w-12">
              <img src={password3} className="w-full" alt="" />
            </div>
            <div>
              <h3 className="text-secondary font-bold sm:text-3xl">Password</h3>
              <p className="text-xs sm:text-sm">Update Password</p>
            </div>
          </div>
        </label>
      </div>

      <div className="flex gap-4 sm:text-md items-center mt-2 sm:mt-3 justify-between">
        <div className="w-full">
          <div className="flex py-1 sm:py-2 border-b border-[#c6fbfb] justify-between items-center">
            <h3 className="">Name:</h3>
            <h3 className="">
              {user?.name?.firstName} {user?.name?.lastName}
            </h3>
          </div>
          <div className="flex py-1 sm:py-2 border-b border-[#c6fbfb] justify-between items-center">
            <h3 className="">Phone Number:</h3>
            <h3 className="">{user?.phoneNumber}</h3>
          </div>
          <div className="flex py-1 sm:py-2 border-b border-[#c6fbfb] justify-between items-center">
            <h3 className="">Address:</h3>
            <h3 className="">{user?.Address}</h3>
          </div>
        </div>
      </div>

      <div className="flex w-full py-1 text-sm sm:text-md sm:py-2 justify-between items-center">
        <h3 className="">Bio Date: {user?.bio}</h3>
      </div>
    </div>
  );
};

export default ProfileInformation;
