import React from "react";
import "../App.css";
import {} from "react-icons/ri";
import complete from "../assets/images/complete2.png";

const ConfirmWithdraw = ({
  setWithdraw,
  setWithdrawConfirm,
  withdrawConfirm,
}) => {
  const handleClose = () => {
    setWithdrawConfirm(null);
    setWithdraw(null);
  };
  return (
    <div>
      <input type="checkbox" id="confirmWithdraw" className="modal-toggle" />
      <div className="modal h-screen modal-bottom sm:modal-middle">
        <div className="modal-box bg-blue-100 h-screen sm:h-auto px-2 py-4 sm:py-8 sm:px-4">
          <div className="text-xl text-center font-bold text-accent">
            <img src={complete} className="w-32 mx-auto" alt="complete" />
            <h2 className="text-2xl font-bold text-green-500">
              Your Withdraw Request{" "}
              <span className="text-accent">{withdrawConfirm?.amount} tk</span>{" "}
              is successfully
            </h2>
          </div>
          <div className="w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white">
            <div className="rounded-md p-3 bg-slate-200">
              <p className="s">
                ধন্যবাদ আপনার পেমেন্ট রিকুয়েষ্ট টি সফল হয়েছে ২৪ থেকে ৪৮ ঘন্টার
                ভিতরে আপনার একাউন্ট নাম্বার এ পেমেন্ট পৌছে যাবে।
              </p>
            </div>
            <form className="w-full mt-2">
              <label
                onClick={handleClose}
                htmlFor="confirmWithdraw"
                className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm"
              >
                Ok
              </label>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWithdraw;
