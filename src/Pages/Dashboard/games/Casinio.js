import React, { useState, useEffect, useRef, useContext } from "react";
import Wheel from "./casinio/Wheel";
import Board from "./casinio/Board";
import { Timer } from "easytimer.js";
import ProgressBarRound from "./casinio/ProgressBar";
import classNames from "classnames";
import { io } from "socket.io-client";
import "./casinio/style.css";
import { MeContext } from "../../../App";

const Casinio = () => {
  const [me] = useContext(MeContext);
  const username = me?.name?.firstName + " " + me?.name?.lastName;

  const rouletteWheelNumbers = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
    24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];

  const timer = useRef(new Timer());
  const numberRef = useRef(null);

  const [rouletteData, setRouletteData] = useState({
    numbers: rouletteWheelNumbers,
  });

  const [chipsData, setChipsData] = useState({
    selectedChip: null,
    placedChips: new Map(),
  });

  const [number, setNumber] = useState({ next: null });
  const [winners, setWinners] = useState([]);
  const [history, setHistory] = useState([]);
  const [stage, setStage] = useState("");
  const [endTime, setEndTime] = useState(0);
  const [progressCountdown, setProgressCountdown] = useState(0);
  const [time_remaining, setTimeRemaining] = useState(0);

  const animateProgress = useRef();
  const socketServerRef = useRef(null);

  const blackNumbers = [
    2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35,
  ];

  useEffect(() => {
    const socketServer = io("http://localhost:5000");
    console.log("game data no");
    socketServer?.current?.open();

    socketServer?.current?.on("stage-change", (data) => {
      const gameData = JSON.parse(data);
      console.log(gameData, "game data pain nai");
      setGameData(gameData);
    });

    socketServer?.current?.on("connect", (socket) => {
      console.log("hereee2");
      //   setUsername(username);
      socketServer?.current?.emit("enter", username);
    });

    return () => {
      socketServer?.current?.close();
    };
  }, [username]);

  const setGameData = (gameData) => {
    if (gameData.stage === "NO_MORE_BETS") {
      const endTime = 35;
      const nextNumber = gameData.value;
      setEndTime(endTime);
      setProgressCountdown(endTime - gameData.time_remaining);
      setNumber({ next: nextNumber });
      setStage(gameData.stage);
      setTimeRemaining(gameData.time_remaining);
    } else if (gameData.stage === "WINNERS") {
      const endTime = 59;
      if (gameData.wins.length > 0) {
        setEndTime(endTime);
        setProgressCountdown(endTime - gameData.time_remaining);
        setWinners(gameData.wins);
        setStage(gameData.stage);
        setTimeRemaining(gameData.time_remaining);
        setHistory(gameData.history);
      } else {
        setEndTime(endTime);
        setProgressCountdown(endTime - gameData.time_remaining);
        setStage(gameData.stage);
        setTimeRemaining(gameData.time_remaining);
        setHistory(gameData.history);
      }
    } else {
      const endTime = 25;
      setEndTime(endTime);
      setProgressCountdown(endTime - gameData.time_remaining);
      setStage(gameData.stage);
      setTimeRemaining(gameData.time_remaining);
    }
  };

  const onCellClick = (item) => {
    const currentChips = new Map(chipsData.placedChips);

    const chipValue = chipsData.selectedChip;
    if (chipValue === 0 || chipValue === null) {
      return;
    }

    let currentChip = {};
    currentChip.item = item;
    currentChip.sum = chipValue;

    if (currentChips.get(item) !== undefined) {
      currentChip.sum += currentChips.get(item).sum;
    }

    currentChips.set(item, currentChip);
    setChipsData({
      selectedChip: chipsData.selectedChip,
      placedChips: currentChips,
    });
  };

  const onChipClick = (chip) => {
    if (chip !== null) {
      setChipsData({
        selectedChip: chip,
        placedChips: chipsData.placedChips,
      });
    }
  };

  const getChipClasses = (chip) => {
    const cellClass = classNames({
      chip_selected: chip === chipsData.selectedChip,
      "chip-100": chip === 100,
      "chip-20": chip === 20,
      "chip-10": chip === 10,
      "chip-5": chip === 5,
    });

    return cellClass;
  };

  const onSpinClick = () => {
    const nextNumber = numberRef.current?.value;
    if (nextNumber !== null) {
      setNumber({ next: nextNumber });
    }
  };

  const placeBet = () => {
    const placedChipsMap = chipsData.placedChips;
    const chips = [];

    for (let key of Array.from(placedChipsMap.keys())) {
      const chipsPlaced = placedChipsMap.get(key);
      chips.push(chipsPlaced);
    }

    socketServerRef.current.emit("place-bet", JSON.stringify(chips));
  };

  const clearBet = () => {
    setChipsData({
      placedChips: new Map(),
    });
  };

  console.log(stage, "ok");

  return (
    <div className="casinio">
      <div>
        <div className="rouletteWheelWrapper">
          <div>
            <div className="w-full flex justify-center py-5">
              <Wheel rouletteData={rouletteData} number={number} />
            </div>
            <div className="w-full flex justify-center my-2">
              <div className="winnerHistory hideElementsTest">
                {history.map((entry, index) => {
                  if (entry === 0) {
                    return (
                      <div className="green" key={index}>
                        {entry}
                      </div>
                    );
                  } else if (blackNumbers.includes(entry)) {
                    return (
                      <div className="black" key={index}>
                        {entry}
                      </div>
                    );
                  } else {
                    return (
                      <div className="red" key={index}>
                        {entry}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
        <Board
          onCellClick={onCellClick}
          chipsData={chipsData}
          rouletteData={rouletteData}
        />
      </div>
      <div className="max-w-xl flex justify-center w-full mx-auto hideElementsTest">
        <ProgressBarRound
          stage={stage}
          maxDuration={endTime}
          currentDuration={time_remaining}
        />
      </div>
      <div className="roulette-actions mx-2 w-full hideElementsTest flex justify-center">
        <ul className="mx-auto my-4 max-w-2xl w-full sm:flex item-center sm:bg-transparent bg-purple-50 p-3 rounded-lg justify-between gap-x-2">
          <li className="hidden sm:block">
            <button
              className="btn btn-sm sm:btn-md bg-purple-700 hover:border-purple-500 hover:bg-purple-600 text-white border-purple-500 outline-0"
              onClick={clearBet}
            >
              Clear Bet
            </button>
          </li>
          <div className="flex justify-between items-center gap-x-2">
            <li className="board-chip">
              <div
                key={"chip_100"}
                className={getChipClasses(100)}
                onClick={() => onChipClick(100)}
              >
                100
              </div>
            </li>
            <li className="board-chip">
              <span key={"chip_20"}>
                <div
                  className={getChipClasses(20)}
                  onClick={() => onChipClick(20)}
                >
                  20
                </div>
              </span>
            </li>
            <li className="board-chip">
              <span key={"chip_10"}>
                <div
                  className={getChipClasses(10)}
                  onClick={() => onChipClick(10)}
                >
                  10
                </div>
              </span>
            </li>
            <li className="board-chip">
              <span key={"chip_5"}>
                <div
                  className={getChipClasses(5)}
                  onClick={() => onChipClick(5)}
                >
                  5
                </div>
              </span>
            </li>
          </div>
          <div className="flex justify-center mt-4 sm:mt-0 gap-x-4 items-center">
            <li className="sm:hidden">
              <button
                className="btn btn-sm sm:btn-md bg-purple-700 hover:border-purple-500 hover:bg-purple-600 text-white border-purple-500 outline-0"
                onClick={clearBet}
              >
                Clear Bet
              </button>
            </li>
            <li>
              <label
                disabled={stage === "PLACE_BET" ? false : true}
                className="btn btn-sm sm:btn-md disabled:bg-gray-500 bg-purple-700 hover:border-purple-500 hover:bg-purple-600 text-white border-purple-500 outline-0"
                onClick={onSpinClick}
              >
                Place Bet
              </label>
            </li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Casinio;
