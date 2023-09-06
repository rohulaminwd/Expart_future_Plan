import React, { useContext } from "react";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { MeContext } from "../../../App";
import { toast } from "react-toastify";
import { betAmountData } from "../../../data/betAmount";
import WinModule from "./gameModule/WinModule";

const RouletteWheelGame1 = () => {
  const [me, isLoading, refetch] = useContext(MeContext);
  const [spin, setSpin] = useState(false);
  const [winModule, setWinModule] = useState(null);
  const [betAmount, setBetAmount] = useState(0.2);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const data = [
    { option: "0", style: { backgroundColor: "#b041e8", textColor: "white" } },
    {
      option: "1",
      style: {
        backgroundColor: "",
        textColor: "#5a2276",
      },
    },
    { option: "2X", style: { backgroundColor: "#b041e8", textColor: "white" } },
    { option: "1X", style: { backgroundColor: "", textColor: "#5a2276" } },
    { option: "0", style: { backgroundColor: "#b041e8", textColor: "white" } },
    { option: "1X", style: { backgroundColor: "", textColor: "#5a2276" } },
    { option: "2X", style: { backgroundColor: "#b041e8", textColor: "white" } },
    { option: "0", style: { backgroundColor: "", textColor: "#5a2276" } },
    { option: "2X", style: { backgroundColor: "#b041e8", textColor: "white" } },
    { option: "1X", style: { backgroundColor: "", textColor: "#5a2276" } },
    { option: "0", style: { backgroundColor: "#b041e8", textColor: "white" } },
    { option: "3X", style: { backgroundColor: "", textColor: "#5a2276" } },
  ];

  console.log(data[prizeNumber].option);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setSpin(true);
  };

  const handleCalculate = (bet) => {
    const amount = data[prizeNumber].option.slice(0, 1);

    setWinModule([amount, betAmount, me]);
  };

  const minMax = betAmount < 0.2 || betAmount > 100;

  return (
    <div className="relative sm:p-3 p-2">
      <div>
        {winModule && (
          <WinModule setWinModule={setWinModule} winModule={winModule} />
        )}
      </div>
      <div className="flex justify-center">
        <div className="w-full">
          <div className="mt-5 flex justify-center">
            <Wheel
              mustStartSpinning={spin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={["#e72f2f", "#4cdce1"]}
              textColors={["#ffffff"]}
              outerBorderColor="#20b5c5"
              innerBorderColor="#e72f2f"
              onStopSpinning={() => {
                setSpin(false);
                handleCalculate();
              }}
            />
          </div>
          <div className="max-w-xl mx-auto w-full sm:p-3 p-2 bg-white rounded-lg mt-8">
            <div className="flex items-center justify-between gap-x-2 rounded-lg">
              {betAmountData?.map((i) => (
                <span
                  onClick={() => setBetAmount(i?.amount)}
                  className="text-purple-70 text-center text-purple-700 w-full border cursor-pointer hover:bg-purple-500 hover:text-white border-purple-200 px-2 bg-purple-100 rounded-md"
                >
                  {i?.amount} $
                </span>
              ))}
            </div>
            <div className="flex mt-5 bg-purple-50 rounded-lg p-2 items-center justify-between gap-x-3">
              <div className="w-full">
                <div className="flex items-center gap-x-2 w-full px-2 border-b border-purple-500 text-purple-800">
                  <input
                    onChange={(e) => setBetAmount(e.target.value)}
                    className="border-0 bg-purple-50 outline-none w-8 mb-0.5"
                    value={betAmount}
                  />

                  <span>$</span>
                </div>
                <span className="text-sm pl-2 text-purple-400">
                  Min 0.20 -- Max 100 $
                </span>
              </div>
              <label
                htmlFor="win"
                onClick={handleSpinClick}
                disabled={me?.balance < 0.2 || spin || minMax}
                className="btn btn-sm bg-purple-700 hover:border-purple-500 hover:bg-purple-600 text-white border-purple-500 outline-0"
              >
                Bet
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheelGame1;
