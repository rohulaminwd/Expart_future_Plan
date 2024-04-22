import React, { useState } from "react";
import Lottie from "lottie-react";
import { bigGameData, sortGameData } from "../../data/gameData";
import { Link } from "react-router-dom";

const TradSecondary = () => {
  return (
    <div className="w-full p-2 sm:py-3 sm:px-0">
      <div>
        <div className=" bg-white overflow-hidden relative rounded-2xl">
          <div className="relative z-10 cursor-pointer sm:mt-3 px-3 py-5 rounded-2xl">
            <div className="w-full text-center">
              <h2 className="text-purple-700 mb-3 uppercase font-bold text-4xl sm:text-6xl">
                Short Games
              </h2>
            </div>
            <div className="mt-5 flex justify-center items-center gap-x-3">
              {sortGameData?.map((game, index) => (
                <Link
                  to={game?.path}
                  key={index}
                  className="p-1 border-2 bg-[#d2f8fb] border-[#b1f3fc] rounded-xl w-[100px] h-[100px] "
                >
                  {game.name === "Plinko" ? (
                    <div>
                      <img
                        src={game?.img}
                        className="w-full h-full"
                        alt="logo"
                      />
                    </div>
                  ) : (
                    <Lottie
                      animationData={game?.img}
                      loop={true}
                      style={{ height: "90px" }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -left-10 -top-10"></div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -bottom-10 -right-10"></div>
          {/* <div className="sm:w-20 sm:h-20 w-16 h-16 absolute opacity-50 rounded-full bg-purple-300 left-5 top-5"></div> */}
        </div>

        <div className=" bg-white mt-5 overflow-hidden relative rounded-2xl">
          <div className="text-center relative z-10  cursor-pointer sm:mt-3 px-3 py-5 rounded-2xl">
            <div className="w-full">
              <h2 className="text-purple-700 mb-3 uppercase font-bold text-4xl sm:text-6xl text-center">
                big Games
              </h2>
            </div>
            <div className="mt-5 flex justify-center items-center gap-x-3">
              {bigGameData?.map((game, index) => (
                <Link
                  to={game?.path}
                  key={index}
                  className="border-2 overflow-hidden bg-[#eed2fb] border-[#ddb1fc] rounded-xl w-[100px] h-[100px] "
                >
                  <img src={game?.img} className="w-full h-full" alt="logo" />
                </Link>
              ))}
            </div>
          </div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -left-10 -top-10"></div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -bottom-10 -right-10"></div>
          
        </div>

        <div className=" bg-white overflow-hidden mt-5 relative rounded-2xl">
          <div className="text-center  cursor-pointer sm:mt-3 px-3 py-5 rounded-2xl">
            <div className="w-full">
              <h2 className="text-purple-700 mb-3 uppercase font-bold text-4xl sm:text-6xl text-center">
                Live betting
              </h2>
              <h2 className="text-purple-400 w-[84%] font-bold text-xl text-center">
                This is the short game. play and enjoy now..!
              </h2>
            </div>
            <div className="mt-5">
              <p className="text-xl btn border-0 text-white bg-purple-700 hover:bg-purple-600 btn-circle btn-wide">
                Show Games
              </p>
            </div>
          </div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -left-10 -top-10"></div>
          <div className="sm:w-32 sm:h-32 w-24 h-24 absolute rounded-full bg-purple-200 -bottom-10 -right-10"></div>
          {/* <div className="sm:w-20 sm:h-20 w-16 h-16 absolute opacity-50 rounded-full bg-purple-300 left-5 top-5"></div> */}
        </div>
      </div>
    </div>
  );
};

export default TradSecondary;
