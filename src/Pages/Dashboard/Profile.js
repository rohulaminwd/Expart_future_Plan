
import React from 'react';
import { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi'
import useMe from '../../Hooks/useMe';
import LogOutModule from '../../Modale/LogOutModule';
import UpdatePassword from '../../Modale/UpdatePassword';
import Loading from '../../Share/Loading';

const Profile = () => {
    const [updateModal, setUpdateModal] = useState(null)
    const [me, setMe, loading] = useMe()
    if(loading){
        <Loading />
    }
    return (
        <div className='w-full sm:p-0 p-2'>
            <div className='relative border-[#6182c9] sm:py-8 sm:px-8 px-3 py-5 bg-[#2d4069] text-white rounded-2xl'>
                <div className='flex gap-3 sm:gap-5 items-center'>
                    <div className='sm:pl-8 pl-2'>
                        <div className="w-16 h-16 sm:w-44 sm:h-44 bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                            <h2 className='text-3xl uppercase sm:text-8xl font-bold text-white'>{me?.firstName?.slice(0, 1)}{me?.lastName?.slice(0, 1)}</h2>
                        </div>
                    </div>
                    <div className='text-white'>
                        <h2 className='sm:text-5xl text-[18px] sm:my-3'>{me?.firstName} {me?.lastName}</h2>
                        <h2 className='sm:text-2xl text-[12px] text-gray-300'>{me?.phoneNumber}</h2>
                        <h2 className='sm:text-2xl text-[12px] text-gray-300'>rohulaminwd@gmail.com</h2>
                    </div>
                </div>
                <div className='flex w-full mt-5 sm:mt-8 items-center justify-between'>
                    <div className='w-full'>
                        <label onClick={() => setUpdateModal("bankCard")} for="update-password" className='btn text-white sm:btn-wide sm:btn-md btn-sm rounded-full btn-accent'>add bank card</label>
                    </div>
                    <div className='w-full flex items-center justify-end gap-2'>
                        <h2 className='sm:text-2xl'>Balance: </h2>
                        <h2 className='text-xl sm:text-3xl'>1245 ৳</h2>
                    </div>
                </div>
                <label onClick={() => setUpdateModal("bankCard")} for="Logout-modal" className='absolute top-3 right-3'>
                    <div className='cursor-pointer hover:text-accent'><HiOutlineLogout size={24} /></div>
                </label>
            </div>
            <div className='sm:flex items-center mt-5 sm:mt-8 justify-between w-full gap-5'>
                <div className='w-full'>
                    <label onClick={() => setUpdateModal("wallet")} for="update-password" className='btn text-white w-full sm:btn-md btn-sm btn-primary'>set wallet password</label>
                </div>
                <div className='w-full mt-3 sm:mt-0'>
                    <label onClick={() => setUpdateModal("account")} for="update-password" className='btn text-white w-full sm:btn-md btn-sm btn-primary'>change account password</label>
                </div>
            </div>
            <div className='w-full mt-5 sm:mt-8 p-2 py-3 shadow-md bg-[#ccf7ec] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>TelePhone: </h2>
                <h2 className='sm:text-2xl'>{me?.phoneNumber}</h2>
            </div>
            <div className='w-full mt-3 sm:mt-5 p-2 py-3 shadow-md bg-[#caf8ec] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>Bikas: </h2>
                <h2 className='sm:text-2xl'>+880 1831 294 559</h2>
            </div>
            <div className='w-full mt-3 sm:mt-5 p-2 py-3 shadow-md bg-[#cef8ed] rounded-r-lg border-l-[5px] border-primary flex items-center gap-2'>
                <h2 className='sm:text-2xl'>Nagod: </h2>
                <h2 className='sm:text-2xl'>+880 1831 294 559</h2>
            </div>
            {
                updateModal && <UpdatePassword 
                updateModal={updateModal} 
                setUpdateModal={setUpdateModal}
                />
            }
            {
                updateModal && <LogOutModule />
            }
        </div>
    );
};

export default Profile;