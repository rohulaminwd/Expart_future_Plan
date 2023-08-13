import React from "react";
import UserProfileImg from "./UserProfileImg";

const UsersImg = ({ users }) => {
  return (
    <div>
      <div className="flex justify-center gap-x-3 items-center">
        <p className="text-md text-purple-700 font-bold">{users?.length}</p>
        {users?.slice(0, 3)?.map((x) => (
          <div className="flex items-center">
            <UserProfileImg
              me={x}
              textColor="sm:text-[8px] ring-offset-[1px] text-[8px] text-white"
              className="w-4 h-4 -ml-[1px] ring-[#d391f2] bg-purple-700 ring-[1px] "
            />
          </div>
        ))}
        {users?.length > 3 && (
          <span className="font-bold ml-1 text-lg text-green-500">. . .</span>
        )}
      </div>
    </div>
  );
};

export default UsersImg;
