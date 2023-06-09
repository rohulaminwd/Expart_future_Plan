import React from "react";
import { useContext } from "react";
import { useState } from "react";
import {} from "react-icons/ri";
import ReactPlayer from "react-player";
import { MeContext } from "../App";
import ConfirmRecharge from "./ConfirmRecharge";
import TitleMarquee from "../Components/TitleMarquee";
import { accountName } from "../data/accountName";

const RechargeNow = ({ setRecharge, recharge }) => {
  const [card, setCard] = useState("Bkash");
  const [me, isLoading, refetch] = useContext(MeContext);
  const [rechargeConfirm, setRechargeConfirm] = useState(null);
  const [amount, setAmount] = useState(0);

  const handleState = () => {
    setRechargeConfirm({ amount, card, me });
    setRecharge("card");
  };

  const handleCard = (card) => {
    const myCard = me?.card?.find((i) => i?.cardName === card);
    console.log(myCard);
    return myCard;
  };

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
            for="recharge"
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
                <span className="font-bold text-lg">{me?.balance}</span>
              </p>
              <div className="tabs mt-2 flex w-full items-center sm:gap-2 gap-1.5 tabs-boxed">
                {accountName?.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => setCard(i?.name)}
                    className={`${
                      card === i?.name
                        ? "tab-active !text-white"
                        : "border border-[#9b9b9b] rounded-lg"
                    }  ${
                      handleCard(i?.name)?.cardName === i?.name
                        ? "!border-primary text-primary border"
                        : ""
                    } tab`}
                  >
                    {i?.name}
                  </div>
                ))}
              </div>
              <p className="mt-3">{`${
                card === "bkash" ? `Bkash: ${me?.bkash}` : `Nagad: ${me?.nagad}`
              }`}</p>
            </div>
            <p className="p-2 text-[16px] text-gray-700">
              Recharge Amount:{" "}
              <span className="text-secondary text-[14px]">
                ( Minimum 1000 )
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
                disabled={amount < 1000}
              >
                Recharge Now
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
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
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
