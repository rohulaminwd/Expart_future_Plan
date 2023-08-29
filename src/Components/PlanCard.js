import React, { useContext } from "react";
import { MdOutlineDone } from "react-icons/md";
import PlanCardFeture from "./planCardFeture";
import { toast } from "react-toastify";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { UserContext } from "../App";
import UserProfileImg from "./UserProfileImg";
import UsersImg from "./UsersImg";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const PlanCard = ({
  plan,
  setActivePlan,
  PlanDateExpire,
  me,
  color,
  classNam,
  bgColor,
  btnClass,
  setOpenPlan,
  setDeletingModal,
}) => {
  const [users, userLoading] = useContext(UserContext);
  const location = useLocation();
  const { pathname } = location;
  const planAlert = (i) => {
    toast.warn(`Already Active ${i?.planName}`);
  };

  const isPlanExprtime = (id, category) => {
    if (category === "Life time Plan") {
      return "Life Time";
    } else {
      const active = me?.plan?.find((i) => i?.planId === id);
      const duration = parseInt(active?.planDuration?.split("-")?.[0]);
      const date = new Date(active?.date);
      const expireDate = date.setDate(date.getDate() + duration);
      const dateExpr = format(new Date(expireDate), "PP");
      return dateExpr;
    }
  };

  const isActivePlan = (id) => {
    const existPlan = me?.plan?.find((i) => i?.planId === id);
    return existPlan?.planId;
  };

  const totalActivePlanUsers = (id) => {
    const existUser = users.filter((i) => {
      const activePlan = i?.plan.find((x) => x?.planId === id);
      if (activePlan) {
        return activePlan.planId === id;
      }
      return false;
    });
    return existUser;
  };

  return (
    <div className="">
      <div className="border rounded-lg relative pt-5 pb-2 pattern-bg shadow-lg bg-[#ffffff] px-3">
        <div className="w-full ">
          <div
            className={`${classNam} w-[80px] h-[80px] text-white mx-auto font-reem rounded-full flex items-center justify-center ring-[3px] ring-offset-base-100 ring-offset-2`}
          >
            <div className="">
              <div className="flex justify-center gap-x-1">
                <span className="text-lg">$ </span>
                <h3 className="font bold text-4xl">{plan.price}</h3>
              </div>
              <p className="text-sm text-center">
                {plan.planDuration
                  ? plan.planDuration
                  : plan?.category === "Free Plan"
                  ? "15-Days"
                  : "Life time"}
              </p>
            </div>
          </div>
        </div>
        <div className="base-card w-[124px] h-[124px] overflow-hidden absolute -top-2 -left-2">
          <p
            className={`${bgColor} p-0.5 -rotate-45 shadow-sm mt-7 -ml-10 text-white text-center bg-primary text-sm`}
          >
            {plan.category}
          </p>
        </div>
        {(plan?.category === "Free Plan" ||
          plan?.category === "Life time Plan") && (
          <div className="plan-card-base after:pattern-bg flex p-1 w-[60px] h-[80px]">
            <p className="text-white text-center text-[14px] font-bold">
              {plan?.category === "Free Plan" ? "Free Access" : "Life Time"}
            </p>
          </div>
        )}
        <div className={`divider ${color} text-xl font-bold mt-5 mb-1`}>
          {plan.planName}
        </div>
        <div className="text-md font-reem mt-3">
          <PlanCardFeture
            name={
              plan.category === "Free Plan"
                ? "15 Days"
                : plan.planDuration
                ? plan.planDuration
                : "Life time"
            }
            title={"Plan Access Time"}
          />
          <PlanCardFeture name={plan.dailyTask} title={"Daily Task"} />
          <PlanCardFeture name={plan.unitPrice} title={"UnitPrice"} />
        </div>
        {pathname === "/dashboard/planDetails" && (
          <div className="flex items-center justify-between mt-3 mb-5">
            {isActivePlan(plan?._id) === plan?._id &&
              pathname === "/dashboard/planDetails" && (
                <p className="text-md text-purple-700 font-bold">
                  Expire Date: {isPlanExprtime(plan._id, plan?.category)}
                </p>
              )}
            <UsersImg users={totalActivePlanUsers(plan?._id)} />
          </div>
        )}
        {pathname === "/dashboard/planDetails" && (
          <div className={`w-full my-3 mt-5 flex justify-center`}>
            {isActivePlan(plan._id) === plan._id ? (
              <button
                onClick={() => planAlert(plan)}
                className={`${btnClass} !capitalize text-xl btn font-reem mx-auto btn-circle text-white w-[200px]`}
              >
                Active
              </button>
            ) : (
              <label
                onClick={() => setActivePlan(plan)}
                disabled={me?.balance < plan?.price}
                htmlFor="active-plan"
                className={`${btnClass} !capitalize text-xl btn font-reem mx-auto btn-circle text-white w-[200px]`}
              >
                Purchase Now
              </label>
            )}
          </div>
        )}
        {pathname === "/admin-dashboard/adminPlan" && (
          <div className="flex items-center justify-between mt-4 mb-2">
            <UsersImg users={totalActivePlanUsers(plan?._id)} />
            <div className="flex gap-x-2 items-center">
              <label
                onClick={() => setOpenPlan([plan, "update"])}
                htmlFor="create-plan"
                className="text-white btn-primary btn btn-sm"
              >
                <BiEdit size={20} />
              </label>
              <label
                onClick={() => setDeletingModal(plan)}
                htmlFor="delete-confirm-modal"
                className={`text-white btn-accent btn btn-sm`}
              >
                <AiOutlineDelete size={24} />
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanCard;

{
  /* <div className="relative border-b pb-1">
        <div className="w-full flex items-start justify-start">
          <div className="w-full">
            <h3 className="text-[16px] Uppercase font-bold">{plan.planName}</h3>
            <p className="text-[12px]">{plan.description}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0">
          <h2
            className={`${
              plan.category === "Free Plan" ? "text-accent" : "text-accent"
            } font-bold`}
          >
            {plan.price} $
          </h2>
        </div>
        <div className="text-right flex items-center justify-end">
          {plan.planDuration && (
            <p className="text-[10px] mr-3">{plan.planDuration}</p>
          )}
          {isActive(plan._id) === plan._id && (
            <p className="text-[12px]">Expire Date: {isPlanDate(plan._id)}</p>
          )}
        </div>
      </div>
      <div className="flex items-end mt-3 justify-between">
        <div className=" flex items-center">
          <h1 className="text-[12px] border-r pr-2 flex items-center gap-2">
            Unit Price: <p>{plan.unitPrice}</p>
          </h1>
          <h1 className="text-[12px] pl-2 flex items-center gap-2">
            Daily Task: <p>{plan.dailyTask}</p>
          </h1>
          <h1 className="text-[12px] pl-2 flex items-center gap-2">
            Daily Task: <p>{plan.dailyTask}</p>
          </h1>
        </div>
        {isActive(plan._id) === plan._id && PlanDateExpire(plan._id)}
        {isActive(plan._id) !== plan._id && (
          <label
            onClick={() => setActivePlan(plan)}
            htmlFor="active-plan"
            className="btn w-[100px] btn-accent text-white btn-sm"
            disabled={me?.balance < plan.price}
          >
            Start
          </label>
        )}
        {isActive(plan._id) === plan._id && (
          <button
            onClick={() => planAlert(plan)}
            className="btn w-[100px] btn-accent text-white btn-success btn-sm"
          >
            Active
          </button>
        )}
      </div> */
}
