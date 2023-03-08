import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CreateTask from '../../Modale/CreateTask';
import Loading from '../../Share/Loading';
import task1 from '../../assets/icons/task (3).png'
import task2 from '../../assets/icons/task-data (2).png'
import task3 from '../../assets/icons/task-data (1).png'
import task4 from '../../assets/icons/tiktok.png'
import { motion } from "framer-motion"
import { format } from 'date-fns';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { CopyButton } from '@mantine/core';
import DeleteModalConfirm from '../../Modale/DeleteModalConfirm';
import { MdDoneAll, MdRemoveDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import GiveTask from '../../Modale/GiveTask';
import { useContext } from 'react';
import { MeContext, TaskContext } from '../../App';

const AdminWork = () => {
    const [openTask, setOpenTask] = useState(null);
    const [giveTask, setGiveTask] = useState(null);
    const [deleteModule, setDeletingModal] = useState(null);
    const [me] = useContext(MeContext);
    const [tasks, taskLoading, taskRefetch] = useContext(TaskContext);
    const method = 'task'

 const worrning = () => {
    toast.warn("Already add the task");
 }


    if(taskLoading){
        return <Loading />
    }
    return (
        <div className='p-2 pt-0 sm:p-0'>
            <div className='text-center w-full flex items-center justify-between p-3 py-4 shadow-md sm:mb-5 mb-3 rounded-md bg-white'>
                <div className=''>
                    <label onClick={() => setOpenTask(['create'])} htmlFor='create-task' className='btn btn-primary rounded-3xl btn-sm text-white'>Create task</label>
                </div>
                <h1 className='font-bold text-xl'>All Task: <span className='text-accent '>{tasks?.length}</span></h1>
            </div> 
            <div className='md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-3'>
                {
                    tasks?.map((i, index) => <>
                    <motion.div 
                    initial={{ y: "20vw", transition: { type: "spring", duration: .1 } }}
                    animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
                    exit={{ y: "60vw", scale: [1, 0], transition: { duration: 0.5 } }}
                    className={`p-2 md:mt-0 sm:p-3 bg-white w-full duration-300 shadow-md rounded-2xl`}>
                        <div className='relative border-b-2 pb-1'>
                            <div className='w-full flex items-start justify-start'>
                                <div className='w-16'>
                                    {(i?.category === 'Youtube') && <img src={task1} className='w-16 -ml-2' alt="task " />}
                                    {(i?.category === 'Facebook') && <img src={task2} className='w-16 -ml-2' alt="task " />}
                                    {(i?.category === 'data-entry') && <img src={task3} className='w-16 -ml-2' alt="task " />}
                                    {(i?.category === 'Tik Tok') && <img src={task4} className='w-16 -ml-2' alt="task " />}
                                </div>
                                <div className='w-full'>
                                    <h3 className='text-[13px] font-bold'>{i.taskName}</h3>
                                    <p className='text-[12px]'>{i?.description}</p>
                                </div>
                            </div>
                            <div className='absolute top-0 right-0'>
                                <h2 className='font-bold text-accent'>{i?.price} ৳</h2>
                            </div>
                            <div className='text-right flex justify-between items-center gap-2'>
                                <div>
                                    {i?.completeUser && <p className='text-[12px]'>{i?.completeUser.length}</p>}
                                </div>
                                <div className='flex justify-end gap-x-3 items-center'>
                                    {i?.planCategory && <p className='text-[12px]'>{i?.planCategory}</p>}
                                    {i?.planInTimeName && <p className='text-[12px]'>{i?.planInTimeName}</p>}
                                    {i?.planCategory === 'Plan in time' && <p className='text-[12px]'>{i?.planDuration}</p>}
                                    {i?.status === 'pending' && <p className='text-[12px]'>{format(new Date(i?.createdAt), 'PP')}</p>}
                                    {i?.status === 'running' && <p className='text-[12px]'>{format(new Date(i?.updatedAt), 'PP')}</p>}
                                </div>
                            </div>
                        </div>
                        <div className='flex items-end justify-between mt-3'>
                            <div className='flex items-center'>
                                <div className='border-r pr-2'>
                                    <a className='text-[12px] font-bold text-primary' href={`${i?.taskUrl}`}>Open Link</a>
                                </div>
                                <div className='border-l pl-2'>
                                <CopyButton value={`${i?.taskUrl}`}>
                                        {({ copied, copy }) => (
                                            <p className={`${copied ? 'text-[#177865]' : 'text-[#174e78]'} text-[12px] cursor-pointer font-bold`} onClick={copy}>
                                            {copied ? 'Copied Link' : 'Copy Link'}
                                            </p>
                                        )}
                                    </CopyButton>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <label onClick={() => setGiveTask([i, me?._id])} htmlFor='give-task' className="text-primary mr-2 cursor-pointer">
                                    { i?.status === 'inactive' && <span className='text-gray-500'><MdRemoveDone size={20} /></span>}
                                </label>
                                { ((i?.status === 'running') || (i?.status === 'pending') || (i?.status === 'complete')) && <div className='mr-2' onClick={worrning}><span className='text-green-500'><MdDoneAll size={20} /></span></div>}
                                <label onClick={() => setOpenTask([i, 'update'])} htmlFor='create-task' className="text-primary cursor-pointer"><BiEdit size={20} /></label>
                                <label onClick={ () => setDeletingModal(i)}  htmlFor='delete-confirm-modal' className="text-accent ml-2 cursor-pointer"><AiOutlineDelete size={20} /></label>
                            </div>
                        </div>
                    </motion.div>
                </>)
                }
            </div> 
            {
                openTask && <CreateTask
                openTask={openTask} 
                setOpenTask={setOpenTask}
                refetch={taskRefetch}
                />
            }
            {
                giveTask && <GiveTask
                giveTask={giveTask} 
                setGiveTask={setGiveTask}
                refetch={taskRefetch}
                />
            }
            { deleteModule && <DeleteModalConfirm 
                deleteModule = {deleteModule}
                setDeletingModal = {setDeletingModal}
                refetch={taskRefetch}
                method={method}
            />
            }
        </div>
    );
};

export default AdminWork;