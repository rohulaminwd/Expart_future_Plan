import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import payment from '../../assets/icons/payment (1).png'
import StatusUpdate from '../../Modale/StatusUpdate';
import Loading from '../../Share/Loading';
import { motion } from "framer-motion"
import { AiOutlineDelete } from 'react-icons/ai';
import DeleteModalConfirm from '../../Modale/DeleteModalConfirm';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { MdFileDownloadDone, MdOutlineKeyboardReturn } from 'react-icons/md';

const WithdrawRequest = () => {
    const [design, setDesign] = useState('Recharge1')
    const [planTime, setPlanTime] = useState([]);
    const [updateStatus, setUpdateStatus] = useState(null);
    const [deleteModule, setDeletingModal] = useState(null);
    const method = 'request'
    const request = 'return'
    const done = 'done'

    const getFacts = async () => {
		const res = await fetch('https://efp-usa-server-site.vercel.app/api/v1/request', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
		return res.json();
	};
	// Using the hook
	const {data, error, refetch, isLoading} = useQuery('allRequest', getFacts);

    useEffect(() => {
        if(data){
            setPlanTime(rechargePending)
        }
    }, [data])

    const handleState = (i, x) => {
        setPlanTime(i);
        setDesign(x)
    }

    if(isLoading || !planTime){
        return <Loading />
    }

    const recharge = data?.filter(i => i?.sector?.includes('recharge'));
    const rechargePending = recharge?.filter(i => i?.status?.includes('pending'));
    const rechargeComplete = recharge?.filter(i => i?.status?.includes('complete'));
    const withdraw = data?.filter(i => i?.sector?.includes('withdraw'));
    const withdrawPending = withdraw?.filter(i => i?.status?.includes('pending'));
    const withdrawComplete = withdraw?.filter(i => i?.status?.includes('complete'));



    return (
        <div className='w-full sm:p-0 p-2'>
            <div className='w-full bg-white p-2 sm:p-3 rounded-md shadow-md'>
                <div className="w-full flex items-center justify-between ">
                    <div onClick={() => handleState(rechargePending, 'Recharge1')} className={`${(design === 'Recharge1')? 'bg-gradient-to-r from-[#13b38f] to-[#2091d9] duration-100 rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>{rechargePending?.length}</h1>
                            <h1 className='text-[14px]'>Recharge pending</h1>
                        </div>
                    </div> 
                    <div onClick={() => handleState(rechargeComplete, 'Recharge2')} className={`${(design === 'Recharge2')? 'bg-gradient-to-r from-[#13b38f] to-[#2091d9] text-white duration-100 rounded-md' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>{rechargeComplete?.length}</h1>
                            <h1 className='text-[14px]'>Recharge Complete</h1>
                        </div>
                    </div> 
                    <div onClick={() => handleState(withdrawPending, 'Recharge3')} className={`${(design === 'Recharge3')? 'bg-gradient-to-r from-[#13b38f] to-[#2091d9] text-white duration-100 rounded-md' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>{withdrawPending?.length}</h1>
                            <h1 className='text-[14px]'>Withdraw pending</h1>
                        </div>
                    </div> 
                    <div onClick={() => handleState(withdrawComplete, 'Recharge4')} className={`${(design === 'Recharge4')? 'bg-gradient-to-r from-[#13b38f] to-[#2091d9] duration-100 rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>{withdrawComplete?.length}</h1>
                            <h1 className='text-[14px]'>Withdraw complete</h1>
                        </div>
                    </div> 
                </div>
            </div> 
                <div className='md:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-5 mt-3'>
                    {
                        planTime.map((i, index) => <>
                        <motion.div 
                        initial={{ y: "20vw", transition: { type: "spring", duration: .1 } }}
                        animate={{ y: 0, transition: { type: "spring", duration: 2 } }}
                        exit={{ y: "60vw", scale: [1, 0], transition: { duration: 0.5 } }}
                        className={`${(i?.status === 'complete')? "text-[#156c65] border-[#c9f8d6] bg-[#dbfbd7]" : "bg-[#ffffff] text-[#000] border-[#dedede]"} 
                        ${(i?.status === 'complete')? "text-[#156c65] border-[#8df3f9] bg-green-200" : "bg-primary text-white border-[#9df1e5]"}  
                        p-2 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px]  duration-300 shadow-md rounded-2xl`}>
                            <div className='flex relative border-b-2 pb-3 justify-between gap-2'>
                                <div className='w-full flex items-center gap-2'>
                                    <div>
                                        <img src={payment} className='w-16' alt="pending " />
                                    </div>
                                    <div>
                                        <h3 className='text-[20px] font-bold'>{i.name}</h3>
                                        <p className='text-[16px]'>{i?.phoneNumber}</p>
                                    </div>
                                </div>
                                <div className='absolute top-0 right-0'>
                                    <h2 className='font-bold text-accent'>{i?.amount} ৳</h2>
                                </div>
                                <div className='absolute top-[55px] right-0'>
                                    {i?.status === 'pending' && <p className='text-[12px]'>{format(new Date(i?.createdAt), 'PP')}</p>}
                                    {i?.status === 'complete' && <p className='text-[12px]'>{format(new Date(i?.updatedAt), 'PP')}</p>}
                                </div>
                            </div>
                            <div className='flex items-end justify-between mt-3'>
                                <div className=''>
                                    <h3 className='text-[16px]'>Account: {i?.accountNumber}</h3>
                                    {(i?.tranId) && <p className='text-[16px]'>ID: {i?.tranId}</p>}
                                </div>
                                <div className='flex items-center'>
                                    {((i?.status === 'pending') && (i?.sector === 'recharge')) && <label onClick={ () => setUpdateStatus({i, refetch})}  htmlFor='update-status' className="btn btn-success text-white btn-sm">add</label>}
                                    {((i?.status === 'pending') && (i?.sector === 'withdraw')) && <label onClick={ () => setUpdateStatus({i, refetch, request})}  htmlFor='update-status' className="mr-2 cursor-pointer text-red-900"><span className='text-red-900'><MdOutlineKeyboardReturn size={20} /></span></label>}
                                    {((i?.status === 'pending') && (i?.sector === 'withdraw')) && <label onClick={ () => setUpdateStatus({i, refetch, done})}  htmlFor='update-status' className="cursor-pointer"><span className='text-green-500'><MdFileDownloadDone size={20} /></span></label>}
                                    <label onClick={ () => setDeletingModal(i)}  htmlFor='delete-confirm-modal' className="btn btn-accent ml-2 text-white btn-sm"><AiOutlineDelete size={20} /></label>
                                </div>
                            </div>
                        </motion.div>
                    </>)
                    }
                </div> 
                {
                updateStatus && <StatusUpdate 
                updateStatus={updateStatus} 
                setUpdateStatus={setUpdateStatus}
                />
}
                {
                deleteModule && <DeleteModalConfirm 
                deleteModule={deleteModule} 
                refetch={refetch}
                method={method}
                setDeletingModal={setDeletingModal}
                />
            }
        </div>
    );
};

export default WithdrawRequest;