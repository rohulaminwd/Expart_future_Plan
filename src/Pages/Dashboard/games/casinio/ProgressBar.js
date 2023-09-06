// import { LinearProgress } from "@mui/material";
import anime from "animejs";
import React, { useEffect } from "react";
import { GameStages } from "./Global";

const ProgressBarRound = (props) => {
  useEffect(() => {
    console.log("stage : " + props.stage);
    console.log("maxDuration : " + props.maxDuration);
    console.log("currentDuration : " + props.currentDuration);
    var duration = (props.maxDuration - props.currentDuration) * 1000;
    console.log(duration);
    anime({
      targets: "progress",
      value: [0, 100],
      easing: "linear",
      autoplay: true,
      duration: duration,
    });
  }, [props.stage, props.maxDuration, props.currentDuration]);

  return (
    <div>
      <div className="text-purple-200 text-center text-xl mb-3 font-bold">
        {props.stage === GameStages.PLACE_BET
          ? "PLACE BET"
          : props.stage === GameStages.WINNERS
          ? " WINNERS"
          : "NO MORE BETS"}
      </div>
      <progress
        className=" w-[250px] sm:w-[400px] h-[12px] sm:h-[20px] rounded-[20px]"
        value="0"
        max="100"
      />
    </div>
  );
};

export default ProgressBarRound;
