import React, { useContext } from "react";
import { useState } from "react";
import { Wheel } from "react-custom-roulette";
import { MeContext } from "../../../App";

const RouletteWheelGame1 = () => {
  const [me, isLoading, refetch] = useContext(MeContext);
  const [spin, setSpin] = useState(false);
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
    { option: "1X", style: { backgroundColor: "", textColor: "#5a2276" } },
  ];

  console.log(data[prizeNumber].option);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setSpin(true);
  };
  return (
    <div className="sm:px-0 p-2">
      <div className="w-full flex justify-between p-2 text-[#5a2276] rounded-lg bg-purple-50">
        <span>Balance: {me?.balance?.toFixed(2)} $ </span>
        <div>
          <span className="btn text-white btn-primary btn-xs">Deposit</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <div className="mt-5">
            <Wheel
              mustStartSpinning={spin}
              prizeNumber={prizeNumber}
              data={data}
              backgroundColors={["#3e3e3e", "#4cdce1"]}
              textColors={["#ffffff"]}
              outerBorderColor="#5a2276"
              innerBorderColor="#5a2276"
              onStopSpinning={() => {
                setSpin(false);
              }}
            />
          </div>
          <div className="flex  justify-between items-center mt-8">
            <div className="flex justify-between items-center gap-x-2 p-2 bg-white rounded-lg">
              <span className="text-purple-70 border border-purple-200 px-2 bg-purple-100 rounded-md">
                20 $
              </span>
              <span className="text-purple-70 border border-purple-200 px-2 bg-purple-100 rounded-md">
                40 $
              </span>
            </div>
            <span
              onClick={handleSpinClick}
              className="btn btn-sm bg-purple-700 hover:bg-purple-600 text-white border-purple-500 outline-0"
            >
              Start spin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheelGame1;
