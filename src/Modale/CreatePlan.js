import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../Share/Loading';
import create1 from '../assets/icons/create (1).png'
import create2 from '../assets/icons/create (2).png'

const CreatePlan = ({setOpenPlan, refetch, openPlan}) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('Free Plan')

    if(loading){
      return <Loading />
    }

    console.log(openPlan[0]?._id)

    const onSubmit = (data) => {
        setLoading(true)
        const TaskInfo = {
            planName: data.name,
            price: data.price,
            dailyTask: data.dailyTask,
            unitPrice: data.unitPrice,
            planDuration: data.planDuration,
            category: category,
            planInTimeName: data?.planInTimeName
        }
        console.log(TaskInfo)

        if(openPlan[0] === "create"){
            fetch('https://efp-usa-server-site.vercel.app/api/v1/plan/create', {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(TaskInfo)
            })
            .then(res => res.json())
            .then( status => {
                if(status.status === 'success'){
                    reset()
                    toast.success('successfully create task'); 
                    setOpenPlan(null)
                    refetch()
                }
                if(status.status === 'fail'){
                    console.log(data.error)
                    toast.error('Your Request fail plx try again');
                }
                setLoading(false)
            })
        }else{
            console.log(openPlan[0]?._id)
            fetch(`https://efp-usa-server-site.vercel.app/api/v1/plan/${openPlan[0]?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(TaskInfo)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    toast.success(data.message); 
                    refetch();             
                    setOpenPlan(null)
                }
                if(data.status === 'fail'){
                    toast.error('Your Request fail plx try again');
                }
            })
        
            }

    }
    
    return (
        <div>
            <input type="checkbox" id="create-plan" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-100 h-auto modal-box p-3 py-5 sm:p-4">
                    {(openPlan[0] === "create") && 
                    <div className='w-full text-center'>
                        <img src={create2} className='w-20 mx-auto' alt="create" />
                        <h2 className='text-xl uppercase text-center font-bold text-primary'>Create Plan</h2>
                    </div>
                    }
                    {(openPlan[1] === "update") && 
                    <div className='w-full text-center'>
                        <img src={create1} className='w-20 mx-auto' alt="create" />
                        <h2 className='text-xl uppercase text-center font-bold text-primary'>Update Plan</h2>
                    </div>
                    }
                    <div className='w-full mt-3'>
                            <div className='flex items-center justify-between gap-3'>
                                <div className='w-full'>
                                <label>Plan Name</label>
                                    <input type="text" placeholder="Plan Name" class="input bg-transparent input-sm my-1 input-bordered w-full" required
                                    {...register("name", {
                                        required: {
                                        value: true,
                                        message: 'Task name is required'  
                                        },
                                    })}
                                    />
                                <label>
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                                </div>
                                <div className='w-full'>
                                <label>Plan price</label>
                                <input type="number" placeholder="Plan price" class="input bg-transparent input-sm my-1 input-bordered w-full" required 
                                {...register("price", {
                                    required: {
                                    value: true,
                                    message: 'Price is required'  
                                    },
                                })}
                                />
                                <label>
                                    {errors.price?.type === 'required' && <span className="label-text-alt text-red-500">{errors.price.message}</span>}
                                </label>
                                </div>
                            </div>
                            <div className='flex items-center justify-between gap-3'>
                                <div className='w-full'>
                                    <label>Daily Task</label>
                                    <input type="text" placeholder="Daily Task" class="input bg-transparent input-sm my-1 input-bordered w-full" required 
                                    {...register("dailyTask", {
                                        required: {
                                        value: true,
                                        message: 'Daily Task is required'  
                                        },
                                    })}
                                    />
                                    <label>
                                    {errors.dailyTask?.type === 'required' && <span className="label-text-alt text-red-500">{errors.dailyTask.message}</span>}
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <label>Unit Price</label>
                                    <input type="text" placeholder="Plan Unit Price" class="input bg-transparent input-sm my-1 input-bordered w-full" required 
                                    {...register("unitPrice", {
                                        required: {
                                        value: true,
                                        message: 'Plan Url is required'  
                                        },
                                    })}
                                    />
                                    <label>
                                    {errors.unitPrice?.type === 'required' && <span className="label-text-alt text-red-500">{errors.unitPrice.message}</span>}
                                    </label>
                                </div>
                            </div>
                            <div className="flex justify-between mt-3 gap-3 items-center mb-3">
                                <div className="form-control">
                                    <label className="cursor-pointer flex items-center">
                                        <h1 className="label-text mr-2">Free Plan</h1> 
                                        <input type="radio" value="Free Plan" onChange={e => setCategory(e.target.value)} name="sector" checked={category === "Free Plan"? true: false} className="radio checked:bg-secondary"/>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer flex items-center">
                                        <h1 className="label-text mr-2">Life time plan</h1> 
                                        <input type="radio" name="sector" value="Life time Plan" onChange={e => setCategory(e.target.value)} checked={category === "Life time Plan"? true: false} className="radio checked:bg-cyan-800"/>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer flex items-center">
                                        <h1 className="label-text mr-2">plan in time</h1> 
                                        <input type="radio" name="sector" value="Plan in time" onChange={e => setCategory(e.target.value)} checked={category === "Plan in time"? true: false} className="radio checked:bg-blue-500"/>
                                    </label>
                                </div>
                            </div>
                            { category === 'Plan in time' &&
                                <div className='flex items-center justify-between gap-3'>
                                    <div className='w-full'>
                                        <label className=''>Plan Duration</label>
                                        <select
                                            className="select select-sm my-2 select-bordered bg-transparent rounded-md w-full" 
                                            {...register("planDuration", {
                                                required: {
                                                    value: true,
                                                    message: 'Category is required'  
                                                },
                                            })}
                                        >
                                            <option value="3-Days" select>3-Days</option>
                                            <option value="7-Days">7-Days</option>
                                            <option value="14-Days">14-Days</option>
                                            <option value="30-Days">30-Days</option>
                                        </select>
                                        <label>
                                        {errors.planDuration?.type === 'required' && <span className="label-text-alt text-red-500">{errors.planDuration.message}</span>}
                                        </label>
                                    </div>
                                    <div className='w-full'>
                                        <label className=''>Plan Name</label>
                                        <select
                                            className="select select-sm my-2 select-bordered bg-transparent rounded-md w-full" 
                                            {...register("planInTimeName", {
                                                required: {
                                                    value: true,
                                                    message: 'Category is required'  
                                                },
                                            })}
                                        >
                                            <option value="Plan-1" select>Plan-1</option>
                                            <option value="Plan-2">Plan-2</option>
                                            <option value="Plan-3">Plan-3</option>
                                            <option value="Plan-4">Plan-4</option>
                                            <option value="Plan-4">Plan-4</option>
                                        </select>
                                        <label>
                                        {errors.planInTimeName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.planInTimeName.message}</span>}
                                        </label>
                                    </div>
                                </div>
                            }
                        </div>
                    
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <input type="submit" value="Create" className="btn w-[100px] btn-primary text-white btn-sm" />
                        <label for="create-plan" className="btn btn-sm w-[100px] ">cancel</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePlan;