import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import ViewTask from "../../Modale/ViewTask";

const SubmitTask = () => {
  const [taskModul, setTaskModule] = useState(null);
  const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
  let submitTask = [];

  tasks?.map((task) => {
    task?.submitTask?.map((i) => {
      i.category = task?.category;
      i.taskName = task?.taskName;
      i.taskId = task?._id;
      i.planCategory = task?.planCategory;
      submitTask.push(i);
    });
  });

  const pendingTaskSubmit = submitTask?.filter((i) => i.status === "pending");
  const completeTaskSubmit = submitTask?.filter((i) => i.status === "complete");
  const rejectedTaskSubmit = submitTask?.filter((i) => i.status === "rejected");
  const [myTaskSubmit, setMYTaskSubmit] = useState(pendingTaskSubmit);

  useEffect(() => {
    setMYTaskSubmit(pendingTaskSubmit);
  }, [tasks]);

  // console.log(tasks, submitTask, myTaskSubmit, "ok");

  const handleSelect = (i) => {
    if (i === "pending") {
      setMYTaskSubmit(pendingTaskSubmit);
    }
    if (i === "complete") {
      setMYTaskSubmit(completeTaskSubmit);
    }
    if (i === "rejected") {
      setMYTaskSubmit(rejectedTaskSubmit);
    }
  };

  return (
    <div className="p-2 pt-0 sm:p-0">
      <div
        className={`flex justify-between items-center gap-x-3 bg-[#ffffff] p-3 rounded-xl w-full`}
      >
        <div className="w-[100px] py-2 bg-[#f0eaf7] flex items-center justify-center rounded-lg">
          <span className="text-xl font-bold text-purple-700">
            {myTaskSubmit?.length ? myTaskSubmit?.length : 0}
          </span>
        </div>
        <select
          onChange={(e) => handleSelect(e.target.value)}
          className="text-sm border px-3 py-2 rounded-lg w-full"
        >
          <option value="pending" select>
            Pending
          </option>
          <option value="complete">Complete</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <motion.div
        layout
        className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-3"
      >
        <AnimatePresence>
          {myTaskSubmit?.map((i, index) => (
            <>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                key={i._id}
                className={`${
                  i?.status === "complete" ? "border-primary" : ""
                } ${
                  i?.status === "rejected" ? "border-red-500" : ""
                } p-3 md:mt-0 border sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}
              >
                <div key={i._id} className="relative border-b-2 pb-1">
                  <div className="w-full flex gap-x-2 items-start justify-start">
                    <label
                      onClick={() => setTaskModule([i, "view"])}
                      htmlFor="view-task"
                      className="w-16"
                    >
                      <img
                        src={i?.imageUrl}
                        className="w-16 h-16 cursor-pointer rounded-md"
                        alt="task "
                      />
                    </label>
                    <div className="w-full">
                      <h3 className="text-[13px] font-bold">{i.taskName}</h3>
                      <p className="text-[12px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. error iusto in.
                      </p>
                      <p className="text-[12px] text-right">
                        {format(new Date(i?.date), "PP")}
                      </p>
                    </div>
                  </div>
                  <div className="absolute -top-0.5 right-0">
                    <h2 className="font-bold text-accent">{i?.price} $</h2>
                  </div>
                </div>
                <div className="flex mt-2 justify-between items-center">
                  <a className="block" href={`tel:${i?.phoneNumber}`}>
                    <button className="btn btn-ghost bg-purple-100 hover:text-white hover:bg-purple-700  text-purple-700 btn-xs">
                      <span className="">{i?.phoneNumber}</span>
                    </button>
                  </a>
                  <div>
                    {i?.status === "pending" ? (
                      <div>
                        <label
                          onClick={() => setTaskModule([i, "rejected"])}
                          htmlFor="view-task"
                          className="text-white btn btn-accent btn-xs mr-2 cursor-pointer"
                        >
                          Rejected
                        </label>
                        <label
                          onClick={() => setTaskModule([i, "done"])}
                          htmlFor="view-task"
                          className="text-white btn btn-primary btn-xs cursor-pointer"
                        >
                          Done
                        </label>
                      </div>
                    ) : i?.status === "complete" ? (
                      <p className="text-primary font-bold">Completed</p>
                    ) : (
                      <p className="text-red-500 font-bold">Rejected</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </motion.div>
      {taskModul && (
        <ViewTask
          taskModul={taskModul}
          setTaskModule={setTaskModule}
          refetch={taskRefetch}
        />
      )}
    </div>
  );
};

export default SubmitTask;
