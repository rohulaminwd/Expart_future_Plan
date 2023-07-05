import React, { useState } from "react";
import { useContext } from "react";
import { MeContext, TaskContext } from "../../App";
import Loading from "../../Share/Loading";
import task1 from "../../assets/icons/task (3).png";
import task2 from "../../assets/icons/task-data (2).png";
import task3 from "../../assets/icons/task-data (1).png";
import task4 from "../../assets/icons/tiktok.png";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { CopyButton } from "@mantine/core";
import SubmitTask from "../../Modale/SubmitTask";
import { useEffect } from "react";

const Work = () => {
  const [submitTask, setSubmitTask] = useState(null);
  const [Task, setTask] = useState("running");
  const [me, loading] = useContext(MeContext);
  const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
  let newArr = [];
  const [myTask, setMYTask] = useState(newArr);

  const completeTask = me?.CompleteTask?.slice(0, 5)?.reverse();
  const task = tasks?.filter((i) => {
    const taskComplete = i?.completeUser?.find((x) =>
      x?.phoneNumber?.includes(me?.phoneNumber)
    );
    return i?.status === "running" && !taskComplete;
  });

  console.log(task, "paichi");

  const handelPlanInTime = (timeName) => {
    const planTime = me?.PlanInTime?.find((i) =>
      i?.planDuration.includes(timeName)
    );
    console.log(planTime, "dfdfd");
    return planTime?.planDuration;
  };

  task?.map((i) => {
    if (i?.planCategory === "Free Plan" && me?.FreePlan === "active") {
      newArr.push(i);
    } else if (
      i?.planCategory === "Life time Plan" &&
      me?.LifeTimePlan === "active"
    ) {
      newArr.push(i);
      console.log(i, "arr");
    } else if (
      i?.planCategory !== "Free Plan" &&
      i?.planCategory !== "Life time Plan"
    ) {
      if (i?.planDuration === handelPlanInTime(i?.planDuration)) {
        newArr.push(i);
      }
    }
  });

  useEffect(() => {
    setMYTask(newArr);
  }, [tasks]);

  if (taskLoading || loading) {
    return <Loading />;
  }

  const exsisNumber = (i) => {
    const exsisItem = i.completeUser?.find((x) =>
      x?.phoneNumber.includes(me?.phoneNumber)
    );
    return exsisItem?.phoneNumber;
  };

  const selectTask = (i, x) => {
    setMYTask(i);
    setTask(x);
  };

  console.log(myTask, task);

  return (
    <div className="p-2 pt-0 sm:p-0">
      <div className="w-full flex items-center justify-between ">
        <div
          onClick={() => selectTask(newArr, "running")}
          className={`${
            Task === "running"
              ? "!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white"
              : "border bg-slate-100"
          } cursor-pointer w-full py-2 px-0`}
        >
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl">{newArr?.length}</h1>
            <h1 className="text-[14px]">My Task</h1>
          </div>
        </div>
        <div
          onClick={() => selectTask(completeTask, "complete")}
          className={`${
            Task === "complete"
              ? "!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white"
              : "border bg-slate-100"
          } cursor-pointer w-full py-2 px-0`}
        >
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl">{completeTask?.length}</h1>
            <h1 className="text-[14px]">Complete Task</h1>
          </div>
        </div>
      </div>
      <motion.div
        layout
        className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-3"
      >
        <AnimatePresence>
          {myTask?.map((i, index) => (
            <>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                key={i._id}
                className={`p-2 md:mt-0 sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}
              >
                <div key={i._id} className="relative border-b-2 pb-1">
                  <div className="w-full flex items-start justify-start">
                    <div className="w-16">
                      {i?.category === "Youtube" && (
                        <img src={task1} className="w-16 -ml-2" alt="task " />
                      )}
                      {i?.category === "Facebook" && (
                        <img src={task2} className="w-16 -ml-2" alt="task " />
                      )}
                      {i?.category === "data-entry" && (
                        <img src={task3} className="w-16 -ml-2" alt="task " />
                      )}
                      {i?.category === "Tik Tok" && (
                        <img src={task4} className="w-16 -ml-2" alt="task " />
                      )}
                    </div>
                    <div className="w-full">
                      <h3 className="text-[13px] font-bold">{i.taskName}</h3>
                      {Task === "complete" && (
                        <h3 className="text-[13px] font-bold">{i.category}</h3>
                      )}
                      <p className="text-[12px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. error iusto in.
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <h2 className="font-bold text-accent">{i?.price} $</h2>
                  </div>
                  <div className="text-right flex items-center justify-end">
                    {i?.planCategory && (
                      <p className="text-[12px] mr-2">{i?.planCategory}</p>
                    )}
                    {i?.planCategory === "Plan in time" && (
                      <p className="text-[12px] mr-2">{i?.planDuration}</p>
                    )}
                    {i?.planCategory === "Plan in time" && (
                      <p className="text-[12px] mr-2">{i?.planInTimeName}</p>
                    )}
                    {Task === "complete" && (
                      <p className="text-[12px]">
                        {format(new Date(i?.date), "PP")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="flex items-center">
                    <div className="border-r pr-2">
                      <a
                        className="text-[12px] font-bold text-primary"
                        href={`${i?.taskUrl}`}
                      >
                        Open Link
                      </a>
                    </div>
                    <div className="border-l pl-2">
                      <CopyButton value={`${i?.taskUrl}`}>
                        {({ copied, copy }) => (
                          <p
                            className={`${
                              copied ? "text-[#177865]" : "text-[#174e78]"
                            } text-[12px] cursor-pointer font-bold`}
                            onClick={copy}
                          >
                            {copied ? "Copied Link" : "Copy Link"}
                          </p>
                        )}
                      </CopyButton>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {!(exsisNumber(i) === me?.phoneNumber) &&
                      i?.status === "running" && (
                        <label
                          onClick={() => setSubmitTask(i)}
                          htmlFor="submit-task"
                          className="text-white btn btn-primary btn-outline hover:!text-white btn-xs cursor-pointer"
                        >
                          submit
                        </label>
                      )}
                    {exsisNumber(i) === me?.phoneNumber &&
                      i?.status === "pending" && (
                        <p className="text-[#244654] text-[16px] font-bold">
                          pending...
                        </p>
                      )}
                    {Task === "complete" && (
                      <p className="text-[#378230] text-[16px] font-bold">
                        Complete
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </motion.div>
      {submitTask && (
        <SubmitTask
          submitTask={submitTask}
          setSubmitTask={setSubmitTask}
          refetch={taskRefetch}
          me={me}
        />
      )}
    </div>
  );
};

export default Work;
