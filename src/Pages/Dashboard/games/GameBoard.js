import React from "react";
import { useContext } from "react";
import { MeContext } from "../../../App";
import { Outlet } from "react-router-dom";

const GameBoard = () => {
  const [me, isLoading, refetch] = useContext(MeContext);
  return (
    <div className="bg-base-200 h-screen">
      <div className="w-full flex justify-between p-2 px-3 bg-white">
        <span>Balance: {me?.balance?.toFixed(2)} $ </span>
        <div>
          <span className="btn text-white btn-primary btn-xs">Deposit</span>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default GameBoard;
