import React from "react";
import { useState } from "react";
import recharge from "../../assets/icons/taka (1).png";
import withdraw from "../../assets/icons/taka1 (1).png";
import Loading from "../../Share/Loading";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { useEffect } from "react";
import { useContext } from "react";
import { MeContext, RequestContext } from "../../App";

const History = () => {
  const [me, MeLoading] = useContext(MeContext);
  const [request, requestLoading] = useContext(RequestContext);
  const [design, setDesign] = useState("Recharge1");
  const [planTime, setPlanTime] = useState([]);

  useEffect(() => {
    if (request) {
      setPlanTime(pending);
    }
  }, [request]);

  const handleState = (i, x) => {
    setPlanTime(i);
    setDesign(x);
  };

  if (MeLoading || requestLoading) {
    return <Loading />;
  }

  const myRequest = request?.filter((i) =>
    i?.phoneNumber?.includes(me?.phoneNumber)
  );
  const pending = myRequest?.filter((i) => i?.status?.includes("pending"));
  const complete = myRequest?.filter((i) => i?.status?.includes("complete"));
  const cancelled = myRequest?.filter((i) => i?.status?.includes("cancelled"));

  console.log(me, "kisui pacchi na");

  return (
    <div className="w-full sm:p-0 p-2">
      <div className="w-full bg-white p-2 sm:p-3 rounded-md shadow-md">
        <div className="w-full flex items-center justify-between ">
          <div
            onClick={() => handleState(pending, "Recharge1")}
            className={`${
              design === "Recharge1"
                ? "bg-gradient-to-r from-[#13b38f] to-[#2091d9] duration-100 rounded-md !text-white"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">{pending?.length}</h1>
              <h1 className="text-[14px]">Pending</h1>
            </div>
          </div>
          <div
            onClick={() => handleState(complete, "Recharge2")}
            className={`${
              design === "Recharge2"
                ? "bg-gradient-to-r from-[#13b38f] to-[#2091d9] text-white duration-100 rounded-md"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">{complete?.length}</h1>
              <h1 className="text-[14px]">Complete</h1>
            </div>
          </div>
          <div
            onClick={() => handleState(cancelled, "Recharge3")}
            className={`${
              design === "Recharge3"
                ? "bg-gradient-to-r from-[#13b38f] to-[#2091d9] text-white duration-100 rounded-md"
                : "border bg-slate-100"
            } cursor-pointer w-full py-2 px-0`}
          >
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl">{cancelled?.length}</h1>
              <h1 className="text-[14px]">Canceled</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 mt-3">
        {planTime.map((i, index) => (
          <>
            <motion.div
              initial={{
                y: "20vw",
                transition: { type: "spring", duration: 0.1 },
              }}
              animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
              exit={{ y: "60vw", scale: [1, 0], transition: { duration: 0.5 } }}
              className={`${
                i?.status === "pending"
                  ? "hover:border-[#c9f8d6] text-[#000] bg-white"
                  : "bg-[#ffffff] text-[#000] hover:border-[#dedede]"
              } 
                        ${
                          i?.status === "cancelled"
                            ? "hover:border-[#399d2c] bg-red-900 text-white"
                            : "text-white hover:border-[#9df1e5]"
                        }  
                        p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[1px]  duration-300 shadow-md rounded-2xl hover:!text-white hover:bg-gradient-to-r hover:from-[#13b38f] hover:to-[#2091d9]`}
            >
              <div className="flex relative border-b pb-2 justify-between gap-2">
                <div className="w-full flex items-center gap-2">
                  <div>
                    {i.sector === "recharge" && (
                      <img src={recharge} className="w-10" alt="pending " />
                    )}
                    {i.sector === "withdraw" && (
                      <img src={withdraw} className="w-10" alt="pending " />
                    )}
                  </div>
                  <div>
                    <h3
                      className={` ${
                        i?.sector === "recharge"
                          ? "text-[#3b7a53] hover:text-white"
                          : ""
                      } text-[16px] capitalize font-bold`}
                    >
                      {i?.sector}
                    </h3>
                    <p className="text-[14px]">{i?.accountNumber}</p>
                  </div>
                </div>
                <div className="absolute top-0 right-0">
                  <h2 className="font-bold text-accent">{i?.amount} $</h2>
                </div>
              </div>
              <div className="flex items-end justify-between mt-2">
                <div className="">
                  {i?.tranId && <p className="text-[14px]">ID: {i?.tranId}</p>}
                </div>
                <div className="">
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
            </motion.div>
          </>
        ))}
      </div>
    </div>
  );
};

export default History;
