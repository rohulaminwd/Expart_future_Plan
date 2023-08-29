import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import payment from "../../assets/icons/payment (1).png";
import StatusUpdate from "../../Modale/StatusUpdate";
import Loading from "../../Share/Loading";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModalConfirm from "../../Modale/DeleteModalConfirm";
import { format } from "date-fns";
import { useEffect } from "react";
import { MdFileDownloadDone, MdOutlineKeyboardReturn } from "react-icons/md";
import { useContext } from "react";
import { RequestContext } from "../../App";

const WithdrawRequest = () => {
  const [requests, requestLoading, refetch] = useContext(RequestContext);
  const [design, setDesign] = useState("Recharge1");
  const [planTime, setPlanTime] = useState([]);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [deleteModule, setDeletingModal] = useState(null);
  const method = "request";
  const request = "return";
  const done = "done";

  useEffect(() => {
    if (requests) {
      setPlanTime(rechargePending);
    }
  }, [requests]);

  const handleState = (i, x) => {
    setPlanTime(i);
    setDesign(x);
  };

  if (requestLoading || !planTime) {
    return <Loading />;
  }

  const recharge = requests?.filter((i) => i?.sector?.includes("recharge"));
  const rechargePending = recharge?.filter((i) =>
    i?.status?.includes("pending")
  );
  const rechargeComplete = recharge?.filter((i) =>
    i?.status?.includes("complete")
  );
  const withdraw = requests?.filter((i) => i?.sector?.includes("withdraw"));
  const withdrawPending = withdraw?.filter((i) =>
    i?.status?.includes("pending")
  );
  const withdrawComplete = withdraw?.filter((i) =>
    i?.status?.includes("complete")
  );

  const handleSelect = (i) => {
    if (i === "RechargePending") {
      setPlanTime(rechargePending);
      setDesign("Recharge1");
    } else if (i === "RechargeComplete") {
      setPlanTime(rechargeComplete);
      setDesign("Recharge2");
    } else if (i === "WithdrawPending") {
      setPlanTime(withdrawPending);
      setDesign("Recharge3");
    } else if (i === "WithdrawComplete") {
      setPlanTime(withdrawComplete);
      setDesign("Recharge4");
    }
  };

  return (
    <div className="w-full sm:p-0 p-2">
      <div
        className={`flex justify-between items-center gap-x-3 bg-[#ffffff] p-3 rounded-xl w-full`}
      >
        <div className="w-[100px] py-2 bg-[#f0eaf7] flex items-center justify-center rounded-lg">
          <span className="text-xl font-bold text-purple-700">
            {planTime?.length ? planTime?.length : 0}
          </span>
        </div>
        <select
          onChange={(e) => handleSelect(e.target.value)}
          className="text-sm border px-3 py-2 rounded-lg w-full"
        >
          <option value="RechargePending" select>
            RechargePending
          </option>
          <option value="RechargeComplete">RechargeComplete</option>
          <option value="WithdrawPending">WithdrawPending</option>
          <option value="WithdrawComplete">WithdrawComplete</option>
        </select>
      </div>
      <motion.div className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 mt-3">
        <AnimatePresence>
          {planTime.map((i, index) => (
            <>
              <motion.div
                layout
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ opacity: 0, scale: 0 }}
                className={`${
                  i?.status === "complete"
                    ? "text-[#156c65] border-[#c9f8d6] bg-[#dbfbd7]"
                    : "bg-[#ffffff] text-[#000] border-[#dedede]"
                } 
                        ${
                          i?.status === "complete"
                            ? "text-[#156c65] border-[#8df3f9] bg-green-200"
                            : "bg-primary text-white border-[#9df1e5]"
                        }  
                        p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px]  duration-300 shadow-md rounded-2xl`}
              >
                <div className="flex relative border-b-2 pb-3 justify-between gap-2">
                  <div className="w-full flex items-center gap-2">
                    <div>
                      <img src={payment} className="w-16" alt="pending " />
                    </div>
                    <div>
                      <h3 className="text-[20px] font-bold">{i.name}</h3>
                      <p className="text-[16px]">{i?.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0">
                    <h2 className="font-bold text-accent">{i?.amount} $</h2>
                  </div>
                  <div className="absolute top-[55px] right-0">
                    {i?.status === "pending" && (
                      <p className="text-[12px]">
                        {format(new Date(i?.createdAt), "PP")}
                      </p>
                    )}
                    {i?.status === "complete" && (
                      <p className="text-[12px]">
                        {format(new Date(i?.updatedAt), "PP")}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <div className="">
                    <h3 className="text-[16px]">Account: {i?.accountNumber}</h3>
                    {i?.tranId && (
                      <p className="text-[16px]">ID: {i?.tranId}</p>
                    )}
                  </div>
                  <div className="flex items-center">
                    {i?.status === "pending" && i?.sector === "recharge" && (
                      <label
                        onClick={() => setUpdateStatus({ i, refetch })}
                        htmlFor="update-status"
                        className="btn btn-success text-white btn-sm"
                      >
                        add
                      </label>
                    )}
                    {i?.status === "pending" && i?.sector === "withdraw" && (
                      <label
                        onClick={() => setUpdateStatus({ i, refetch, request })}
                        htmlFor="update-status"
                        className="mr-2 cursor-pointer text-red-900"
                      >
                        <span className="text-red-900">
                          <MdOutlineKeyboardReturn size={20} />
                        </span>
                      </label>
                    )}
                    {i?.status === "pending" && i?.sector === "withdraw" && (
                      <label
                        onClick={() => setUpdateStatus({ i, refetch, done })}
                        htmlFor="update-status"
                        className="cursor-pointer"
                      >
                        <span className="text-green-500">
                          <MdFileDownloadDone size={20} />
                        </span>
                      </label>
                    )}
                    <label
                      onClick={() => setDeletingModal(i)}
                      htmlFor="delete-confirm-modal"
                      className="btn btn-accent ml-2 text-white btn-sm"
                    >
                      <AiOutlineDelete size={20} />
                    </label>
                  </div>
                </div>
              </motion.div>
            </>
          ))}
        </AnimatePresence>
      </motion.div>
      {updateStatus && (
        <StatusUpdate
          updateStatus={updateStatus}
          setUpdateStatus={setUpdateStatus}
        />
      )}
      {deleteModule && (
        <DeleteModalConfirm
          deleteModule={deleteModule}
          refetch={refetch}
          method={method}
          setDeletingModal={setDeletingModal}
        />
      )}
    </div>
  );
};

export default WithdrawRequest;
