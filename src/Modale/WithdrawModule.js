import React from "react";
import "../App.css";
import { useState } from "react";
import {} from "react-icons/ri";
import ReactPlayer from "react-player";
import Loading from "../Share/Loading";
import ConfirmWithdraw from "./ConfirmWithdraw";
import { toast } from "react-toastify";
import { useContext } from "react";
import { MeContext } from "../App";
import { accountName } from "../data/accountName";
import TitleMarquee from "../Components/TitleMarquee";
import axios from "../Utils/Axios.config";

const WithdrawModule = ({ setWithdraw, withdraw, setUpdateModal }) => {
  const [card, setCard] = useState("Bkash");
  const [withdrawConfirm, setWithdrawConfirm] = useState(null);
  const [amount, setAmount] = useState(0);
  const [accountNum, setAccountNum] = useState(0);
  const [error, SetError] = useState();
  const [loading1, setLoading] = useState(false);
  const [me, isLoading, refetch] = useContext(MeContext);

  if (loading1 || isLoading) {
    return <Loading />;
  }

  const handleCard = (card) => {
    const myCard = me?.card?.find((i) => i?.cardName === card);
    console.log(myCard);
    return myCard;
  };

  const commission = (amount / 100) * 5;

  const handleState = () => {
    setWithdrawConfirm({ amount, card });

    // setLoading(true)
    const requestInfo = {
      sector: "withdraw",
      amount: amount,
      user: me?._id,
      accountNumber: accountNum,
      PaymentMethod: card,
    };

    axios
      .post("/request/create", requestInfo)
      .then((response) => {
        const status = response?.data;
        if (status.success === true) {
          toast.success("Your Request Success");
          setLoading(false);
          setUpdateModal(null);
          setWithdraw(null);
          refetch();
        }
        if (status.success === false) {
          setLoading(false);
          toast.error("Your Request fail plx try again");
          SetError(status.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const minAmount = card === "Bkash" || card === "Nagad" ? 550 : 5;
  return (
    <div>
      <input type="checkbox" id="withdraw" className="modal-toggle" />
      <div
        className={`${
          withdraw === "hidden" && "hidden"
        } modal h-screen modal-bottom sm:modal-middle`}
      >
        <div className="modal-box bg-blue-100 h-auto px-2 py-4 sm:py-8 sm:px-4">
          <label
            htmlFor="withdraw"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl uppercase text-center font-bold text-primary">
            Withdraw
          </h1>
          <div className="text-center w-full p-2 shadow-md mt-5 rounded-md bg-white">
            <TitleMarquee title={"This is Withdraw Chanel"} />
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
            </div>
            <p className="p-2 text-[16px] text-gray-700">
              Withdraw Amount:{" "}
              <span className="text-secondary text-[14px]">
                ( Minimum{" "}
                {card === "Bkash" || card === "Nagad" ? "550 ৳" : "5 $"} )
              </span>
            </p>

            {/* <p>
              5% Commission You get {amount} - {commission} ={" "}
              {amount - commission}
            </p> */}
            <form className="w-full mt-4">
              <div className="my-2">
                <span>{card} Account Number</span>
                <input
                  type="text"
                  placeholder="Enter Account Number"
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-sm input-primary input-bordered w-full"
                  required
                />
              </div>

              <div className="my-2">
                <span>Withdraw Amount</span>
                <input
                  type="number"
                  placeholder="Enter Withdraw Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  className="input input-primary input-sm input-bordered w-full"
                  required
                />
              </div>

              <p className="text-center text-sm text-red-500">{error}</p>
              <label
                onClick={handleState}
                htmlFor="confirmWithdraw"
                className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm"
                disabled={
                  amount < minAmount ||
                  me?.balance < minAmount ||
                  me?.balance < amount
                }
              >
                Withdraw Now
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
      {withdrawConfirm && (
        <ConfirmWithdraw
          withdrawConfirm={withdrawConfirm}
          setWithdrawConfirm={setWithdrawConfirm}
        />
      )}
    </div>
  );
};

export default WithdrawModule;
