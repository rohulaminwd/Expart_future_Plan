import React, { useState } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { MeContext } from '../App';
import Loading from '../Share/Loading';

const UpdatePassword = ({setUpdateModal, updateModal}) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [confPass, setConfPass] = useState();
    const [newPass, setNewPass] = useState();
    const [me, isLoading, refetch] = useContext(MeContext);

    console.log(newPass, confPass, "appdf")

    if(isLoading){
      return <Loading />
    }

    const onSubmit = (data) => {
        const bankCard = {
            bkash: data.bkash,
            nagad: data.nagad
        }
        const walletPass = {
          oldPass: data.oldPass,
          newPass : data.newPass,
        }
        if(updateModal === 'bankCard'){
            fetch(`https://efp-usa-server-site.vercel.app/api/v1/account/${me?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(bankCard)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    reset()
                    toast.success(data.message); 
                    setUpdateModal(null)
                    refetch();                
                }
          })
        }
        
        if(updateModal === 'wallet'){

            fetch(`https://efp-usa-server-site.vercel.app/api/v1/accoun/${me?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(walletPass)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    reset()
                    toast.success(data.message); 
                    setUpdateModal(null) 
                    refetch();                   
                }
        })
        }
        if(updateModal === 'account'){
            fetch(`https://efp-usa-server-site.vercel.app/api/v1/accoun/${me?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(bankCard)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status == "success"){
                    reset()
                    toast.success(data.message); 
                    setUpdateModal(null)
                    refetch();                    
                }
        })
        }
    }
    
    return (
        <div>
            <input type="checkbox" id="update-password" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box p-3 py-5 sm:p-4">
                    {(updateModal === "bankCard") && <h1 className='text-xl uppercase text-center font-bold text-primary'>set Bank Card</h1>}
                    {(updateModal === "wallet") && <h1 className='text-xl uppercase text-center font-bold text-primary'>change wallet password</h1>}
                    {(updateModal === "account") && <h1 className='text-xl uppercase text-center font-bold text-primary'>change account password</h1>}

                    {(updateModal === "bankCard") &&
                        <div className='w-full mt-3'>
                            <div className='flex items-center'>
                                <p className='px-4 py-[2px]  border-[3px] rounded-2xl border-primary'>Bkash</p>
                                <div className='h-[2px] w-full bg-primary'></div>
                            </div>
                            <input type="tel" placeholder="Enter Bikas Account" class="input input-sm mt-3 input-bordered input-accent w-full" required 
                            {...register("bkash", {
                                required: {
                                  value: true,
                                  message: 'Bkash Number is required'  
                                },
                              })}
                            />
                            <div className='flex mt-5 items-center'>
                                <p className='px-4 py-[2px]  border-[3px] rounded-2xl border-primary'>Nagad</p>
                                <div className='h-[2px] w-full bg-primary'></div>
                            </div>
                            <input type="tel" placeholder="Enter Nagad Account" class="input input-sm mt-3 input-bordered input-accent w-full" required 
                            {...register("nagad", {
                                required: {
                                  value: true,
                                  message: 'Nagad Number is required'  
                                },
                              })}
                            />
                        </div>
                    }

                    {(updateModal === "wallet") &&
                        <div className='w-full mt-3'>
                            <label>Old Password</label>
                            <input type="password" placeholder="Old Wallet Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("oldPass", {
                                required: {
                                  value: true,
                                  message: 'Old Password is required'  
                                },
                              })}
                            />
                            <label>New Wallet Password</label>
                            <input name='newPass' onChange={(e) => setNewPass(e.target.value)} type="password" placeholder="New Wallet Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("newPass", {
                                required: {
                                  value: true,
                                  message: 'New Password is required'  
                                },
                              })}
                            />
                            <label>Confirm Password</label>
                            <input type="password" name='confirmPass' onChange={(e) => setConfPass(e.target.value)} placeholder="Confirm Wallet Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("confirmPass", {
                                required: {
                                  value: true,
                                  message: 'Confirm Password is required'  
                                },
                              })}
                            />
                            {newPass !== confPass && <p className='text-accent text-center text-[12px] my-1'>Password is no match</p>}
                        </div>
                    }

                    {(updateModal === "account") &&
                        <div className='w-full mt-3'>
                          <label>Old Password</label>
                            <input type="password" placeholder="Old Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("oldPass", {
                                required: {
                                  value: true,
                                  message: 'Old Password is required'  
                                },
                              })}
                            />
                            <label>New Password</label>
                            <input name='newPass' onChange={(e) => setNewPass(e.target.value)} type="password" placeholder="New Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("newPass", {
                                required: {
                                  value: true,
                                  message: 'New Password is required'  
                                },
                              })}
                            />
                            <label>Confirm Password</label>
                            <input name='confirmPass' onChange={(e) => setConfPass(e.target.value)} type="password" placeholder="Confirm Password" class="input input-sm my-1 mb-3 input-bordered w-full" required 
                            {...register("confirmPass", {
                                required: {
                                  value: true,
                                  message: 'Confirm Password is required'  
                                },
                              })}
                            />
                            {newPass !== confPass && <p className='text-accent text-center text-[12px] my-1'>Password is no match</p>}
                        </div>
                    }
                    
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <input type="submit" value="Save" className="btn w-[100px] btn-primary text-white btn-sm" />
                        <label for="update-password" className="btn btn-sm w-[100px] ">cancel</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;