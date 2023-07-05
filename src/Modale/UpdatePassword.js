import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiHide, BiShow } from "react-icons/bi";
import { ProgressBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "../Utils/Axios.config";
import resetPass from "../assets/icons/reset-password.png";
import bankCard from "../assets/icons/password (3).png";
import { accountName } from "../data/accountName";

const UpdatePassword = ({ setUpdateModal, refetch, updateModal }) => {
  const [me, type] = updateModal;
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [showOldPass, setshowOldPass] = useState(false);
  const [showNewPass, setshowNewPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState("Bkash");
  const [oldPassType, setOldPassType] = useState("password");
  const [newPassType, setNewPassType] = useState("password");
  const [error, setError] = useState("");

  const handleShowPass = (old) => {
    if (old === "oldPass") {
      setshowOldPass(!showOldPass);
      setOldPassType(oldPassType === "password" ? "text" : "password");
    } else {
      setshowNewPass(!showNewPass);
      setNewPassType(newPassType === "password" ? "text" : "password");
    }
  };

  const handleCard = (card) => {
    const myCard = me?.card?.find((i) => i?.cardName === card);
    console.log(myCard);
    return myCard;
  };

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    const bankCard = {
      cardNum: data.cardNum,
      cardName: card,
    };

    const PassData = {
      oldPass: data.OldPass,
      newPass: data.NewPass,
    };

    if (type === "bankCard") {
      axios
        .patch(`/user/${me?._id}`, bankCard)
        .then((response) => {
          toast.success("successfully set the Bank Card");
          refetch();
          setLoading(false);
          setUpdateModal(null);
          console.log(response);
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            toast.error(error?.response?.data?.error);
            setError(error?.response?.data?.error);
          } else {
            toast.error("Ops No..!! Something is wrong");
          }
          setLoading(false);
        });
    }

    if (type === "account") {
      axios
        .patch(`/user/changePass/${me?._id}`, PassData)
        .then((response) => {
          toast.success("successfully Change the user");
          refetch();
          setLoading(false);
          setUpdateModal(null);
        })
        .catch((error) => {
          if (error?.response?.data?.error) {
            toast.error(error?.response?.data?.error);
            setError(error?.response?.data?.error);
          } else {
            toast.error("Ops No..!! Something is wrong");
          }
          console.log(error);
          setLoading(false);
        });
    }
  };

  console.log(type, me, "pl");

  return (
    <div>
      <input type="checkbox" id="update-password" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="modal-box bg-slate-100 p-3 pb-20 py-5 sm:p-4"
        >
          <div>
            {type === "bankCard" && (
              <div>
                <img src={bankCard} className="w-20 mx-auto" alt="create" />
                <h1 className="text-xl uppercase text-center font-bold text-primary">
                  set Bank Card
                </h1>
                <div className="rounded-md p-3 mt-3 bg-white">
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Dolores nulla quaerat eius temporibus veritatis corporis
                    cumque.
                  </p>
                  <div className="tabs mb-1 mt-2 flex items-center gap-3 tabs-boxed">
                    <div className="tabs flex w-full items-center sm:gap-2 gap-1.5 tabs-boxed">
                      {accountName?.map((i, index) => (
                        <div
                          key={index}
                          onClick={() => setCard(i?.name)}
                          className={`${
                            card === i?.name
                              ? "tab-active !text-white"
                              : "border border-[#9b9b9b] rounded-lg"
                          } ${
                            handleCard(i?.name)?.cardName === i?.name
                              ? "!border-primary text-primary border"
                              : ""
                          } tab`}
                        >
                          {i?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1">
                    {card}:{" "}
                    {handleCard(card)?.cardName === card
                      ? handleCard(card)?.cardNum
                      : "No set yet"}{" "}
                  </p>
                </div>
              </div>
            )}

            {type === "account" && (
              <div>
                <img src={resetPass} className="w-20 mx-auto" alt="create" />
                <h1 className="text-xl uppercase text-center font-bold text-primary">
                  change account password
                </h1>
              </div>
            )}
          </div>
          {type === "bankCard" && (
            <div className="w-full mt-3">
              <div className="flex items-center">
                <p className="px-4 py-[2px] max-w-[250px] border-[3px] rounded-2xl border-primary">
                  {card}
                </p>
                <div className="h-[2px] w-full bg-primary"></div>
              </div>
              <input
                type="tel"
                placeholder={`Enter ${card} Account`}
                class="input input-sm mt-3 input-bordered input-accent w-full"
                required
                {...register("cardNum", {
                  required: {
                    value: true,
                    message: `${card} Number is required`,
                  },
                })}
              />
            </div>
          )}

          {type === "account" && (
            <div className="w-full mt-3">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-cyan-900 font-bold">
                    Old Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={oldPassType}
                    placeholder="Old Password"
                    className="input input-bordered !py-4 sm:!py-6 !rounded-md input-sm sm:input-md input-primary w-full"
                    {...register("OldPass", {
                      required: {
                        value: true,
                        message: "Old Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters longer",
                      },
                    })}
                  />
                  <div
                    onClick={() => handleShowPass("oldPass")}
                    className={`${
                      showOldPass ? "text-primary" : "text-gray-400 "
                    } cursor-pointer  absolute top-[5px] sm:top-[15px] right-1 sm:right-2`}
                  >
                    {showOldPass ? <BiShow size={24} /> : <BiHide size={24} />}
                  </div>
                </div>
                {errors?.OldPass && (
                  <label className="label p-0 pt-1">
                    {errors.OldPass?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.OldPass.message}
                      </span>
                    )}
                    {errors.OldPass?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.OldPass.message}
                      </span>
                    )}
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-cyan-900 font-bold">
                    New Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={newPassType}
                    placeholder="New Password"
                    className="input input-bordered !py-4 sm:!py-6 !rounded-md input-sm sm:input-md input-primary w-full"
                    {...register("NewPass", {
                      required: {
                        value: true,
                        message: "New Password is required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters longer",
                      },
                    })}
                  />
                  <div
                    onClick={() => handleShowPass("newPass")}
                    className={`${
                      showNewPass ? "text-primary" : "text-gray-400 "
                    } cursor-pointer  absolute top-[5px] sm:top-[15px] right-1 sm:right-2`}
                  >
                    {showNewPass ? <BiShow size={24} /> : <BiHide size={24} />}
                  </div>
                </div>
                {errors?.NewPass && (
                  <label className="label p-0 pt-1">
                    {errors.NewPass?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.NewPass.message}
                      </span>
                    )}
                    {errors.NewPass?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.NewPass.message}
                      </span>
                    )}
                  </label>
                )}
              </div>
            </div>
          )}

          <div className=" gap-3 mt-5">
            {loading && (
              <div className="w-full flex items-center justify-center">
                <ProgressBar
                  height="80"
                  width="80"
                  ariaLabel="progress-bar-loading"
                  wrapperStyle={{}}
                  wrapperClass="progress-bar-wrapper"
                  borderColor="#F4442E"
                  barColor="#51E5FF"
                />
              </div>
            )}
            <p className="text-center text-sm text-accent mb-2">{error}</p>
            <div className="flex items-center bg-white rounded-lg py-2 justify-center gap-x-3">
              <input
                type="submit"
                value="Save"
                className="btn w-[100px] btn-primary text-white btn-sm"
              />
              <label for="update-password" className="btn btn-sm w-[100px] ">
                cancel
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
