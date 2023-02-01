import React from 'react';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useQuery } from 'react-query';
import DeleteModalConfirm from '../../Modale/DeleteModalConfirm';
import Loading from '../../Share/Loading';
import { motion } from "framer-motion"
import { format } from 'date-fns';

const Users = () => {
    const [deleteModule, setDeletingModal] = useState(false);
    const method = 'user'

    const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

    const getFacts = async () => {
		const res = await fetch('https://efp-usa-server-site.vercel.app/api/v1/user');
		return res.json();
	};
	// Using the hook
	const {data, error, refetch, isLoading} = useQuery('allUsers', getFacts);

    const filteredUsers = data?.data?.filter(user => user.firstName.toLowerCase().startsWith(searchTerm.toLowerCase()));

    if(isLoading){
        return <Loading></Loading>
    }

    return (
        <div className='p-2 sm:p-0'>
            <div className='text-center w-full flex items-center justify-between p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white'>
                <div className=''>
                    <input type="search" value={searchTerm} onChange={handleSearch} className='border rounded-3xl w-[150px] sm:w-auto ring-primary-focus ring-2 outline-0 p-1 px-3' placeholder='Search User' name="" id="" />
                </div>
                <h1 className='font-bold text-xl'>Users: <span className='text-accent '>{data?.data?.length}</span></h1>
            </div> 
            <div className='grid grid-cols-1 sm:gap-5 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
            {
                filteredUsers.map( user => <>
                    <motion.div 
                        initial={{ y: "20vw", transition: { type: "spring", duration: .1 } }}
                        animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
                        exit={{ y: "60vw", scale: [1, 0], transition: { duration: 0.5 } }} 
                        key={user?._id}  
                        className="bg-cover cursor-pointer border-[#dedede] border-[1px] hover:border-0 rounded-xl p-3 bg-[#ffffff] shadow-md hover:text-white hover:bg-gradient-to-r hover:from-[#13b38f] hover:to-[#2091d9] duration-100">
                        <div className='relative border-b pb-3 border-[#dcdddf]'>
                            <div className='flex gap-3 items-center'>
                                <div className=''>
                                    <div className="w-12 h-12 shadow-md bg-primary rounded-full flex items-center justify-center ring ring-[#91f2dc] ring-offset-base-100 ring-offset-2">
                                        <h2 className='text-xl uppercase font-bold text-white'>{user?.firstName?.slice(0, 1)}{user?.lastName?.slice(0, 1)}</h2>
                                    </div>
                                </div>
                                <div className=''>
                                    <h2 className='text-[20px] font-bold'>{user?.firstName} {user?.lastName}</h2>
                                    <h2 className='text-[16px]'>{user.phoneNumber}</h2>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0'>
                                <h2 className='font-bold text-xl text-accent'>{user?.balance} ৳</h2>
                            </div>
                            <div className='absolute top-[48px] right-0'>
                                <p className='text-[12px]'>{format(new Date(user?.createdAt), 'PP')}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-1 mt-3 justify-between'>
                            <div className='flex items-center gap-3 justify-between'>
                                <div className='text-center '>
                                    <h2 className=' font-bold'>5</h2>
                                    <h1 className='text-[12px]'>Complete task</h1>
                                </div>
                                <div className='text-center border-[#dcdddf] px-3 border-x-2'>
                                    <h2 className=' font-bold'>1254</h2>
                                    <h1 className='text-[12px]'>Recharge</h1>
                                </div>
                                <div className='text-center'>
                                    <h2 className=' font-bold'>1225</h2>
                                    <h1 className='text-[12px]'>Withdraw</h1>
                                </div>
                            </div>
                            <label onClick={() => setDeletingModal(user)} for="delete-confirm-modal" className="btn btn-accent text-white btn-sm" disabled={user?.role === "admin"}>
                                <span className=' text-sm font-bold px-0 mx-0'><AiOutlineDelete size={20} /></span>
                            </label>
                        </div>
                    </motion.div>
                </>)  
            }
            </div>

            { deleteModule && <DeleteModalConfirm 
                deleteModule = {deleteModule}
                setDeletingModal = {setDeletingModal}
                refetch={refetch}
                method={method}
            />
            }
        </div>
    );
};

export default Users;