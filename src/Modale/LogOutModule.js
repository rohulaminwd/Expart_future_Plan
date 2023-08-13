import React from "react";
import { useNavigate } from "react-router-dom";

const LogOutModule = ({ logout, setLogout }) => {
  const navigate = useNavigate();
  const logOut = () => {
    navigate("/");
    setLogout(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <div>
      <input type="checkbox" id="Logout-modal" className="modal-toggle" />
      <div className="modal modal-middle">
        <div className="modal-box bg-primary">
          <p className="text-red-700 font-bold text-2xl">
            Are you sure you want to Logout this Website
          </p>
          {/* <div className="modal-action">
                        <button onClick={logOut} className="btn btn-error text-white btn-sm">Logout</button>
                        <label htmlFor="Logout-modal" className="btn btn-sm">cancel</label>
                    </div> */}
          <div className="flex items-center justify-center gap-3 mt-5">
            <button
              onClick={logOut}
              className="btn btn-error w-[100px] text-white btn-sm"
            >
              Logout
            </button>
            <label htmlFor="Logout-modal" className="btn btn-sm w-[100px] ">
              cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutModule;
