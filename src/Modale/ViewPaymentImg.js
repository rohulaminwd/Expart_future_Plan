import React, { useState } from "react";

const ViewPaymenImg = ({ setViewImg, viewImg }) => {
  const [i, status] = viewImg;

  return (
    <div>
      <input type="checkbox" id="view-Img" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-3 py-5 sm:p-4">
          <h4 className="text-xl uppercase text-center font-bold text-primary">
            Check Payment Img
          </h4>
          <div className="text-center">
            <div className="mb-3">
              <h2 className="sm:text-xl text-left font-bold text-[#6e2d80]">
                View Payment Screen Shot
              </h2>
            </div>
            <div className="w-full max-h-[500px] overflow-y-auto rounded-xl">
              <img src={i?.image} className="w-full" alt="task" />
            </div>
          </div>
          <div className="mt-5">
            <div className="flex items-center justify-center gap-3">
              <label
                htmlFor="view-Img"
                className="btn w-[100px] btn-primary text-white btn-sm"
              >
                Ok
              </label>
              <label htmlFor="view-Img" className="btn btn-sm w-[100px] ">
                cancel
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPaymenImg;
