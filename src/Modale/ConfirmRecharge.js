import React, { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {} from "react-icons/ri";
import useMe from "../Hooks/useMe";
import balance from "../assets/images/balance.webp";
import { Button, CopyButton } from "@mantine/core";
import { toast } from "react-toastify";
import axios from "../Utils/Axios.config";
import { ProgressBar } from "react-loader-spinner";
import {
  BsFileEarmarkImage,
  BsFileEarmarkImageFill,
  BsWhatsapp,
} from "react-icons/bs";

const ConfirmRecharge = ({
  setRecharge,
  refetch,
  setRechargeConfirm,
  rechargeConfirm,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [transCode, setTransCode] = useState(0);
  const [me] = useMe();
  const [loading, setLoading] = useState(false);

  const card = rechargeConfirm?.card;
  const amount = rechargeConfirm?.amount;

  const dollerConvert =
    card === "Bkash" || card === "Nagad" ? (amount / 110).toFixed(2) : amount;

  const activeAdmin = rechargeConfirm?.activeAdmin;

  const adminWhatsappNum = activeAdmin?.card?.find(
    (i) => i?.cardName === "Bkash"
  );

  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const imageRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImg(img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const onSubmit = (data) => {
    setLoading(true);

    const fromData = new FormData();
    fromData.append("file", img);
    fromData.append("upload_preset", "expart_future_plan");
    fromData.append("cloud_name", "ddlrfuyzp");
    const url = `https://api.cloudinary.com/v1_1/ddlrfuyzp/image/upload`;

    fetch(url, {
      method: "POST",
      body: fromData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          const img = result.secure_url;
          console.log(result);

          const requestInfo = {
            tranId: data.tranId,
            sector: "recharge",
            PaymentMethod: card,
            amount: dollerConvert,
            user: me?._id,
            accountNumber: data?.accountNumber,
            image: img,
          };

          axios
            .post("/request/create", requestInfo)
            .then((response) => {
              const status = response?.data;
              if (status.success === true) {
                toast.success("Your Request Success");
                setLoading(false);
                setRechargeConfirm(null);
                setRecharge(null);
                refetch();
              }
              if (status.success === false) {
                setLoading(false);
                toast.error("Your Request fail plx try again");
              }
              setLoading(false);
              console.log(status);
            })
            .catch((error) => {
              toast.error(error?.message);
              console.log(error, "onk");
            });
        } else {
          setLoading(false);
          toast.error("Your Request fail plx try again");
        }
      });
  };

  const url = `https://wa.me/${
    adminWhatsappNum?.cardNum
  }?text=${encodeURIComponent("Please send the recharge number..??")}`;

  const message =
    card === "Bkash" || card === "Nagad"
      ? "নীচের হোয়াটসঅ্যাপ বোতামে ক্লিক করে অ্যাডমিনের কাছ থেকে নম্বর দিয়ে রিচার্জটি সম্পূর্ণ করুন।"
      : "Complete the recharge with the number from the admin by clicking on the WhatsApp button below.";

  return (
    <div>
      <input type="checkbox" id="confirmRecharge" className="modal-toggle" />
      <div className="modal h-screen modal-bottom sm:modal-middle">
        <div className="modal-box bg-blue-100 h-screen sm:h-auto px-2 py-4 sm:py-8 sm:px-4">
          <label
            htmlFor="confirmRecharge"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl uppercase text-center font-bold text-primary">
            Recharge
          </h1>
          <div className="w-full p-3 shadow-md mt-5 rounded-md bg-white">
            <div className="flex items-center border-b w-full gap-1 mx-auto">
              <img src={balance} className="w-20" alt="balance" />
              <div>
                <p className="text-3xl font-bold text-accent">
                  {rechargeConfirm?.amount}
                  {card === "Bkash" || card === "Nagad" ? "৳" : "$"}

                  {(card === "Bkash" || card === "Nagad") && (
                    <span className="ml-3">== {dollerConvert} $</span>
                  )}
                </p>
                <p className="text-gray-700">Your account : {card}</p>
              </div>
            </div>
            <p className="mt-2 siliguri">{message}</p>
          </div>
          <div className="w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white">
            <div className="rounded-md p-3 bg-slate-200">
              <p className="text-[14px">The Amount to be transferred</p>
              <div className="flex mx-auto rounded-lg gap-2 sm:gap-3 max-w-[500px] items-center">
                <div className="p-1 sm:p-2 border w-full rounded-md">
                  <p className="font-bold text-xl">
                    {rechargeConfirm?.amount}{" "}
                    {card === "Bkash" || card === "Nagad" ? "৳" : "$"}
                  </p>
                </div>
                <div className="">
                  <CopyButton value={rechargeConfirm?.amount}>
                    {({ copied, copy }) => (
                      <Button
                        className={`${
                          copied ? "bg-[#177865]" : "bg-[#174e78]"
                        } !py-0 px-4 rounded-3xl`}
                        onClick={copy}
                      >
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    )}
                  </CopyButton>
                </div>
              </div>
              <div className="flex mx-auto mt-3 p-1 rounded-full gap-2 sm:gap-3 max-w-[500px] items-center">
                <div className="p-2 w-full bg-green-500 text-white rounded-full">
                  <a
                    href={url}
                    className="item-center inline-block w-full gap-x-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative bg-green-500 p-0 w-full text-white rounded-full">
                      <span className="font-bold text-white absolute -top-3 -left-3 p-[10px] rounded-full bg-green-600 border border-green-300">
                        <BsWhatsapp size={24} />
                      </span>
                      <span className="text-white ml-11 top-0 bottom-0 leading-[1px] text-lg font-bold">
                        Contact Whatsapp
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4">
              <div className="">
                <div>
                  <input
                    type="text"
                    placeholder="Enter Transection Id"
                    onChange={(e) => setTransCode(e.target.value)}
                    class="input input-sm input-primary input-bordered w-full"
                    required
                    {...register("tranId", {
                      required: {
                        value: true,
                        message: "Transection Id is required",
                      },
                    })}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Enter Account Number"
                    onChange={(e) => setTransCode(e.target.value)}
                    class="input mt-3 input-sm input-primary input-bordered w-full"
                    required
                    {...register("accountNumber", {
                      required: {
                        value: true,
                        message: "Enter Account Number",
                      },
                    })}
                  />
                </div>
                <div>
                  <div
                    onClick={() => imageRef.current.click()}
                    className="flex my-4 cursor-pointer justify-center items-center"
                  >
                    <div className=" w-full sm:text-[30px] text-blue-700 text-center">
                      {image ? (
                        <div className="relative w-full flex text-primary items-center justify-between ju gap-x-2">
                          <span className="flex btn btn-primary btn-sm btn-outline font-bold items-center gap-x-1">
                            <BsFileEarmarkImage size={20} /> Select Img
                          </span>
                          <div className="absolute top-0 right-1 w-6 h-8">
                            <img
                              src={image.image}
                              className="w-6 h-8 rounded-[2px]"
                              alt="screenshot"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="w-full flex items-center justify-between ju gap-x-2 text-gray-500">
                          <span className="flex btn btn-sm btn-outline font-bold items-center gap-x-1">
                            <BsFileEarmarkImage size={20} /> Select Img
                          </span>
                          <span className="text-sm">No Selected Img</span>
                        </div>
                      )}
                    </div>
                    <div style={{ display: "none" }} className="hidden">
                      <input
                        type="file"
                        name="images"
                        onChange={onImageChange}
                        ref={imageRef}
                        id=""
                      />
                    </div>
                  </div>
                </div>
              </div>
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
              <input
                type="submit"
                value="Submit"
                className="btn w-full mt-3 mb-3 btn-primary rounded-2xl text-white btn-sm"
              />
            </form>
          </div>
          <div className=" w-full p-3 shadow-md mt-5 rounded-md bg-white">
            <p className="text-xl font-bold">Help Video</p>
            <p className="mt-2">
              error dolor tempore aspernatur eligendi consectetur deleniti modi
              accusamus quasi quia, corporis doloribus eum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRecharge;
