import React from "react";
import { MdOutlineDone } from "react-icons/md";

const PlanCardFeture = ({ title, name }) => {
  return (
    <div className="flex my-1 justify-between items-center">
      <div className="flex items-center gap-x-2">
        <p>{title} → </p>
        <p>{name}</p>
      </div>
      <p className="text-green-500 text-xl font-bold">
        <MdOutlineDone />
      </p>
    </div>
  );
};

export default PlanCardFeture;
