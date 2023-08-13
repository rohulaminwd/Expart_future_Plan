import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import ViewTask from "../../Modale/ViewTask";

const SubmitTask = () => {
  const [Task, setTask] = useState("pending");
  const [taskModul, setTaskModule] = useState(null);
  const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
  let submitTask = [];

  tasks.map((task) => {
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
  const [myTaskSubmit, setMYTaskSubmit] = useState(pendingTaskSubmit);

  useEffect(() => {
    setMYTaskSubmit(pendingTaskSubmit);
  }, [tasks]);

  const selectTask = (i, x) => {
    setMYTaskSubmit(i);
    setTask(x);
  };

  // console.log(tasks, submitTask, myTaskSubmit, "ok");

  return (
    <div className="p-2 pt-0 sm:p-0">
      <div className="w-full flex items-center justify-between ">
        <div
          onClick={() => selectTask(pendingTaskSubmit, "pending")}
          className={`${
            Task === "pending"
              ? "!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white"
              : "border bg-slate-100"
          } cursor-pointer w-full sm:py-1 px-0`}
        >
          <div className="text-center flex items-center gap-x-2 justify-center">
            <h2 className="text-[14px]">Pending</h2>
            <h1 className="text-lg sm:text-xl">{pendingTaskSubmit?.length}</h1>
          </div>
        </div>
        <div
          onClick={() => selectTask(completeTaskSubmit, "complete")}
          className={`${
            Task === "complete"
              ? "!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white"
              : "border bg-slate-100"
          } cursor-pointer w-full sm:py-1 px-0`}
        >
          <div className="text-center flex gap-x-2 justify-center items-center">
            <h2 className="text-[14px]">Complete</h2>
            <h1 className="text-lg sm:text-xl">
              {completeTaskSubmit ? completeTaskSubmit?.length : "0"}
            </h1>
          </div>
        </div>
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
                className={`p-3 md:mt-0 sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}
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
                    ) : (
                      <p>Completed</p>
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
