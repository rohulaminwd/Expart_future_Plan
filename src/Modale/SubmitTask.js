import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import task1 from "../assets/icons/addImage.png";
import { useRef } from "react";
import ProgressSpeener from "../Share/ProgressSpeener";
import axios from "../Utils/Axios.config";

const SubmitTask = ({ setSubmitTask, refetch, submitTask, me }) => {
  const { handleSubmit } = useForm();
  const [image, setImage] = useState();
  const [img, setImg] = useState();
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImg(img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  const calculateBalance = () => {
    if (me?.balance >= 1000 && me?.balance <= 3000) {
      const balance = (me?.balance / 100) * 3.5;
      return balance;
    } else if (me?.balance > 3000 && me?.balance <= 6000) {
      const balance = (me?.balance / 100) * 4;
      return balance;
    } else if (me?.balance > 6000 && me?.balance <= 12000) {
      const balance = (me?.balance / 100) * 4.5;
      return balance;
    } else if (me?.balance > 12000) {
      const balance = (me?.balance / 100) * 5;
      return balance;
    }
  };

  const onSubmit = () => {
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

          const data = {
            phoneNumber: me?.phoneNumber,
            price:
              submitTask?.planCategory === "Life time Plan"
                ? calculateBalance()
                : submitTask?.price,
            date: new Date(),
            imageUrl: img,
          };

          // send data backend
          axios
            .patch(`/task/submit/${submitTask?._id}`, data)
            .then((response) => {
              const status = response?.data;
              if (status.success === true) {
                toast.success("successfully task submit");
                setLoading(false);
                refetch();
                setSubmitTask(null);
              } else if (status?.success === false) {
                toast.error("Some thing is wrong..!");
              }
            })
            .catch((error) => {
              console.log(error);
              toast.error("Ops No..!! Something is wrong");
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      });
  };

  return (
    <div>
      <input type="checkbox" id="submit-task" className="modal-toggle" />
      <div className="modal font-reem modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-blue-100 h-screen sm:h-auto modal-box p-3 py-5 sm:p-4"
        >
          <div className="w-full">
            <h2 className="text-xl mb-3 text-[#1b5b7b]">
              Select your complete task screenshot picture
            </h2>
          </div>
          <div className="w-full max-h-[500px] overflow-y-auto rounded-xl">
            {image && (
              <img
                src={image.image}
                className="w-full rounded-xl"
                alt="post img"
              />
            )}
          </div>
          <div
            onClick={() => imageRef.current.click()}
            className="flex cursor-pointer justify-center items-center"
          >
            <div className="text-[20px] mb-3 sm:text-[30px] text-blue-700 text-center font-bold">
              {!image && (
                <img src={task1} className="w-28 mx-auto" alt="create" />
              )}
              {image && (
                <span className="text-[16px] mt-5 uppercase text-center btn btn-secondary btn-sm font-bold text-white">
                  Change picture
                </span>
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

          <div className=" p-3 py-5 rounded-xl bg-white">
            <ProgressSpeener loading={loading} />
            <div className="flex items-center justify-center gap-3">
              <input
                type="submit"
                value="Submit"
                disabled={!image}
                className="btn w-[100px] btn-primary text-white btn-sm"
              />
              <label htmlFor="submit-task" className="btn btn-sm w-[100px] ">
                cancel
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitTask;
