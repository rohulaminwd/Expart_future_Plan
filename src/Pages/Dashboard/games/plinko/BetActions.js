import { Coin, CurrencyDollarSimple, Smiley } from "phosphor-react";
import { ChangeEvent, useState } from "react";
import { colors } from "./style/colors";

export function BetActions({ onRunBet, onChangeLines, inGameBallsCount, me }) {
  const currentBalance = me?.balance;

  const [decrementCurrentBalance, setDecrementCurrentBalance] =
    useState(currentBalance);

  //   const decrementCurrentBalance = useAuthStore(
  //     (state) => state.decrementBalance
  //   );

  const [betValue, setBetValue] = useState(12);

  const maxLinesQnt = 16;
  const linesOptions = [];
  for (let i = 8; i <= maxLinesQnt; i++) {
    linesOptions.push(i);
  }

  function handleHalfBet() {
    if (!me) return;
    const value = betValue / 2;
    const newBetvalue = value <= 0 ? 0 : Math.floor(value);
    setBetValue(newBetvalue);
  }

  function handleDoubleBet() {
    if (!me) return;
    const value = betValue * 2;

    if (value >= currentBalance) {
      setBetValue(currentBalance);
      return;
    }

    const newBetvalue = value <= 0 ? 0 : Math.floor(value);
    setBetValue(newBetvalue);
  }

  function handleMaxBet() {
    if (!me) return;
    setBetValue(currentBalance);
  }

  async function handleRunBet() {
    if (!me) return;
    if (inGameBallsCount >= 15) return;
    onRunBet(betValue);
    if (betValue <= 0) return;
    setDecrementCurrentBalance(currentBalance - betValue);
  }

  return (
    <div className=" w-full relative text-white h-1/2 max-w-5xl flex-1 py-8">
      <div
        className={`flex h-auto mx-2 md:mx-0 flex-col gap-4 rounded-md bg-[#213743] p-4 text-text md:justify-between`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-stretch gap-1 md:flex-col">
            <div className="w-full text-sm font-bold md:text-base">
              <div className="flex flex-1 mb-3 items-stretch justify-between">
                <span>BALANCE</span>
                <div className="flex items-center gap-1">
                  <div className="rounded-full bg-[#8D27B3] p-0.5">
                    <CurrencyDollarSimple weight="bold" />
                  </div>
                  <span>{betValue}</span>
                </div>
              </div>
              <div className="flex items-stretch justify-center shadow-md">
                <input
                  type="number"
                  min={0}
                  max={currentBalance}
                  onChange={(e) => setBetValue(e.target.value)}
                  value={betValue}
                  className="w-full rounded-bl-md rounded-tl-md border-2 border-[#3d5564] bg-[#0f212e] p-2.5 px-4 font-bold transition-colors placeholder:font-bold placeholder:text-text focus:border-[#C52BFF] focus:outline-none md:p-2"
                />
                <button
                  onClick={handleHalfBet}
                  className="relative border-2 border-transparent bg-[#3d5564] p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-[#0f212e] after:content-[''] hover:bg-[#3d5564]/80 focus:border-[#C52BFF] focus:outline-none md:p-2"
                >
                  ½
                </button>
                <button
                  onClick={handleDoubleBet}
                  className="relative border-2 border-transparent bg-[#3d5564] p-2.5 px-3 transition-colors after:absolute after:top-[calc(50%_-_8px)] after:right-0 after:h-4 after:w-0.5 after:rounded-lg after:bg-[#0f212e] after:content-[''] hover:bg-[#3d5564]/80 focus:border-[#C52BFF] focus:outline-none md:p-2"
                >
                  2x
                </button>
                <button
                  onClick={handleMaxBet}
                  className="rounded-br-md rounded-tr-md border-2 border-transparent bg-[#3d5564] p-2 px-3 text-xs transition-colors hover:bg-[#3d5564]/80 focus:border-[#C52BFF] focus:outline-none"
                >
                  max
                </button>
              </div>
            </div>
          </div>
          <select
            disabled={inGameBallsCount > 0}
            onChange={(e) => onChangeLines(e.target.value)}
            defaultValue={16}
            className="w-full rounded-md border-2 border-[#3d5564] bg-[#0f212e] py-2 font-bold transition-all placeholder:font-bold placeholder:text-text focus:border-[#C52BFF] focus:outline-none disabled:line-through disabled:opacity-80"
            id="lines"
          >
            {linesOptions.map((line) => (
              <option key={line} value={line}>
                {line} Line
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleRunBet}
          disabled={false}
          className="btn disabled:bg-gray-500 bg-purple-700 hover:border-purple-500 hover:bg-purple-600 text-white border-purple-500 outline-0"
        >
          Start
        </button>
      </div>
    </div>
  );
}
