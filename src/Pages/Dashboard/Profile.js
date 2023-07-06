import React from "react";
import { useState } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import useMe from "../../Hooks/useMe";
import LogOutModule from "../../Modale/LogOutModule";
import UpdatePassword from "../../Modale/UpdatePassword";
import Loading from "../../Share/Loading";
import bg1 from "../../assets/images/bg-small6.jpg";
import { useContext } from "react";
import { MeContext } from "../../App";
import UserProfileImg from "../../Components/UserProfileImg";
import ProfileInformation from "../../Components/ProfileInformation";
import { BiLogOut } from "react-icons/bi";
import { accountName } from "../../data/accountName";

const Profile = () => {
  const [updateModal, setUpdateModal] = useState(null);
  const [logout, setLogout] = useState(null);
  const [me, isLoading, refetch] = useContext(MeContext);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const cardHandler = (cardName) => {
    const existCard = me?.card?.find((i) => i?.cardName === cardName);
    console.log(existCard);
    return existCard;
  };
  return (
    <div className="">
      {/* ======== */}

      <div className="md:flex gap-3 mt-0 pt-0 sm:mt-4 w-full">
        <div className="w-full z-0 sm:z-[1]">
          <div
            style={{ backgroundImage: `url(${bg1})` }}
            className="bg-cover -z-[0] sm:-z-[1] overflow-hidden w-full relative rounded-b-[100px] h-[280px] sm:h-[320px] bg-gradient-to-t from-cyan-500 to-blue-500"
          >
            <div className="absolute z-10 w-full h-full top-0 left-0 bg-gradient-to-t from-[#52cce7d9] to-[#5270e7d3]">
              <div className="cursor-pointer mb-9 relative w-28 h-28 sm:w-36 sm:h-36 mx-auto flex justify-center pt-6">
                {me?.imageURL && (
                  <div className="avatar">
                    <div className=" w-28 h-28 sm:w-36 sm:h-36 ring-[6px] rounded-full bg-secondary flex items-center justify-center ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                      <img src={me?.imageURL} alt="profile" />
                    </div>
                  </div>
                )}
                {!me?.imageURL && (
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36">
                    <UserProfileImg
                      me={me}
                      textColor="sm:text-[70px] ring-offset-[3px] text-[60px] text-white"
                      className="w-28 h-28 sm:w-36 bg-secondary sm:h-36 ring-[6px] "
                    />
                  </div>
                )}
                <div className="absolute sm:bottom-16 bottom-12 sm:-right-4 -right-3 text-[18px] bg-white border-[4px] border-[#91f2dc] rounded-full w-8 h-8 !grid !place-content-center">
                  <p className="text-green-500 font-bold">
                    {me?.firstName?.slice(0, 1)}
                  </p>
                </div>
              </div>
              <p className="text-3xl mt-3 font-reem font-bold text-white text-center">
                {me?.firstName} {me?.lastName}
              </p>
              <p className="text-xl sm:mt-1 font-bold text-[#f0e0fc] text-center">
                {me?.phoneNumber}
              </p>
            </div>
            <div className="w-full absolute top-2 left-0 flex items-center justify-between px-2">
              <div className="!z-[10000] w-full flex justify-between items-center">
                <label
                  onClick={() => setLogout("logOut")}
                  for="Logout-modal"
                  className=""
                >
                  <div className="cursor-pointer text-white hover:text-accent">
                    <BiLogOut size={24} />
                  </div>
                </label>
                <p className="text-white font-reem text-xl">{me?.balance} $</p>
              </div>
            </div>
          </div>

          <div className="w-full !z-[100] relative -mt-[60px] px-2 sm:px-4">
            <ProfileInformation user={me} setUpdateModal={setUpdateModal} />
          </div>
          <div className="px-2 sm:px-4">
            <div className="w-full border mt-3 sm:mt-5 bg-[#e3fdff]  shadow-md !z-[900] rounded-2xl sm:p-3 p-2">
              <h3 className="text-green-600 text-xl">
                Account Card Information
              </h3>
              {accountName?.map((i) => (
                <div className="flex text-sm sm:text-md py-1 sm:py-2 border-b border-[#c6fbfb] justify-between items-center">
                  <h3 className="">{i?.name}</h3>
                  {cardHandler(i?.name) ? (
                    <h3 className="">{cardHandler(i?.name)?.cardNum}</h3>
                  ) : (
                    <h3>No account card set yet</h3>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ */}

      {updateModal && (
        <UpdatePassword
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          refetch={refetch}
        />
      )}
      {logout && <LogOutModule logout={logout} setLogout={setLogout} />}
    </div>
  );
};

export default Profile;
