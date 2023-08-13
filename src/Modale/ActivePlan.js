import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import { MeContext } from "../App";
import axios from "../Utils/Axios.config";
import active from "../assets/icons/activeplan.png";
import ProgressSpeener from "../Share/ProgressSpeener";
import { useState } from "react";

const ActivePlan = ({ setActivePlan, activePlan }) => {
  const [me, , refetch] = useContext(MeContext);
  const [loading, setLoading] = useState(false);

  const activeOnly = (planName) => {
    const exsist = me?.PlanInTime?.find((i) =>
      i?.planDuration?.includes(planName)
    );
    if (exsist) {
      return true;
    } else {
      return false;
    }
  };

  const handlePlanActive = () => {
    setLoading(true);
    const planData = {
      planId: activePlan._id,
      date: new Date(),
      price: activePlan?.price,
      planDuration:
        activePlan?.category === "Plan in time"
          ? activePlan?.planDuration + "-" + activePlan?.planInTimeName
          : activePlan?.category === "Free Plan"
          ? "15-Days"
          : "Life time",
    };
    axios
      .patch(`/users/plan/${me?._id}`, planData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.success === true) {
          toast.success(`${activePlan?.name} successfully active`);
          setActivePlan(null);
          refetch();
        } else if (data.success === false) {
          toast.error("Opp..! some thing is wrong.");
        }
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <input type="checkbox" id="active-plan" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-blue-100">
          <div className="text-center">
            <img src={active} className="w-20 mx-auto" alt="delete" />
          </div>
          {!activeOnly(activePlan?.planDuration) && (
            <h2 className="text-green-500 text-center my-3 text-2xl">
              Are you sure you want to active {activePlan?.planName}
            </h2>
          )}
          {activeOnly(activePlan?.planDuration) && (
            <h2 className="text-accent text-center text-2xl">
              Already Active plan {activePlan?.planDuration}
            </h2>
          )}

          <ProgressSpeener loading={loading} />
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={handlePlanActive}
              className="btn w-[100px] btn-primary text-white btn-sm"
              disabled={activeOnly(activePlan?.planDuration)}
            >
              Yes
            </button>
            <label htmlFor="active-plan" className="btn btn-sm w-[100px] ">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivePlan;
