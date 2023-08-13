import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlansModale from "../../Modale/ActivePlan";
import RechargeNow from "../../Modale/RechargeNow";
import WithdrawModule from "../../Modale/WithdrawModule";
import taka from "../../assets/icons/taka (1).png";
import taka2 from "../../assets/icons/taka1 (2).png";
import taka3 from "../../assets/icons/taka1 (3).png";
import taka4 from "../../assets/icons/taka1 (4).png";
import taka5 from "../../assets/icons/taka1 (5).png";
import taka6 from "../../assets/icons/taka1 (1).png";
import bg1 from "../../assets/images/bg-small6.jpg";
import bg2 from "../../assets/images/bg-small4.jpg";
import UpdatePassword from "../../Modale/UpdatePassword";
import Loading from "../../Share/Loading";
import { useContext } from "react";
import { MeContext } from "../../App";
import { Circles, FidgetSpinner, Watch } from "react-loader-spinner";
import useIncomeTracker from "../../Hooks/useIncomeTracker";
import tree from "../../assets/lottie/treee.json";
import plan from "../../assets/lottie/plan.json";
import Lottie from "lottie-react";
import { AiOutlineFileDone, AiOutlineHistory } from "react-icons/ai";

const Wallet = () => {
  const [me, meLoading, refetch] = useContext(MeContext);
  const [planModal, setPlanModal] = useState(null);
  const [recharge, setRecharge] = useState(null);
  const [withdraw, setWithdraw] = useState(null);
  const [updateModal, setUpdateModal] = useState(null);
  const { yesterdayIncome, todayIncome, weeklyIncome, monthlyIncome } =
    useIncomeTracker(me?.CompleteTask);

  if (meLoading) {
    return <Loading></Loading>;
  }

  const timelyBalance = (duration) => {
    let dateExpr;
    let price = [];
    me?.CompleteTask?.map((i) => {
      const currentDate = new Date();
      const date = new Date(i?.date);
      const date1 = date.setDate(date.getDate());
      const currentDate1 = currentDate.setDate(
        currentDate.getDate() - duration
      );
      dateExpr = date.toLocaleTimeString();
      if (currentDate < date) {
        price.push(i?.price);
      }
    });
    const totalprice = price.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    return totalprice;
  };

  return (
    <div className="w-full">
      <div className="font-reem -z-[0] relative pattern-planbg border-t-0 border sm:border-2 rounded-t-[10px] sm:border-t-0 border-purple-200 text-gray-800 pb-8 p-3 py-5 sm:p-5 rounded-b-[100px] bg-white">
        <div className="w-full absolute top-[60px] left-0">
          <Lottie
            animationData={plan}
            loop={true}
            style={{ height: "250px" }}
          />
        </div>
        <div className="mb-10">
          <div className="w-full">
            <Lottie
              animationData={tree}
              loop={true}
              style={{ height: "150px", width: "100%" }}
            />
          </div>
          <div className="w-full -mt-10 pb-5 text-center">
            <h2 className="text-5xl sm:text-7xl font-bold text-purple-700">
              {me?.balance} $
            </h2>
            <p className="text-4xl font-reem sm:text-5xl mt-2 sm:mt-3 text-purple-500">
              Total Balance
            </p>
          </div>
        </div>
      </div>

      <div className="-mt-[65px] relative z-50 px-2 mx-2 sm:mx-3 sm:px-3 bg-white rounded-xl p-4">
        <div className="flex items-center mb-3 justify-between gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">
                  {yesterdayIncome} $
                </h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Yesterday Income
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Yesterday Income
            </h1>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka5} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">
                  {me?.balance} $
                </h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Available Balance
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Available Balance
            </h1>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka3} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">
                  {todayIncome} $
                </h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Today Income
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Today Income
            </h1>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka6} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">
                  {weeklyIncome} $
                </h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Weekly Income
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Weekly Income
            </h1>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka4} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">
                  {monthlyIncome} $
                </h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Monthly Income
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Monthly Income
            </h1>
          </div>
          <div className="p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 border border-purple-200 duration-300 shadow-sm pattern-planbg rounded-lg">
            <div className="gap-1 flex items-center justify-between sm:justify-start sm:gap-2">
              <div className="w-9 sm:w-16 -ml-1">
                <img src={taka2} className="w-full" alt="taka" />
              </div>
              <div className="">
                <h3 className="font-bold sm:mb-1 sm:text-2xl">12 $</h3>
                <h1 className="text-[12px] hidden sm:block text-[#727988] sm:text-xl">
                  Company Bunas
                </h1>
              </div>
            </div>
            <h1 className="text-[12px] sm:hidden block text-[#727988] sm:text-xl">
              Company Bunas
            </h1>
          </div>
        </div>
      </div>

      <div className="sm:mt-6 mt-4 bg-white mx-2 sm:mx-3 rounded-xl p-4">
        <div className="flex items-center gap-4 justify-between">
          <div className="w-full">
            {me?.card.length > 0 ? (
              <label
                onClick={() => setRecharge("recharge")}
                htmlFor="recharge"
                className="btn btn-xl sm:btn-lg border-[4px] hover:shadow-md btn-success hover:shadow-[#c5f3f2] rounded-full border-[#b0f6b0] w-full text-[#fff] mr-5 font-bold bg-[#1e9558]"
              >
                Recharge
              </label>
            ) : (
              <label
                onClick={() => setUpdateModal([me, "bankCard"])}
                htmlFor="update-password"
                className="btn btn-xl sm:btn-lg border-[4px] hover:shadow-md btn-success hover:shadow-[#c5f3f2] rounded-full border-[#b0f6b0] w-full text-[#fff] mr-5 font-bold bg-[#1e9558]"
              >
                Recharge
              </label>
            )}
          </div>
          <div className="w-full">
            {me?.card?.length > 0 ? (
              <label
                onClick={() => setWithdraw("withdraw")}
                htmlFor="withdraw"
                className="btn btn-xl sm:btn-lg border-[4px] border-[#f8c4b4] btn-secondary w-full font-bold rounded-full hover:shadow-md hover:shadow-secondary text-white bg-[#f05e41]"
              >
                Withdraw
              </label>
            ) : (
              <label
                onClick={() => setUpdateModal([me, "bankCard"])}
                htmlFor="update-password"
                className="btn btn-xl sm:btn-lg border-[4px] border-[#f8c4b4] btn-secondary w-full font-bold rounded-full hover:shadow-md hover:shadow-secondary text-white bg-[#f05e41]"
              >
                Withdraw
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="px-2 sm:px-3">
        <div className="font-reem w-full flex items-center gap-x-3 sm:mt-6 mt-4 bg-white rounded-xl p-3 sm:p-4">
          <Link className="w-full" to="/dashboard/planDetails">
            <div className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg">
              <span className="text-2xl text-purple-700">
                <AiOutlineFileDone />
              </span>
              <h2 className="sm:text-xl text-purple-500 font-bold">
                Show Plan
              </h2>
            </div>
          </Link>
          <Link className="w-full" to="/dashboard/history">
            <div className="p-2 gap-1 sm:p-4 flex items-center sm:gap-2 cursor-pointer hover:-translate-y-1 duration-300 shadow-sm border border-purple-200 pattern-planbg rounded-lg">
              <span className="text-2xl text-purple-700">
                <AiOutlineHistory />
              </span>
              <h2 className="sm:text-xl text-purple-500 font-bold">
                My History
              </h2>
            </div>
          </Link>
        </div>
      </div>
      {planModal && (
        <PlansModale planModal={planModal} setPlanModal={setPlanModal} />
      )}
      {recharge && (
        <RechargeNow recharge={recharge} setRecharge={setRecharge} />
      )}
      {withdraw && (
        <WithdrawModule
          withdraw={withdraw}
          setUpdateModal={setUpdateModal}
          setWithdraw={setWithdraw}
        />
      )}
      {updateModal && (
        <UpdatePassword
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Wallet;
