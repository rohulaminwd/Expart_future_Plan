/* eslint-disable array-callback-return */

import { useEffect, useState } from "react";
import CreateTask from "../../Modale/CreateTask";
import Loading from "../../Share/Loading";
import task1 from "../../assets/icons/task (3).png";
import task2 from "../../assets/icons/task-data (2).png";
import task3 from "../../assets/icons/task-data (1).png";
import task4 from "../../assets/icons/tiktok.png";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { CopyButton } from "@mantine/core";
import DeleteModalConfirm from "../../Modale/DeleteModalConfirm";
import { MdDoneAll, MdOutlineAddTask, MdRemoveDone } from "react-icons/md";
import { toast } from "react-toastify";
import GiveTask from "../../Modale/GiveTask";
import { useContext } from "react";
import { MeContext, TaskContext, UserContext } from "../../App";
import UserProfileImg from "../../Components/UserProfileImg";

const AdminWork = () => {
  const [openTask, setOpenTask] = useState(null);
  const [giveTask, setGiveTask] = useState(null);
  const [deleteModule, setDeletingModal] = useState(null);
  const [me] = useContext(MeContext);
  const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
  const [user] = useContext(UserContext);
  const method = "task";
  const [taskArr, setTaskArr] = useState([]);

  const runningTasks = tasks?.filter((i) => i?.status === "running");
  const inactiveTasks = tasks?.filter((i) => i?.status === "inactive");

  const worrning = () => {
    toast.warn("Already add the task");
  };

  useEffect(() => {
    setTaskArr(tasks);
  }, [tasks]);

  if (taskLoading) {
    return <Loading />;
  }

  const handleFindUser = (phone) => {
    const exsiteUser = user?.find((i) => i?.phoneNumber === phone);
    return exsiteUser;
  };

  const handleSelect = (i) => {
    if (i === "all") {
      setTaskArr(tasks);
    }
    if (i === "running") {
      setTaskArr(runningTasks);
    }
    if (i === "inactive") {
      setTaskArr(inactiveTasks);
    }
  };
  const handleDate = (i) => {
    const selectDate = new Date(i).toLocaleDateString();
    const existData = tasks?.filter((item) => {
      const taskDate = new Date(item?.createdAt).toLocaleDateString();
      return selectDate === taskDate;
    });

    setTaskArr(existData);

    console.log(existData, "data");
  };

  return (
    <div className="p-2 pt-0 sm:p-0">
      <div className=" w-full flex items-center justify-between gap-x-2 p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white">
        <div className=" flex gap-x-2 items-center">
          <label
            onClick={() => setOpenTask(["create"])}
            htmlFor="create-task"
            className="btn btn-primary font-bold text-[20px] rounded-lg btn-sm text-white"
          >
            <MdOutlineAddTask />
          </label>
          <div className="sm:w-[80px] px-2 py-0.5 bg-[#f0eaf7] flex items-center justify-center rounded-lg">
            <span className="text-xl font-bold text-purple-700">
              {taskArr?.length ? taskArr?.length : 0}
            </span>
          </div>
        </div>
        <div
          className={`flex w-full justify-between items-center gap-x-2 rounded-xl`}
        >
          <div>
            <input
              onChange={(e) => handleDate(e.target.value)}
              className="text-sm border w-[100px] sm:w-full px-1 sm:px-3 py-1 rounded-lg"
              type="date"
              name=""
              id=""
            />
          </div>
          <select
            onChange={(e) => handleSelect(e.target.value)}
            className="text-sm border px-1 sm:px-3 py-1 min-w-[100px] rounded-lg w-full"
          >
            <option value="all" select>
              All
            </option>
            <option value="running">Running</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      <motion.div
        layout
        className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-3"
      >
        <AnimatePresence>
          {taskArr?.map((i, index) => (
            <>
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                key={index}
                className={`${
                  i?.status === "running" ? "border-2 border-green-500" : ""
                } p-2 md:mt-0 sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}
              >
                <div className="relative border-b-2 pb-1">
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
                      <p className="text-[12px]">{i?.description}</p>
                      <p className="text-[12px]">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. error iusto in.
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <h2 className="font-bold text-accent">{i?.price} $</h2>
                  </div>
                  <div className="text-right flex justify-between items-center gap-2">
                    <div className="flex pb-[2px] items-center">
                      {i?.submitTask && (
                        <p className="mr-2 font-bold text-[14px]">
                          {i?.submitTask?.length}
                        </p>
                      )}
                      {i?.submitTask?.slice(0, 3)?.map((x) => (
                        <div className="flex items-center">
                          <UserProfileImg
                            me={handleFindUser(x?.phoneNumber)}
                            textColor="sm:text-[8px] ring-offset-[1px] text-[8px] text-white"
                            className="w-4 h-4 -ml-[1px] bg-secondary ring-[1px] ring-[#91f2dc]"
                          />
                        </div>
                      ))}
                      {i?.submitTask?.length > 2 && (
                        <span className="font-bold ml-1 text-lg text-green-500">
                          . . .
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end gap-x-3 items-center">
                      {i?.planCategory && (
                        <p className="text-[12px]">{i?.planCategory}</p>
                      )}
                      {i?.planInTimeName && (
                        <p className="text-[12px]">{i?.planInTimeName}</p>
                      )}
                      {i?.planCategory === "Plan in time" && (
                        <p className="text-[12px]">{i?.planDuration}</p>
                      )}
                      {i?.status === "pending" && (
                        <p className="text-[12px]">
                          {format(new Date(i?.createdAt), "PP")}
                        </p>
                      )}
                      {i?.status === "running" && (
                        <p className="text-[12px]">
                          {format(new Date(i?.updatedAt), "PP")}
                        </p>
                      )}
                    </div>
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
                    <label
                      onClick={() => setGiveTask([i, me?._id])}
                      htmlFor="give-task"
                      className="text-primary mr-2 cursor-pointer"
                    >
                      {i?.status === "inactive" && (
                        <span className="text-gray-500">
                          <MdRemoveDone size={20} />
                        </span>
                      )}
                    </label>
                    {(i?.status === "running" ||
                      i?.status === "pending" ||
                      i?.status === "complete") && (
                      <div className="mr-2" onClick={worrning}>
                        <span className="text-green-500">
                          <MdDoneAll size={20} />
                        </span>
                      </div>
                    )}
                    <label
                      onClick={() => setOpenTask([i, "update"])}
                      htmlFor="create-task"
                      className="text-primary cursor-pointer"
                    >
                      <BiEdit size={20} />
                    </label>
                    <label
                      onClick={() => setDeletingModal(i)}
                      htmlFor="delete-confirm-modal"
                      className="text-accent ml-2 cursor-pointer"
                    >
                      <AiOutlineDelete size={20} />
                    </label>
                  </div>
                </div>
              </motion.div>
            </>
          ))}
          {!taskArr?.length && (
            <div className="text-center w-full mt-8">
              <h3 className="text-3xl text-purple-700 font-bold">
                No Task Found
              </h3>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
      {openTask && (
        <CreateTask
          openTask={openTask}
          setOpenTask={setOpenTask}
          refetch={taskRefetch}
        />
      )}
      {giveTask && (
        <GiveTask
          giveTask={giveTask}
          setGiveTask={setGiveTask}
          refetch={taskRefetch}
        />
      )}
      {deleteModule && (
        <DeleteModalConfirm
          deleteModule={deleteModule}
          setDeletingModal={setDeletingModal}
          refetch={taskRefetch}
          method={method}
        />
      )}
    </div>
  );
};

export default AdminWork;
