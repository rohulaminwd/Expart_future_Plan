import { Button, CopyButton } from "@mantine/core";
import React, { useState, useContext } from "react";
import taka from "../../assets/icons/taka (1).png";
import taka2 from "../../assets/icons/taka1 (2).png";
import taka3 from "../../assets/icons/taka1 (3).png";
import reffer from "../../assets/icons/refer.svg";
import taka6 from "../../assets/icons/taka1 (1).png";
import { MeContext, UserContext } from "../../App";
import Loading from "../../Share/Loading";
import team from "../../assets/lottie/team.json";
import UserInfo from "../../Modale/UserInfo";
import Lottie from "lottie-react";

const Team = () => {
  const [me, meLoading] = useContext(MeContext);
  const [users, userLoading] = useContext(UserContext);
  const referCode = me?.myReferralCode;
  const [userInfo, setUserInfo] = useState(null);

  const myReferralUser = users?.filter((i) =>
    i?.referCode?.includes(referCode)
  );

  if (meLoading || userLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-full">
      <div className="">
        <div className="text-center font-reem pattern-planbg border-t-0 border sm:border-2 rounded-t-[10px] sm:border-t-0 border-purple-200 text-gray-800 pb-8 p-3 py-5 sm:p-5 rounded-b-[100px] bg-white">
          <div className="mb-10">
            <div className="w-full">
              <Lottie
                animationData={team}
                loop={true}
                style={{ height: "200px" }}
              />
            </div>
            <h2 className="text-3xl text-purple-700 sm:text-5xl">
              Invite Your Friends
            </h2>
            <p className="text-[14px] sm:text-[20px] mx-auto mt-2 sm:mt-3 sm:w-[60%] text-purple-500">
              Invite your friends by sharing this refer link and get bonus
            </p>
          </div>
        </div>
        <div className="-mt-[65px] px-2 sm:px-3">
          <div className="flex mx-auto bg-white w-full rounded-xl p-5 px-3 sm:px-5 sm:mt-5 mt-2 gap-2 sm:gap-3 items-center">
            <div className="p-2 sm:p-2 border border-purple-200 w-full rounded-md">
              <p className="text-[12px] sm:text-lg text-purple-700 font-bold">
                https://expart-future-plan.vercel.app/signUp?refer={referCode}
              </p>
            </div>
            <div className="">
              <CopyButton
                value={`https://expart-future-plan.vercel.app/signUp?refer=${referCode}`}
              >
                {({ copied, copy }) => (
                  <Button
                    className={`${copied ? "bg-[#a464ee]" : "bg-[#7e37cf]"}`}
                    onClick={copy}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Button>
                )}
              </CopyButton>
            </div>
          </div>
          <div className="p-3 sm:p-4 mt-5 bg-white w-full rounded-xl">
            <div className="flex justify-between gap-2 sm:gap-5 items-center">
              <label
                onClick={() => setUserInfo(myReferralUser)}
                htmlFor="user-info"
                className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg"
              >
                <div className="w-10 sm:w-16 -ml-1">
                  <img src={taka6} className="w-full" alt="taka" />
                </div>
                <div className="">
                  <h3 className="font-bold text-purple-700 sm:mb-1 text-xl sm:text-2xl">
                    0{myReferralUser ? myReferralUser?.length : "0"}
                  </h3>
                  <h1
                    style={{ lineHeight: "16px" }}
                    className="text-[14px] text-purple-400 sm:text-xl"
                  >
                    Team Size
                  </h1>
                </div>
              </label>
              <div className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg">
                <div className="w-10 sm:w-16 -ml-1">
                  <img src={taka3} className="w-full" alt="taka" />
                </div>
                <div className="">
                  <h3 className="font-bold text-purple-700 sm:mb-1 text-xl sm:text-2xl">
                    12
                  </h3>
                  <h1
                    style={{ lineHeight: "16px" }}
                    className="text-[14px] text-purple-400 sm:text-xl"
                  >
                    Team Investment
                  </h1>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-2 sm:gap-5 mt-3 sm:mt-5 items-center">
              <div className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
                <div className="w-10 sm:w-16 -ml-1">
                  <img src={taka2} className="w-full" alt="taka" />
                </div>
                <div className="">
                  <h3 className="font-bold text-purple-700 sm:mb-1 text-xl sm:text-2xl">
                    05 $
                  </h3>
                  <h1
                    style={{ lineHeight: "16px" }}
                    className="text-[14px] text-purple-400 sm:text-xl"
                  >
                    Tody commission
                  </h1>
                </div>
              </div>
              <div className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg">
                <div className="w-10 sm:w-16 -ml-1">
                  <img src={taka} className="w-full" alt="taka" />
                </div>
                <div className="">
                  <h3 className="font-bold text-purple-700 sm:mb-1 text-xl sm:text-2xl">
                    120 $
                  </h3>
                  <h1
                    style={{ lineHeight: "16px" }}
                    className="text-[14px] text-purple-400 sm:text-xl"
                  >
                    Team commission
                  </h1>
                </div>
              </div>
            </div>
            <div className="p-3 gap-1 sm:p-4 mt-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg">
              <div className="w-12 sm:w-16 -ml-1">
                <img src={taka3} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold text-purple-700 text-xl sm:mb-1 sm:text-2xl">
                  20 $
                </h3>
                <h1
                  style={{ lineHeight: "16px" }}
                  className="text-[16px] text-purple-400 sm:text-xl"
                >
                  Monthly commission
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {userInfo && <UserInfo userInfo={userInfo} setUserInfo={setUserInfo} />}
    </div>
  );
};

export default Team;
