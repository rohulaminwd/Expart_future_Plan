import React, { useState } from "react";
import { toast } from "react-toastify";
import task from "../assets/icons/task (2).png";
import axios from "../Utils/Axios.config";

const GiveTask = ({ setGiveTask, giveTask, refetch }) => {
  const [i, id] = giveTask;

  const handleUpdate = () => {
    i.date = new Date();

    axios
      .patch(`/task/${i?._id}`, { status: "running" })
      .then((response) => {
        const data = response.data;
        if (data.success === true) {
          toast.success("Successfully add the task");
          refetch();
          setGiveTask(null);
        } else if (data.success === false) {
          toast.error("Your Request fail plx try again");
        }
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
      });
  };

  return (
    <div>
      <input type="checkbox" id="give-task" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-3 py-5 sm:p-4">
          <h1 className="text-xl uppercase text-center font-bold text-primary">
            Add Task
          </h1>
          <div className="text-center">
            <img src={task} className="w-28 mx-auto" alt="task" />
            <div>
              <h2 className="text-2xl font-bold text-[#000]">
                Are you sure add the {i?.taskName} Task
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={handleUpdate}
              className="btn w-[100px] btn-primary text-white btn-sm"
            >
              Yes
            </button>
            <label htmlFor="give-task" className="btn btn-sm w-[100px] ">
              No
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveTask;
