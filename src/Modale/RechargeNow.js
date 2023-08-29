import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {} from "react-icons/ri";
import ReactPlayer from "react-player";
import { MeContext, UserContext } from "../App";
import ConfirmRecharge from "./ConfirmRecharge";
import TitleMarquee from "../Components/TitleMarquee";
import { accountName } from "../data/accountName";

const RechargeNow = ({ setRecharge, recharge }) => {
  const [users, userLoading, userRefetch, userError, blocked] =
    useContext(UserContext);
  const [card, setCard] = useState("Bkash");
  const [me, isLoading, refetch] = useContext(MeContext);
  const [rechargeConfirm, setRechargeConfirm] = useState(null);
  const [amount, setAmount] = useState(0);

  const subAdmin = users?.filter((i) => i?.role?.includes("subAdmin"));
  const admin = users?.find((i) => i?.role?.includes("admin"));
  if (admin) {
    subAdmin.push(admin);
  }

  const activeAdmin = subAdmin?.find((i) => i?.subAdminStatus === "active");

  const handleCard = (admin) => {
    const myCard = admin?.card?.find((i) => i?.cardName === card);
    return myCard;
  };

  const handleState = () => {
    setRechargeConfirm({ amount, card, activeAdmin });
    setRecharge("card");
  };

  const minAmount = card === "Bkash" || card === "Nagod" ? 1000 : 10;

  return (
    <div>
      <input type="checkbox" id="recharge" className="modal-toggle" />
      <div
        className={`${
          recharge === "card" && "hidden"
        } modal h-screen modal-bottom sm:modal-middle`}
      >
        <div className="modal-box bg-blue-100 h-screen sm:h-auto px-2 py-4 sm:py-8 sm:px-4">
          <label
            htmlFor="recharge"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl uppercase text-center font-bold text-primary">
            Recharge
          </h1>
          <div className="text-center w-full p-2 shadow-md mt-5 rounded-md bg-white">
            <TitleMarquee title={"This is recharge Chanel"} />
          </div>
          <div className="w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white">
            <div className="rounded-md p-3 bg-slate-200">
              <p>
                Available Balance:{" "}
                <span className="font-bold text-lg">{me?.balance} $</span>
              </p>
              <div className="tabs mt-2 flex w-full items-center sm:gap-2 gap-2 tabs-boxed">
                {accountName?.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => setCard(i?.name)}
                    className={`${
                      card === i?.name ? "border border-primary" : ""
                    } tab sm:w-[100px] w-[90px] h-full bg-white rounded-lg`}
                  >
                    <div className="sm:w-[100px] w-[90px] rounded-lg bg-white">
                      <img src={i?.img} className="w-full" alt="cardImg" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3"></p>
            </div>
            <p className="p-2 text-[16px] text-gray-700">
              Recharge Amount:{" "}
              <span className="text-secondary text-[14px]">
                ( Minimum{" "}
                {card === "Bkash" || card === "Nagod" ? "1000 ৳" : "10 $"} )
              </span>
            </p>
            <form className="w-full mt-4">
              <input
                type="number"
                placeholder="Enter Recharge Amount"
                onChange={(e) => setAmount(e.target.value)}
                class="input input-sm input-bordered w-full"
                required
              />
              <label
                onClick={handleState}
                htmlFor="confirmRecharge"
                className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm"
                disabled={amount < minAmount}
              >
                Next
              </label>
            </form>
          </div>
          <div className=" w-full p-2 shadow-md mt-5 rounded-md bg-white">
            <p>Help Video</p>
            <div className="flex items-center py-4 px-2 justify-between gap-8">
              <ReactPlayer
                height="80px"
                url="https://www.youtube.com/watch?v=h0yPK_A1b74"
              />
              <ReactPlayer
                height="80px"
                url="https://youtu.be/etANLEnIIhA?si=E8ls0ChPh_jF4PK3"
              />
            </div>
          </div>
        </div>
      </div>
      {
        <ConfirmRecharge
          rechargeConfirm={rechargeConfirm}
          setRecharge={setRecharge}
          refetch={refetch}
          setRechargeConfirm={setRechargeConfirm}
        />
      }
    </div>
  );
};

export default RechargeNow;
