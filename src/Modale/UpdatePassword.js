import React from 'react';

const UpdatePassword = ({setUpdateModal, updateModal}) => {

    
    return (
        <div>
            <input type="checkbox" id="update-password" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form className="modal-box p-3 py-5 sm:p-4">
                    {(updateModal === "bankCard") && <h1 className='text-xl uppercase text-center font-bold text-primary'>set Bank Card</h1>}
                    {(updateModal === "wallet") && <h1 className='text-xl uppercase text-center font-bold text-primary'>change wallet password</h1>}
                    {(updateModal === "account") && <h1 className='text-xl uppercase text-center font-bold text-primary'>change account password</h1>}

                    {(updateModal === "bankCard") &&
                        <div className='w-full mt-3'>
                            <div className='flex items-center'>
                                <p className='px-4 py-[2px]  border-[3px] rounded-2xl border-primary'>Bkash</p>
                                <div className='h-[2px] w-full bg-primary'></div>
                            </div>
                            <input type="text" placeholder="Enter Bikas Account" class="input input-sm mt-3 input-bordered input-accent w-full" required />
                            <div className='flex mt-5 items-center'>
                                <p className='px-4 py-[2px]  border-[3px] rounded-2xl border-primary'>Nagad</p>
                                <div className='h-[2px] w-full bg-primary'></div>
                            </div>
                            <input type="text" placeholder="Enter Nagad Account" class="input input-sm mt-3 input-bordered input-accent w-full" required />
                        </div>
                    }

                    {(updateModal === "wallet") &&
                        <div className='w-full mt-3'>
                            <input type="text" placeholder="Old Wallet Password" class="input input-sm mt-3 input-bordered w-full" required />
                            <input type="text" placeholder="New Wallet Password" class="input input-sm mt-5 input-bordered w-full" required />
                            <input type="text" placeholder="Confirm Wallet Password" class="input input-sm mt-5 input-bordered w-full" required />
                        </div>
                    }

                    {(updateModal === "account") &&
                        <div className='w-full mt-3'>
                            <input type="text" placeholder="Old Password" class="input input-sm mt-3 input-bordered w-full" required />
                            <input type="text" placeholder="New Password" class="input input-sm mt-5 input-bordered w-full" required />
                            <input type="text" placeholder="Confirm Password" class="input input-sm mt-5 input-bordered w-full" required />
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