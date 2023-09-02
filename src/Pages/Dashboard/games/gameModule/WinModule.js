import React from "react";
import Lottie from "lottie-react";
import gameWin from "../../../../assets/lottie/game (2).json";

const WinModule = ({ winModule, setWinModule }) => {
  const [amount, betAmount, me] = winModule;
  const handleShowMessage = () => {
    setTimeout(() => {
      setWinModule(null);
    }, 5000);
  };
  return (
    <div className="absolute z-[100000] flex justify-center items-center top-0 left-0 w-full h-screen">
      <div
        className="w-[220px] relative pt-10 pb-4 rounded-lg shadow-2xl border border-purple-100 bg-purple-50"
        data-aos="zoom-in-down"
        data-aos-delay="100"
        data-aos-duration="600"
      >
        <div className="absolute w-full flex justify-center top-0 left-0">
          <div className="-mt-[60px] p-3 shadow-lg border border-purple-300 bg-purple-100 rounded-full">
            <Lottie
              animationData={gameWin}
              loop={true}
              style={{ height: "80px" }}
            />
          </div>
        </div>
        <h3 className="font-bold mt-5 text-2xl text-center text-purple-700">
          {amount > 0 ? (
            <span> You Win {(amount * betAmount).toFixed(2)} $</span>
          ) : (
            <span className="text-accent">You Lost {betAmount} </span>
          )}
        </h3>
        <div className="flex justify-center">
          <label htmlFor="win" onClick={handleShowMessage()}></label>
        </div>
      </div>
    </div>
  );
};

export default WinModule;
