import React, { useState } from "react";
import axios from "../Utils/Axios.config";
import { toast } from "react-toastify";
import stop from "../assets/icons/stop.png";
import approve from "../assets/icons/approve.png";
import { ProgressBar } from "react-loader-spinner";
import ProgressSpeener from "../Share/ProgressSpeener";

const CreateAdmin = ({ setOpenCreateAdmin, refetch, createAdmin }) => {
  const [loading, setLoading] = useState(false);

  const [user, type] = createAdmin;

  const data = {
    role: type === "subAdmin" ? "subAdmin" : "user",
  };

  const handleAdmin = async () => {
    setLoading(true);
    axios
      .patch(`/users/${user?._id}`, data)
      .then((response) => {
        if (response.data.success === true) {
          toast.success("successfully create the sub Admin");
          refetch();
          setOpenCreateAdmin(null);
          setLoading(false);
        } else {
          toast.success(response.data?.message);
        }
      })
      .catch((error) => {
        toast.error("Ops No..!! Something is wrong");
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div>
      <input type="checkbox" id="createAdmin" className="modal-toggle" />
      <div className="modal h-screen modal-bottom sm:modal-middle">
        <div className="modal-box pb-8 mb-10 bg-blue-100 h-auto px-2 py-4 sm:py-8 sm:px-4">
          <div className="text-xl text-center font-bold text-accent">
            {type === "block" && (
              <img src={stop} className="w-32 mx-auto" alt="complete" />
            )}
            {!(type === "block") && (
              <img src={approve} className="w-32 mx-auto" alt="complete" />
            )}
            <h2
              className={`${
                type === "block" ? "text-[#8b8989]" : "text-primary"
              } text-2xl font-bold`}
            >
              Are Your sure..? you want to{" "}
              {type === "subAdmin" ? "sub Admin" : "Back Admin"}{" "}
              <span className="text-purple-700">
                {user?.name?.firstName} {user?.name?.lastName}
              </span>
            </h2>
          </div>
          <div className="p-4 mt-5 shadow-md rounded-md bg-white">
            <ProgressSpeener loading={loading} />
            <div className="flex items-center justify-center gap-x-3">
              <button
                onClick={handleAdmin}
                className="btn w-[100px] btn-primary text-white btn-sm"
              >
                Yes
              </button>
              <label htmlFor="createAdmin" className="btn btn-sm w-[100px]">
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
