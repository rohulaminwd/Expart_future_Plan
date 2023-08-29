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
  const [Task, setTask] = useState("pending");
  const [me, loading] = useContext(MeContext);
  const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
  let newArr = [];
  const [myTask, setMYTask] = useState(newArr);

  const completeTask = me?.CompleteTask?.slice(0, 5)?.reverse();

  const task = tasks?.filter((i) => {
    const submitTask = i?.submitTask?.find((x) =>
      x?.phoneNumber?.includes(me?.phoneNumber)
    );
    return i?.status === "running" && !submitTask;
  });
  const taskExist = tasks?.filter((i) => {
    const submitTask = i?.submitTask?.find((x) =>
      x?.phoneNumber?.includes(me?.phoneNumber)
    );
    return submitTask;
  });

  // console.log(task, tasks, "paichi");

  const handleFindPlan = (name) => {
    const planName = me?.plan?.find((i) => {
      const planSplit = i?.planDuration?.split("-")?.[0];
      return planSplit === name;
    });
    // console.log(planName, planName?.planDuration?.split("-")?.[0]);
    return planName?.planDuration?.split("-")?.[0];
  };

  task?.forEach((i) => {
    const planName = i?.planCategory?.split("-")?.[0];
    if (planName === handleFindPlan(planName)) {
      newArr.push(i);
    }
  });

  useEffect(() => {
    setMYTask(newArr);
  }, [tasks]);

  if (taskLoading || loading) {
    return <Loading />;
  }

  // find the rejected task
  const rejectedTask = [];
  const completedTasks = [];

  taskExist?.forEach((i) => {
    const rejectedItem = i?.submitTask?.find(
      (item) => item?.status === "rejected"
    );

    const completeItem = i?.submitTask?.find(
      (item) => item?.status === "complete"
    );
    if (rejectedItem) {
      rejectedTask.push(i);
    } else if (completeItem) {
      completedTasks.push(i);
    }
  });

  // console.log(rejectedTask, completedTasks, myTask);

  const handleSelect = (i) => {
    if (i === "pending") {
      setMYTask(newArr);
      setTask(i);
    }
    if (i === "complete") {
      setMYTask(completedTasks);
      setTask(i);
    }
    if (i === "rejected") {
      setMYTask(rejectedTask);
      setTask(i);
    }
  };

  // console.log(myTask, task, "good");

  return (
    <div className="p-2 pt-0 sm:p-0">
      <div
        className={`flex justify-between items-center gap-x-3 bg-[#ffffff] p-3 rounded-xl w-full`}
      >
        <div className="w-[100px] py-2 bg-[#f0eaf7] flex items-center justify-center rounded-lg">
          <span className="text-xl font-bold text-purple-700">
            {myTask?.length ? myTask?.length : 0}
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
          {myTask?.map((i, index) => (
            <>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                key={i._id}
                className={`${
                  Task === "complete" ? "border border-green-500" : ""
                } ${
                  Task === "rejected" ? "border-red-500" : ""
                } border p-2 md:mt-0 sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}
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
                        {format(new Date(i?.updatedAt), "PP")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="flex items-center">
                    <div className="border-r pr-2">
                      <a
                        className="text-[12px] font-bold text-primary"
                        href={`${i?.taskLink}`}
                      >
                        Open Link
                      </a>
                    </div>
                    <div className="border-l pl-2">
                      <CopyButton value={`${i?.taskLink}`}>
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
                    {(Task === "pending" || Task === "rejected") && (
                      <label
                        onClick={() => setSubmitTask(i)}
                        htmlFor="submit-task"
                        className="text-white btn btn-primary btn-outline hover:!text-white btn-xs cursor-pointer"
                      >
                        submit
                      </label>
                    )}
                    {Task === "complete" && (
                      <p className="text-primary text-[16px] font-bold">
                        Completed
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
