import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {} from "react-icons/ri";
import useMe from "../Hooks/useMe";
import balance from "../assets/images/balance.webp";
import { Button, CopyButton } from "@mantine/core";
import { toast } from "react-toastify";
import Loading from "../Share/Loading";
import axios from "../Utils/Axios.config";
import { ProgressBar } from "react-loader-spinner";

const ConfirmRecharge = ({
  setRecharge,
  refetch,
  setRechargeConfirm,
  rechargeConfirm,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [transCode, setTransCode] = useState(0);
  const [me] = useMe();
  const [loading, setLoading] = useState(false);

  const accountNumber = rechargeConfirm?.card;

  const onSubmit = (data) => {
    setLoading(true);
    const requestInfo = {
      tranId: data.tranId,
      sector: "recharge",
      amount: rechargeConfirm?.amount,
      user: me?._id,
      accountNumber: data?.accountNumber,
    };

    axios
      .post("/request/create", requestInfo)
      .then((response) => {
        const status = response?.data;
        if (status.success === true) {
          toast.success("Your Request Success");
          setLoading(false);
          setRechargeConfirm(null);
          setRecharge(null);
          refetch();
        }
        if (status.success === false) {
          setLoading(false);
          toast.error("Your Request fail plx try again");
        }
        setLoading(false);
        console.log(status);
      })
      .catch((error) => {
        toast.error(error?.message);
        console.log(error, "onk");
      });
  };

  return (
    <div>
      <input type="checkbox" id="confirmRecharge" className="modal-toggle" />
      <div className="modal h-screen modal-bottom sm:modal-middle">
        <div className="modal-box bg-blue-100 h-screen sm:h-auto px-2 py-4 sm:py-8 sm:px-4">
          <label
            htmlFor="confirmRecharge"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl uppercase text-center font-bold text-primary">
            Recharge
          </h1>
          <div className="w-full p-3 shadow-md mt-5 rounded-md bg-white">
            <div className="flex items-center border-b w-full gap-1 mx-auto">
              <img src={balance} className="w-20" alt="balance" />
              <div>
                <p className="text-3xl font-bold text-accent">
                  {rechargeConfirm?.amount} tk
                </p>
                <p className="text-gray-700">Your account : {accountNumber}</p>
              </div>
            </div>
            <p className="mt-2">
              Lorem ipsum dolor sit amet consectetur error dolor tempore
              aspernatur eligendi consectetur deleniti modi accusamus quasi
              quia, corporis doloribus eum.
            </p>
          </div>
          <div className="w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white">
            <div className="rounded-md p-3 bg-slate-200">
              <p className="text-[14px">Target Bkash Account</p>
              <div className="flex mx-auto rounded-lg gap-2 sm:gap-3 max-w-[500px] items-center">
                <div className="p-1 sm:p-2 border w-full rounded-md">
                  <p className="font-bold text-xl">01831294559</p>
                </div>
                <div className="">
                  <CopyButton value="01831294559">
                    {({ copied, copy }) => (
                      <Button
                        className={`${
                          copied ? "bg-[#177865]" : "bg-[#174e78]"
                        } !py-0 px-4 rounded-3xl`}
                        onClick={copy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </div>
              </div>
              <p className="text-[14px">The Amount to be transferred</p>
              <div className="flex mx-auto rounded-lg gap-2 sm:gap-3 max-w-[500px] items-center">
                <div className="p-1 sm:p-2 border w-full rounded-md">
                  <p className="font-bold text-xl">
                    {rechargeConfirm?.amount} $
                  </p>
                </div>
                <div className="">
                  <CopyButton value={rechargeConfirm?.amount}>
                    {({ copied, copy }) => (
                      <Button
                        className={`${
                          copied ? "bg-[#177865]" : "bg-[#174e78]"
                        } !py-0 px-4 rounded-3xl`}
                        onClick={copy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
              <div className="">
                <input
                  type="text"
                  placeholder="Enter Transection Id"
                  onChange={(e) => setTransCode(e.target.value)}
                  class="input input-sm input-accent input-bordered w-full"
                  required
                  {...register("tranId", {
                    required: {
                      value: true,
                      message: "Transection Id is required",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Enter Account Number"
                  onChange={(e) => setTransCode(e.target.value)}
                  class="input mt-3 input-sm input-accent input-bordered w-full"
                  required
                  {...register("accountNumber", {
                    required: {
                      value: true,
                      message: "Enter Account Number",
                    },
                  })}
                />
              </div>
              {loading && (
                <div className="w-full flex items-center justify-center">
                  <ProgressBar
                    height="80"
                    width="80"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass="progress-bar-wrapper"
                    borderColor="#F4442E"
                    barColor="#51E5FF"
                  />
                </div>
              )}
              <input
                type="submit"
                value="Submit"
                className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm"
              />
            </form>
          </div>
          <div className=" w-full p-3 shadow-md mt-5 rounded-md bg-white">
            <p className="text-xl font-bold">Help Video</p>
            <p className="mt-2">
              error dolor tempore aspernatur eligendi consectetur deleniti modi
              accusamus quasi quia, corporis doloribus eum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRecharge;
