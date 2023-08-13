import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../Share/Loading";
import axios from "../Utils/Axios.config";
import create1 from "../assets/icons/create (1).png";
import create2 from "../assets/icons/create (2).png";
import ProgressSpeener from "../Share/ProgressSpeener";

const CreateTask = ({ setOpenTask, refetch, openTask }) => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [planCategory, setPlanCategory] = useState("Free Plan");

  const onSubmit = (data) => {
    setLoading(true);
    const TaskInfo = {
      taskName: data.name,
      price: parseFloat(data.price),
      category: data.category,
      planCategory:
        planCategory === "Plan in time"
          ? data?.planDuration + "-" + data?.planInTimeName
          : planCategory === "Free Plan"
          ? "15-Days"
          : "Life time",
      taskLink: data.url,
    };

    if (openTask[0] === "create") {
      axios
        .post("/task/create", TaskInfo)
        .then((response) => {
          const status = response.data;
          if (status.success === true) {
            reset();
            toast.success("successfully create task");
            setOpenTask(null);
            refetch();
          }
          if (status.success === false) {
            toast.error("Your Request fail plx try again");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        });
    } else {
      axios
        .patch(`/task/${openTask[0]?._id}`, TaskInfo)
        .then((response) => {
          const data = response.data;
          if (data.status === "success") {
            toast.success(data.message);
            refetch();
            setOpenTask(null);
          }
          if (data.status === "fail") {
            toast.error("Your Request fail plx try again");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  return (
    <div>
      <input type="checkbox" id="create-task" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-blue-100 h-auto modal-box p-3 py-5 sm:p-4"
        >
          {openTask[0] === "create" && (
            <div className="w-full text-center">
              <img src={create2} className="w-20 mx-auto" alt="create" />
              <h2 className="text-xl uppercase text-center font-bold text-primary">
                Create Task
              </h2>
            </div>
          )}
          {openTask[1] === "update" && (
            <div className="w-full text-center">
              <img src={create1} className="w-20 mx-auto" alt="create" />
              <h2 className="text-xl uppercase text-center font-bold text-primary">
                Update Task
              </h2>
            </div>
          )}
          <div className="w-full mt-3">
            <div className="flex items-center justify-between gap-3">
              <div className="w-full">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="Task Name"
                  class="input bg-transparent input-sm my-1 input-bordered w-full"
                  required
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Task name is required",
                    },
                  })}
                />
                <label>
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-full">
                <label>Task price</label>
                <input
                  type="text"
                  inputmode="numeric"
                  placeholder="task price"
                  class="input bg-transparent input-sm my-1 input-bordered w-full"
                  required
                  {...register("price", {
                    required: {
                      value: true,
                      message: "Price is required",
                    },
                    pattern: {
                      value:
                        /^(0\.[0-1][0-9]?|0\.2[0-0]?|[0-0]?\.?[0-9]?[0-9])$/,
                      message: "Invalid price format",
                    },
                  })}
                />

                <label>
                  {(errors.price?.type === "required" ||
                    errors.price?.type === "pattern") && (
                    <span className="label-text-alt text-red-500">
                      {errors.price.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="w-full">
                <label className="">Task Category</label>
                <select
                  className="select select-sm my-2 select-bordered bg-transparent rounded-md w-full"
                  {...register("category", {
                    required: {
                      value: true,
                      message: "Category is required",
                    },
                  })}
                >
                  <option value="Youtube" select>
                    Youtube
                  </option>
                  <option value="Facebook">Facebook</option>
                  <option value="Tik Tok">Tik Tok</option>
                  <option value="data-entry">Data Entry</option>
                  <option value="others">others</option>
                </select>
                <label>
                  {errors.category?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.category.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="w-full">
                <label>Url</label>
                <input
                  type="text"
                  placeholder="Past Task link"
                  class="input bg-transparent input-sm my-1 input-bordered w-full"
                  required
                  {...register("url", {
                    required: {
                      value: true,
                      message: "Task Url is required",
                    },
                  })}
                />
                <label>
                  {errors.url?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.url.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-3 gap-3 items-center mb-3">
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <h1 className="label-text mr-2">Free Plan</h1>
                  <input
                    type="radio"
                    value="Free Plan"
                    onChange={(e) => setPlanCategory(e.target.value)}
                    name="sector"
                    checked={planCategory === "Free Plan" ? true : false}
                    className="radio checked:bg-secondary"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <h1 className="label-text mr-2">Life time plan</h1>
                  <input
                    type="radio"
                    name="sector"
                    value="Life time Plan"
                    onChange={(e) => setPlanCategory(e.target.value)}
                    checked={planCategory === "Life time Plan" ? true : false}
                    className="radio checked:bg-cyan-800"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="cursor-pointer flex items-center">
                  <h1 className="label-text mr-2">plan in time</h1>
                  <input
                    type="radio"
                    name="sector"
                    value="Plan in time"
                    onChange={(e) => setPlanCategory(e.target.value)}
                    checked={planCategory === "Plan in time" ? true : false}
                    className="radio checked:bg-blue-500"
                  />
                </label>
              </div>
            </div>
            {planCategory === "Plan in time" && (
              <div className="flex items-center justify-between gap-3">
                <div className="w-full">
                  <label className="">Plan Duration</label>
                  <select
                    className="select select-sm my-2 select-bordered bg-transparent rounded-md w-full"
                    {...register("planDuration", {
                      required: {
                        value: true,
                        message: "Category is required",
                      },
                    })}
                  >
                    <option value="3-Days" select>
                      3-Days
                    </option>
                    <option value="7-Days">7-Days</option>
                    <option value="14-Days">14-Days</option>
                    <option value="30-Days">30-Days</option>
                  </select>
                  <label>
                    {errors.planDuration?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.planDuration.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="w-full">
                  <label className="">Plan Name</label>
                  <select
                    className="select select-sm my-2 select-bordered bg-transparent rounded-md w-full"
                    {...register("planInTimeName", {
                      required: {
                        value: true,
                        message: "Category is required",
                      },
                    })}
                  >
                    <option value="Plan-1" select>
                      Plan-1
                    </option>
                    <option value="Plan-2">Plan-2</option>
                    <option value="Plan-3">Plan-3</option>
                    <option value="Plan-4">Plan-4</option>
                    <option value="Plan-4">Plan-4</option>
                  </select>
                  <label>
                    {errors.planInTimeName?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.planInTimeName.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            )}
          </div>

          <ProgressSpeener loading={loading} />
          <div className="flex items-center justify-center gap-3">
            <input
              type="submit"
              value="Create"
              className="btn w-[100px] btn-primary text-white btn-sm"
            />
            <label htmlFor="create-task" className="btn btn-sm w-[100px] ">
              cancel
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
