
import React from 'react';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi'
import useMe from '../../Hooks/useMe';
import LogOutModule from '../../Modale/LogOutModule';
import UpdatePassword from '../../Modale/UpdatePassword';
import Loading from '../../Share/Loading';
import bg1 from '../../assets/images/bg-small6.jpg'
import password1 from '../../assets/icons/password (3).png'
import password2 from '../../assets/icons/password (2).png'
import password3 from '../../assets/icons/password (1).png'
import password4 from '../../assets/icons/password (4).png'
import { useContext } from 'react';
import { Context } from '../../App';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [updateModal, setUpdateModal] = useState(null)
    const [logout, setLogout] = useState(null)
    const [me, isLoading, refetch] = useContext(Context);
    
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='w-full sm:p-0 p-2'>
            <div style={{ backgroundImage: `url(${bg1})` }} className="bg-cover rounded-2xl">
                <div className='relative border-[#6182c9] sm:py-8 sm:px-8 px-3 py-5 bg-[#263186ce] text-white rounded-2xl'>
                    <div className='flex gap-3 sm:gap-5 items-center'>
                        <div className='sm:pl-8 pl-2'>
                            <div className="w-16 h-16 sm:w-44 sm:h-44 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                                <h2 className='text-3xl uppercase sm:text-8xl font-bold text-white'>{me?.firstName?.slice(0, 1)}{me?.lastName?.slice(0, 1)}</h2>
                            </div>
                        </div>
                        <div className='text-white'>
                            <h2 className='sm:text-5xl text-[24px] sm:my-3'>{me?.firstName} {me?.lastName}</h2>
                            <h2 className='sm:text-2xl text-[16px] text-gray-300'>{me?.phoneNumber}</h2>
                            {me?.email && <h2 className='sm:text-2xl text-[12px] text-gray-300'>{me?.email}</h2>}
                        </div>
                    </div>
                    <div className='flex w-full mt-5 sm:mt-8 items-center justify-between'>
                        <div className='w-full'>
                            <Link to='/dashboard/planDetails' className='btn text-white sm:btn-wide sm:btn-md btn-sm rounded-full btn-accent'>Active Plan</Link>
                            {/* <div className='flex items-center gap-1'>
                                {(me?.FreePlan === "active") && <p className='text-[12px] sm:text-[16px] pr-2'>Free Plan</p>}
                                {(me?.LifeTimePlan === "active") && <p className='text-[12px] px-2 border-l-2 sm:text-[16px]'>Life Time Plan</p>}
                                {
                                    me?.PlanInTime && me?.PlanInTime?.map(i => 
                                        <>
                                            <p className='text-[12px] px-2 border-l-2 sm:text-[16px]'>{i?.planName}</p>
                                        </>
                                    ) 
                                }
                            </div> */}
                        </div>
                        <div className='w-full flex items-center justify-end gap-2'>
                            <h2 className='text-xl text-white sm:text-3xl'>{me?.balance} ৳</h2>
                        </div>
                    </div>
                    <label onClick={() => setLogout("logOut")} for="Logout-modal" className='absolute top-3 right-3'>
                        <div className='cursor-pointer hover:text-accent'><HiOutlineLogout size={24} /></div>
                    </label>
                </div>
            </div>
    
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center mt-5 sm:mt-8 justify-between w-full gap-3'>
                <label onClick={() => setUpdateModal("bankCard")} for="update-password" className='rounded-r-xl cursor-pointer border-l-[5px] border-[#a145f6] flex items-center py-1 bg-white justify-between shadow-md'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src={password1} className='w-16' alt="password" />
                        </div>
                        <div className=''>
                            <h1 className=''>Add Bank Card</h1>
                            <p className='text-[10px]'>এখানে অলওয়ে পাসওয়ার্ডটি সেট করে নেন এটি উইথড্র করার সময় লাগবে</p>
                        </div>
                    </div>
                    <div>
                        <img src={password4} className='w-16' alt="password" />
                    </div>
                </label>
                <label onClick={() => setUpdateModal("wallet")} for="update-password" className='rounded-r-xl cursor-pointer border-l-[5px] border-[#a145f6] flex items-center py-1 bg-white justify-between shadow-md'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src={password2} className='w-16' alt="password" />
                        </div>
                        <div className=''>
                            <h1 className=''>Set Wallet password</h1>
                            <p className='text-[10px]'>এখানে অলওয়ে পাসওয়ার্ডটি সেট করে নেন এটি উইথড্র করার সময় লাগবে</p>
                        </div>
                    </div>
                    <div>
                        <img src={password4} className='w-16' alt="password" />
                    </div>
                </label>
                <label onClick={() => setUpdateModal("account")} for="update-password" className='rounded-r-xl cursor-pointer border-l-[5px] border-[#a145f6] flex items-center py-1 bg-white justify-between shadow-md'>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src={password3} className='w-16' alt="password" />
                        </div>
                        <div className=''>
                            <h1 className=''>Update password</h1>
                            <p className='text-[10px]'>এখানে অলওয়ে পাসওয়ার্ডটি সেট করে নেন এটি উইথড্র করার সময় লাগবে</p>
                        </div>
                    </div>
                    <div>
                        <img src={password4} className='w-16' alt="password" />
                    </div>
                </label>
            </div>
            
            <div className='w-full mt-5 sm:mt-8 p-2 py-3 shadow-md bg-[#ccf7ec] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>TelePhone: </h2>
                <h2 className='sm:text-2xl'>{me?.phoneNumber}</h2>
            </div>
            <div className='w-full mt-3 sm:mt-5 p-2 py-3 shadow-md bg-[#caf8ec] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>Bkash: </h2>
                {me?.bkash? <h2 className='sm:text-2xl'>{me?.bkash}</h2> : <p>Account is not available</p>}
            </div>
            <div className='w-full mt-3 sm:mt-5 p-2 py-3 shadow-md bg-[#cef8ed] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>Nagad: </h2>
                {me?.nagad? <h2 className='sm:text-2xl'>{me?.nagad}</h2> : <p>Account is not available</p>}
            </div>
            {
                updateModal && <UpdatePassword 
                updateModal={updateModal} 
                setUpdateModal={setUpdateModal}
                />
            }
            {
                logout && <LogOutModule
                logout = { logout}
                setLogout = {setLogout}
                 />
            }
        </div>
    );
};

export default Profile;