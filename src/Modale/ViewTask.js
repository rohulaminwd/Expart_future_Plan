import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../Utils/Axios.config";
import ProgressSpeener from "../Share/ProgressSpeener";

const ViewTask = ({ setTaskModule, taskModul, refetch }) => {
  const [i, status] = taskModul;
  const [loading, setLoading] = useState(false);

  const handleUpdate = () => {
    setLoading(true);
    i.date = new Date();
    console.log(i, "ok2");

    console.log(loading, "loading");

    if (status === "done") {
      i.request = "done";
      axios
        .patch(`/task/check/${i?.taskId}`, i)
        .then((response) => {
          const data = response.data;
          if (data.success === true) {
            toast.success("Successfully check the task");
            refetch();
            setTaskModule(null);
          } else if (data.success === false) {
            toast.error("Your Request fail please try again");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else if (status === "rejected") {
      i.request = "rejected";
      axios
        .patch(`/task/check/${i?.taskId}`, i)
        .then((response) => {
          const data = response.data;
          if (data.success === true) {
            toast.success("Rejected the task");
            refetch();
            setTaskModule(null);
          } else if (data.success === false) {
            toast.error("Your Request fail plx try again");
          }
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          // Handle any errors that occurred during the request
        });
    }
  };

  return (
    <div>
      <input type="checkbox" id="view-task" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-3 py-5 sm:p-4">
          <h4 className="text-xl uppercase text-center font-bold text-primary">
            Check The Task
          </h4>
          <div className="text-center">
            <div className="mb-3">
              <h2 className="sm:text-xl text-left font-bold text-[#6e2d80]">
                View the Task Image and confirm submit.
              </h2>
              <div className="flex text-purple-500 font-bold justify-between">
                <span>{i?.taskName}</span>
                <span>{i?.price}</span>
              </div>
            </div>
            <div className="w-full max-h-[500px] overflow-y-auto rounded-xl">
              <img src={i?.imageUrl} className="w-full" alt="task" />
            </div>
          </div>
          <div className="mt-5">
            <ProgressSpeener loading={loading} />

            <div className="flex items-center justify-center gap-3">
              {status === "done" && (
                <button
                  onClick={handleUpdate}
                  className="btn w-[100px] btn-primary text-white btn-sm"
                >
                  Done
                </button>
              )}
              {status === "rejected" && (
                <button
                  onClick={handleUpdate}
                  className="btn w-[100px] btn-accent text-white btn-sm"
                >
                  Reject
                </button>
              )}
              <label htmlFor="view-task" className="btn btn-sm w-[100px] ">
                cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
