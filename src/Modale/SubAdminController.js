import React, { useState } from "react";
import axios from "../Utils/Axios.config";
import { toast } from "react-toastify";
import ProgressSpeener from "../Share/ProgressSpeener";
import { accountName } from "../data/accountName";
import UserProfileImg from "../Components/UserProfileImg";
import UpdatePassword from "./UpdatePassword";
import { UserContext } from "../App";
import { useContext } from "react";

const SubAdminController = ({
  setSubAdminController,
  refetch,
  subAdminController,
}) => {
  const [users, userLoading, userRefetch] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [updateModal, setUpdateModal] = useState(null);
  const [card, setCard] = useState("Bkash");

  const [user, type] = subAdminController;

  const data = {
    subAdminStatus: type === "active" ? "active" : "deActive",
  };

  const handleCard = (card) => {
    const myCard = user?.card?.find((i) => i?.cardName === card);
    return myCard;
  };

  const cardHandler = (cardName) => {
    const existCard = user?.card?.find((i) => i?.cardName === cardName);
    return existCard;
  };

  const handleAdmin = async () => {
    setLoading(true);
    axios
      .patch(`/users/subAdmin/${user?._id}`, data)
      .then((response) => {
        if (response.data.success === true) {
          toast.success("successfully Active sub Admin");
          refetch();
          setSubAdminController(null);
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
      <input type="checkbox" id="subAdmin" className="modal-toggle" />
      <div className="modal h-screen modal-bottom sm:modal-middle">
        <div className="modal-box pb-12 bg-blue-100 h-auto px-2 py-4 sm:py-8 sm:px-4">
          <div className="text-xl font-bold">
            <div className="flex mt-2 sm:mt-0 mb-4 items-center gap-x-2">
              <div className="ml-1">
                <UserProfileImg
                  me={user}
                  textColor="sm:text-[14px] ring-offset-[1px] text-[12px] text-white"
                  className="w-7 h-7 bg-purple-700 ring-[3px] ring-[#c591f2]"
                />
              </div>
              <h2 className="font-bold text-lg">
                {user?.name?.firstName} {user?.name?.lastName}
              </h2>
            </div>
            <div className="bg-white p-3 rounded-lg">
              <div className="tabs my-2 p-2 mt-2 flex w-full items-center sm:gap-2 gap-2 tabs-boxed">
                {accountName?.map((i, index) => (
                  <div
                    key={index}
                    onClick={() => setCard(i?.name)}
                    className={` ${
                      cardHandler(i?.name)
                        ? "border border-primary"
                        : "border border-accent"
                    } tab sm:w-[100px] w-[90px] h-full bg-white rounded-lg`}
                  >
                    <div className="sm:w-[100px] w-[90px] rounded-lg bg-white">
                      <img src={i?.img} className="w-full" alt="cardImg" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-1 text-sm text-left">
                {card}:{" "}
                {handleCard(card)?.cardName === card
                  ? handleCard(card)?.cardNum
                  : "No Card set yet"}{" "}
              </p>
            </div>
            <div className="p-3 my-3 bg-white rounded-lg">
              <label
                onClick={() => setUpdateModal([user, "bankCard"])}
                htmlFor="update-password"
                className="w-full btn-primary text-white btn btn-sm"
              >
                <span>Set Account Card</span>
              </label>
            </div>
          </div>
          <div className="p-4 mt-5 shadow-md rounded-md bg-white">
            <ProgressSpeener loading={loading} />
            <div className="flex items-center justify-center gap-x-3">
              <button
                onClick={handleAdmin}
                className="btn w-[100px] btn-primary text-white btn-sm"
                // disabled={user?.card?.length !== accountName?.length}
              >
                Active
              </button>
              <label htmlFor="subAdmin" className="btn btn-sm w-[100px]">
                Cancel
              </label>
            </div>
          </div>
        </div>
      </div>
      {updateModal && (
        <UpdatePassword
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          refetch={userRefetch}
        />
      )}
    </div>
  );
};

export default SubAdminController;
