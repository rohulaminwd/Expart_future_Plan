import React, { useState } from "react";
import { toast } from "react-toastify";
import Loading from "../Share/Loading";
import delete1 from "../assets/icons/delete.png";
import axios from "../Utils/Axios.config";
import ProgressSpeener from "../Share/ProgressSpeener";

const DeleteModalConfirm = ({
  deleteModule,
  refetch,
  method,
  setDeletingModal,
}) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = () => {
    setLoading(true);
    axios
      .delete(`${method}/${deleteModule?._id}`)
      .then((response) => {
        const data = response.data;
        if (data.success === true) {
          toast.success(` ${data.message} ${deleteModule?.name}`);
          setDeletingModal(null);
          setLoading(false);
          refetch();
        }
        if (data.success === false) {
          toast.error(` ${data.message} ${deleteModule?.name}`);
          setLoading(false);
          refetch();
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };
  return (
    <div>
      <input
        type="checkbox"
        id="delete-confirm-modal"
        className="modal-toggle"
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-blue-100">
          <div className="text-center">
            <img src={delete1} className="w-20 mx-auto" alt="delete" />
          </div>
          <h2 className="text-red-700 text-2xl">
            Are you sure you want to delete This item
          </h2>
          <div className="mt-5">
            <ProgressSpeener loading={loading} />
            <div className="flex items-center justify-center gap-3 ">
              <button
                onClick={handleDelete}
                className="btn w-[100px] btn-primary text-white btn-sm"
              >
                Yes
              </button>
              <label
                htmlFor="delete-confirm-modal"
                className="btn btn-sm w-[100px] "
              >
                No
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModalConfirm;
