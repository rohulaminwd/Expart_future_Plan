import React from "react";
import { useState } from "react";
import Loading from "../../Share/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import DeleteModalConfirm from "../../Modale/DeleteModalConfirm";
import CreatePlan from "../../Modale/CreatePlan";
import { useContext } from "react";
import { MeContext, PlanContext } from "../../App";
import PlanCard from "../../Components/PlanCard";

const AdminPlan = () => {
  const [plans, planLoading, planRefetch] = useContext(PlanContext);
  const [me, meLoading] = useContext(MeContext);
  const [openPlan, setOpenPlan] = useState(null);
  const [deleteModule, setDeletingModal] = useState(null);
  const method = "plan";

  console.log(plans, "demo test");

  if (planLoading) {
    return <Loading />;
  }
  return (
    <div className="p-2 pt-0 sm:p-0">
      <div className="text-center w-full flex items-center justify-between p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white">
        <div className="">
          <label
            onClick={() => setOpenPlan(["create"])}
            htmlFor="create-plan"
            className="btn btn-primary rounded-3xl btn-sm text-white"
          >
            Create Plan
          </label>
        </div>
        <h1 className="font-bold text-xl">
          All Plan: <span className="text-accent ">{plans?.length}</span>
        </h1>
      </div>
      <motion.div className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-3">
        <AnimatePresence>
          {plans?.map((i, index) => (
            <>
              <motion.div
                layout
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                key={i?._id}
                className={`md:mt-0 w-full duration-300 shadow-md rounded-2xl`}
              >
                <PlanCard
                  plan={i}
                  btnClass={`${
                    i?.category === "Free Plan"
                      ? "ring-[#91f2dc] bg-primary"
                      : i?.category === "Life time Plan"
                      ? "ring-[#91f2dc] bg-primary"
                      : "bg-purple-700 text-white border-0 hover:bg-purple-700"
                  }`}
                  PlanDateExpire={""}
                  setActivePlan={""}
                  me={me}
                  color={
                    "after:bg-purple-400 before:bg-purple-400 text-purple-700"
                  }
                  classNam={"ring-purple-400 bg-purple-700"}
                  bgColor={"bg-purple-700"}
                  setOpenPlan={setOpenPlan}
                  setDeletingModal={setDeletingModal}
                />
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </motion.div>
      {openPlan && (
        <CreatePlan
          openPlan={openPlan}
          setOpenPlan={setOpenPlan}
          refetch={planRefetch}
        />
      )}
      {deleteModule && (
        <DeleteModalConfirm
          deleteModule={deleteModule}
          setDeletingModal={setDeletingModal}
          refetch={planRefetch}
          method={method}
        />
      )}
    </div>
  );
};

export default AdminPlan;

{
  /* <div className="relative border-b pb-1">
                <div className="w-full flex items-start justify-start">
                  <div className="w-16">
                    {i?.category === "Free Plan" && (
                      <img src={plan1} className="w-[50px]" alt="task " />
                    )}
                    {i?.category === "Life time Plan" && (
                      <img src={plan2} className="w-[50px]" alt="task " />
                    )}
                    {i?.category === "Plan in time" && (
                      <img src={plan3} className="w-[50px]" alt="task " />
                    )}
                  </div>
                  <div className="w-full">
                    <h3 className="text-[16px] Uppercase font-bold">
                      {i.planName}
                    </h3>
                    <p className="text-[12px]">{i?.description}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <h2
                    className={`${
                      i?.category === "Free Plan"
                        ? "text-accent"
                        : "text-accent"
                    } font-bold`}
                  >
                    {i?.price} $
                  </h2>
                </div>
                <div className="text-right flex items-center justify-end">
                  {i?.planDuration && (
                    <p className="text-[10px] mr-3">{i?.planDuration}</p>
                  )}
                  {i?.status === "pending" && (
                    <p className="text-[10px]">
                      {format(new Date(i?.createdAt), "PP")}
                    </p>
                  )}
                  {i?.status === "complete" && (
                    <p className="text-[10px]">
                      {format(new Date(i?.updatedAt), "PP")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-end mt-3 justify-between">
                <div className=" flex items-center">
                  <h1 className="text-[12px] border-r pr-2 flex items-center gap-2">
                    Unit Price: <p>{i?.unitPrice}</p>
                  </h1>
                  <h1 className="text-[12px] pl-2 flex items-center gap-2">
                    Daily Task: <p>{i?.dailyTask}</p>
                  </h1>
                </div>
                <div className="flex items-center">
                  <label
                    onClick={() => setOpenPlan([i, "update"])}
                    htmlFor="create-plan"
                    className="text-primary cursor-pointer"
                  >
                    <BiEdit size={20} />
                  </label>
                  <label
                    onClick={() => setDeletingModal(i)}
                    htmlFor="delete-confirm-modal"
                    className={`${
                      i?.category === "Free Plan" ? "text-white" : "text-accent"
                    } cursor-pointer`}
                  >
                    <AiOutlineDelete size={20} />
                  </label>
                </div>
              </div> */
}
