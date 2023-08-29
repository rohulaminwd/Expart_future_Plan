import { format } from "date-fns";
import React from "react";
import { useState } from "react";
import plan1 from "../../assets/icons/plan (3).png";
import plan2 from "../../assets/icons/plan (2).png";
import Loading from "../../Share/Loading";
import ActivePlan from "../../Modale/ActivePlan";
import { useContext } from "react";
import { MeContext, PlanContext } from "../../App";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import SeeDetailsPlan from "../../Modale/SeeDetailsPlan";
import PlanCard from "../../Components/PlanCard";
import axios from "../../Utils/Axios.config";

const PlanDetails = () => {
  const [planTime, setPlanTime] = useState("3-Days");
  const [activePlan, setActivePlan] = useState(null);
  const [seeDetails, setSeeDetails] = useState(null);
  const [me, meLoading] = useContext(MeContext);
  const [plan, planLoading, planRefetch] = useContext(PlanContext);
  const planInTime = plan.find((i) => i?.category === "Life time Plan");
  const freePlan = plan.find((i) => i?.category === "Free Plan");

  if (planLoading || meLoading) {
    return <Loading />;
  }

  const isDate = (PlanDate) => {
    const date = new Date(PlanDate);
    const expireDate = date.setDate(date.getDate() + 15);
    const expire = expireDate - new Date();
    console.log(expireDate, "expire");
    const dateExpr = format(new Date(expireDate), "PP");
    if (expire < 0) {
      return expire;
    } else {
      return dateExpr;
    }
  };

  const PaidPlan = me?.plan?.find((i) => i?.planDuration !== "15-Days");

  console.log(PaidPlan, "paidPlan");

  const FreePlanDateExpire = (PlanDate) => {
    const date = new Date(PlanDate);
    const expireDate = date.setDate(date.getDate() + 15);
    const expire = expireDate - new Date();
    if (expire < 0 && me?.FreePlan === "active") {
      fetch(`/User/FreePlanInactive/${me?._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ FreePlan: "inactive" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            planRefetch();
          }
          console.log(data);
        });
    }
  };

  const PlanDateExpire = (id) => {
    const active = me?.plan?.find((i) => i?._id?.includes(id));
    const duration = parseInt(active?.planDuration?.split("-")?.[0]);
    const date = new Date(active?.date);
    const expireDate = date.setDate(date.getDate() + duration);
    const expire = expireDate - new Date();
    const PlanId = { _id: active._id };

    if (expire < 0) {
      axios
        .patch(`/users/planDelete/${me?._id}`, PlanId)
        .then((response) => {
          const data = response.data;
          if (data.success === true) {
            planRefetch();
          }
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const planDays = plan?.filter((i) => i?.planDuration?.includes(planTime));

  return (
    <div className="w-full sm:p-0 p-2">
      <div className="bg-white pattern-bg p-4 rounded-md shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4 sm:gap-8">
          <div>
            <h2 className="font-bold text-xl sm:text-3xl mb-5">Free Plan</h2>
            {/* <div className="p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px] text-white bg-[#700ab0] border-[#cb8bf4]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl">
              <div className="relative border-b pb-1">
                <div className="w-full flex items-start justify-start">
                  <div className="w-16">
                    <img src={plan1} className="w-[50px]" alt="task " />
                  </div>
                  <div className="">
                    <h3 className="text-[16px] capitalize font-bold">
                      {FreePlan?.planName}
                    </h3>
                    <p className="text-[12px]">{FreePlan?.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <h2 className={`font-bold`}>{FreePlan?.price} $</h2>
                </div>
                <div className="text-right flex items-center justify-end">
                  {me?.FreePlan === "inactive" && (
                    <p className="text-[12px]">Only 15 Days</p>
                  )}
                  {me?.FreePlan === "active" && (
                    <p className="text-[12px]">
                      Expire Date: {isDate(me?.FreePlanDate)}
                    </p>
                  )}
                  {me?.FreePlan === "active" && isDateExpire(me?.FreePlanDate)}
                </div>
              </div>
              <div className="flex items-end mt-3 justify-between">
                <div className=" flex items-center">
                  <h1 className="text-[12px] border-r pr-2 flex items-center gap-2">
                    Unit Price: <p>{FreePlan?.unitPrice}</p>
                  </h1>
                  <h1 className="text-[12px] pl-2 flex items-center gap-2">
                    Daily Task: <p>{FreePlan?.dailyTask}</p>
                  </h1>
                </div>
                {me?.FreePlan === "inactive" && (
                  <label
                    onClick={() => setActivePlan(FreePlan)}
                    htmlFor="active-plan"
                    className="btn w-[100px] btn-accent text-white btn-sm"
                    disabled={
                      me?.LifeTimePlan === "active" ||
                      me?.PlanInTime?.length > 0
                    }
                  >
                    Start
                  </label>
                )}
                {me?.FreePlan === "active" && (
                  <button
                    onClick={() => planAlert(FreePlan)}
                    className="btn w-[100px] btn-accent text-white btn-success btn-sm"
                  >
                    Active
                  </button>
                )}
              </div>
            </div> */}
            <PlanCard
              plan={freePlan}
              PlanDateExpire={FreePlanDateExpire}
              setActivePlan={setActivePlan}
              me={me}
              classNam={"ring-[#91f2dc] bg-primary"}
              bgColor={"bg-primary"}
              btnClass={"btn-primary text-white"}
              color={"after:bg-green-400 before:bg-green-400 text-primary"}
            />
          </div>

          <div>
            <h2 className="font-bold mt-4 sm:mt-0 text-xl sm:text-3xl mb-5">
              Life Time plan
            </h2>
            {/* <div className="p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px] text-white bg-[#03841b] border-[#9ef5a5]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl">
              <div className="relative border-b pb-1">
                <div className="w-full flex items-start justify-start">
                  <div className="w-16">
                    <img src={plan2} className="w-[50px]" alt="task " />
                  </div>
                  <div className="">
                    <h3 className="text-[16px] capitalize font-bold">
                      {lifeTimePlan?.planName}
                    </h3>
                    <p className="text-[12px]">{lifeTimePlan?.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <h2 className={`font-bold`}>{lifeTimePlan?.price} $</h2>
                </div>
                <div className="text-right flex items-center justify-end">
                  <p className="text-[12px]">Live Time Excess</p>
                </div>
              </div>
              <div className="flex items-end mt-3 justify-between">
                <div className=" flex items-center">
                  <h1 className="text-[12px] border-r pr-2 flex items-center gap-2">
                    Unit Price: <p>3.5%, 4%, 4.5%, 5%</p>
                  </h1>
                  <h1 className="text-[12px] pl-2 flex items-center gap-2">
                    Daily Task: <p>{lifeTimePlan?.dailyTask}</p>
                  </h1>
                </div>
                <div className="flex items-center gap-x-3">
                  <label
                    onClick={() => setSeeDetails("see")}
                    htmlFor="see-details-plan"
                    className="text-bold z-10 px-2 cursor-pointer text-white"
                  >
                    <BiMessageAltDetail size={24} />
                  </label>
                  {me?.LifeTimePlan === "inactive" && (
                    <label
                      onClick={() => setActivePlan(lifeTimePlan)}
                      htmlFor="active-plan"
                      className="btn w-[100px] btn-accent text-white btn-sm"
                      disabled={me?.balance < lifeTimePlan?.price}
                    >
                      Start
                    </label>
                  )}
                  {me?.LifeTimePlan === "active" && (
                    <button
                      onClick={() => planAlert(lifeTimePlan)}
                      className="btn w-[100px] btn-accent text-white btn-success btn-sm"
                    >
                      Active
                    </button>
                  )}
                </div>
              </div>
            </div> */}
            <PlanCard
              plan={planInTime}
              btnClass={"btn-primary text-white"}
              setActivePlan={setActivePlan}
              me={me}
              classNam={"ring-[#91f2dc] bg-primary"}
              bgColor={"bg-primary"}
              color={"after:bg-green-400 before:bg-green-400 text-primary"}
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-white p-2 mb-5 sm:pb-8 sm:p-3 mt-5 rounded-md shadow-md">
        <h2 className="font-bold text-xl sm:text-3xl text-center mb-2">
          Plan in Time
        </h2>
        <div className="w-full flex items-center justify-between ">
          <div
            onClick={() => setPlanTime("3-Days")}
            className={`${
              planTime === "3-Days"
                ? "!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">3 days</h1>
            </div>
          </div>
          <div
            onClick={() => setPlanTime("7-Days")}
            className={`${
              planTime === "7-Days"
                ? "!bg-[#dbfbd7] border-[3px] border-[#abf98d] rounded-md !text-[#156c65]"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">7 days</h1>
            </div>
          </div>
          <div
            onClick={() => setPlanTime("14-Days")}
            className={`${
              planTime === "14-Days"
                ? "!bg-[#c2f7f6] border-[3px] border-[#8df3f9] rounded-md !text-[#156c65]"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">14 days</h1>
            </div>
          </div>
          <div
            onClick={() => setPlanTime("30-Days")}
            className={`${
              planTime === "30-Days"
                ? "bg-[#2d4069] border-[3px] border-[#81a7fa] rounded-md !text-white"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">30 days</h1>
            </div>
          </div>
        </div>
        <motion.div
          layout
          className="md:mt-5 md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-x-5 mt-3"
        >
          <AnimatePresence>
            {planDays.map((i) => (
              <>
                <motion.div
                  layout
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key={i?._id}
                  className={`p-2 sm:p-1  mt-5 md:mt-0 w-full cursor-pointer hover:-translate-y-1 duration-300`}
                >
                  <PlanCard
                    plan={i}
                    btnClass={
                      "bg-purple-700 text-white border-0 hover:bg-purple-700"
                    }
                    PlanDateExpire={PlanDateExpire}
                    setActivePlan={setActivePlan}
                    me={me}
                    classNam={"ring-purple-400 bg-purple-700"}
                    bgColor={"bg-purple-700"}
                    color={
                      "after:bg-purple-400 before:bg-purple-400 text-purple-700"
                    }
                  />
                </motion.div>
              </>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      {activePlan && (
        <ActivePlan activePlan={activePlan} setActivePlan={setActivePlan} />
      )}
      {seeDetails && (
        <SeeDetailsPlan seeDetails={seeDetails} setSeeDetails={setSeeDetails} />
      )}
    </div>
  );
};

export default PlanDetails;
