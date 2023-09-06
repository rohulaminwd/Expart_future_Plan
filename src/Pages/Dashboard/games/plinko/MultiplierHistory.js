export function MultiplierHistory({ multiplierHistory }) {
  return (
    <div className="max-w-xl flex gap-x-1 overflow-hidden rounded-md bg-[#0f212e]">
      {multiplierHistory.map((multiplier, index) => {
        console.log(multiplier, "multi");
        if (index > 3 || !multiplier) return null;
        return (
          <span
            key={`${multiplier}${index}${Math.random()}`}
            className="flex items-center px-2 justify-center bg-[#8D27B3] p-1 font-bold text-white"
          >
            {multiplier}x
          </span>
        );
      })}
    </div>
  );
}
