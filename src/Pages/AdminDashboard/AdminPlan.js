import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CreateTask from '../../Modale/CreateTask';
import Loading from '../../Share/Loading';
import plan1 from '../../assets/icons/plan (3).png'
import plan2 from '../../assets/icons/plan (2).png'
import plan3 from '../../assets/icons/plan (1).png'
import { motion } from "framer-motion"
import { format } from 'date-fns';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { CopyButton } from '@mantine/core';
import DeleteModalConfirm from '../../Modale/DeleteModalConfirm';
import CreatePlan from '../../Modale/CreatePlan';

const AdminPlan = () => {
    const [openPlan, setOpenPlan] = useState(null);
    const [deleteModule, setDeletingModal] = useState(null);
    const method = 'plan'

    const getFacts = async () => {
		const res = await fetch('http://localhost:5000/api/v1/plan', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
		return res.json();
	};
	// Using the hook
	const {data, error, refetch, isLoading} = useQuery('allTask', getFacts);

    console.log(data, 'demo test')

    if(isLoading){
        return <Loading />
    }
    return (
        <div className='p-2 pt-0 sm:p-0'>
            <div className='text-center w-full flex items-center justify-between p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white'>
                <div className=''>
                    <label onClick={() => setOpenPlan(['create'])} for='create-plan' className='btn btn-primary rounded-3xl btn-sm text-white'>Create Plan</label>
                </div>
                <h1 className='font-bold text-xl'>All Plan: <span className='text-accent '>{data?.length}</span></h1>
            </div> 
            <div className='md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-3'>
                {
                    data?.map((i, index) => <>
                    <motion.div 
                    initial={{ y: "20vw", transition: { type: "spring", duration: .1 } }}
                    animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
                    exit={{ y: "60vw", scale: [1, 0], transition: { duration: 0.5 } }}
                    className={` ${(i?.category === 'Free Plan')? 'bg-[#2d4069] text-white' : 'bg-white'} 
                    ${(i?.category === 'Life time Plan')? 'bg-primary text-white' : 'bg-white'} 
                     p-2 md:mt-0 sm:p-3 w-full duration-300 shadow-md rounded-2xl`}>
                        <div className='relative border-b pb-1'>
                            <div className='w-full flex items-start justify-start'>
                                <div className='w-16'>
                                    {(i?.category === 'Free Plan') && <img src={plan1} className='w-[50px]' alt="task " />}
                                    {(i?.category === 'Life time Plan') && <img src={plan2} className='w-[50px]' alt="task " />}
                                    {(i?.category === 'Plan in time') && <img src={plan3} className='w-[50px]' alt="task " />}
                                </div>
                                <div className='w-full'>
                                    <h3 className='text-[16px] Uppercase font-bold'>{i.planName}</h3>
                                    <p className='text-[12px]'>{i?.description}</p>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0'>
                                <h2 className={`${(i?.category === 'Free Plan')? 'text-accent' : 'text-accent' } font-bold`}>{i?.price} ৳</h2>
                            </div>
                            <div className='text-right flex items-center justify-end'>
                                {(i?.planDuration) && <p className='text-[10px] mr-3'>{i?.planDuration}</p>}
                                {i?.status === 'pending' && <p className='text-[10px]'>{format(new Date(i?.createdAt), 'PP')}</p>}
                                {i?.status === 'complete' && <p className='text-[10px]'>{format(new Date(i?.updatedAt), 'PP')}</p>}
                            </div>
                        </div>
                        <div className='flex items-end mt-3 justify-between'>
                            <div className=' flex items-center'>
                                <h1 className='text-[12px] border-r pr-2 flex items-center gap-2'>Unit Price: <p>{i?.unitPrice}</p></h1>
                                <h1 className='text-[12px] pl-2 flex items-center gap-2'>Daily Task: <p>{i?.dailyTask}</p></h1>
                            </div>
                            <div className='flex items-center'>
                                <label onClick={() => setOpenPlan([i, 'update'])} for='create-plan' className="text-primary cursor-pointer"><BiEdit size={20} /></label>
                                <label onClick={ () => setDeletingModal(i)}  for='delete-confirm-modal' className={`${(i?.category === 'Free Plan')? 'text-white' : 'text-accent'} cursor-pointer`}><AiOutlineDelete size={20} /></label>
                            </div>
                        </div>
                    </motion.div>
                </>)
                }
            </div> 
            {
                openPlan && <CreatePlan
                openPlan={openPlan} 
                setOpenPlan={setOpenPlan}
                refetch={refetch}
                />
            }
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

export default AdminPlan;