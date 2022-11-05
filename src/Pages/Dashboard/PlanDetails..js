import React from 'react';
import { useState } from 'react';
import { RiVipDiamondLine, RiVipCrown2Line, RiVipCrownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';

const PlanDetails = () => {
    const [planTime, setPlanTime] = useState('3days');
    const plans = [
        {
            name: 'Plan 1',
            price: 1000,
            taskPrice: 15,
            dailyTask: 2,
            planTime: '3days'
        },
        {
            name: 'Plan 2',
            price: 2000,
            taskPrice: 35,
            dailyTask: 2,
            planTime: '3days'
        },
        {
            name: 'Plan 3',
            price: 5000,
            taskPrice: 50,
            dailyTask: 3,
            planTime: '3days'
        },
        {
            name: 'Plan 1',
            price: 1000,
            taskPrice: 35,
            dailyTask: 1,
            planTime: '7days'
        },
        {
            name: 'Plan 2',
            price: 2000,
            taskPrice: 35,
            dailyTask: 2,
            planTime: '7days'
        },
        {
            name: 'Plan 3',
            price: 5000,
            taskPrice: 44,
            dailyTask: 4,
            planTime: '7days'
        },
        {
            name: 'Plan 1',
            price: 2000,
            taskPrice: 40,
            dailyTask: 2,
            planTime: '14days'
        },
        {
            name: 'Plan 2',
            price: 3000,
            taskPrice: 40,
            dailyTask: 3,
            planTime: '14days'
        },
        {
            name: 'Plan 3',
            price: 5000,
            taskPrice: 50,
            dailyTask: 4,
            planTime: '14days'
        },
        {
            name: 'Plan 4',
            price: 8000,
            taskPrice: 80,
            dailyTask: 4,
            planTime: '14days'
        },
        {
            name: 'Plan 1',
            price: 2000,
            taskPrice: 45,
            dailyTask: 2,
            planTime: '30days'
        },
        {
            name: 'Plan 2',
            price: 5000,
            taskPrice: 75,
            dailyTask: 3,
            planTime: '30days'
        },
        {
            name: 'Plan 3',
            price: 10000,
            taskPrice: 75,
            dailyTask: 6,
            planTime: '30days'
        },
        {
            name: 'Plan 4',
            price: 20000,
            taskPrice: 100,
            dailyTask: 9,
            planTime: '30days'
        },
    ]
    const planDays = plans.filter(i => i.planTime.includes(planTime));
    return (
        <div className='w-full sm:p-0 p-2'>
            <h1 className='text-xl uppercase bg-white text-center p-3 rounded-md shadow-md font-bold text-primary'>Our best Plan</h1>
            <div className='w-full bg-white p-2 pb-5 sm:pb-8 sm:p-3 mt-5 rounded-md shadow-md'>
                <div className="w-full flex items-center justify-between ">
                    <div onClick={() => setPlanTime('3days')} className={`${(planTime === '3days')? '!bg-primary border-[3px] border-[#9df1e5] rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>3 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('7days')} className={`${(planTime === '7days')? '!bg-[#dbfbd7] border-[3px] border-[#abf98d] rounded-md !text-[#156c65]' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>7 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('14days')} className={`${(planTime === '14days')? '!bg-[#c2f7f6] border-[3px] border-[#8df3f9] rounded-md !text-[#156c65]' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>14 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                    <div onClick={() => setPlanTime('30days')} className={`${(planTime === '30days')? 'bg-[#2d4069] border-[3px] border-[#81a7fa] rounded-md !text-white' : 'border bg-slate-100'} cursor-pointer w-full py-2 px-0`}>
                        <div className='text-center'>
                            <h1 className='text-xl sm:text-2xl'>30 days</h1>
                            <h1 className='text-[14px]'>Show Plans</h1>
                        </div>
                    </div> 
                </div>
                <div className='md:mt-5 md:grid grid-cols-2 gap-5 mt-3'>
                    {
                        planDays.map((i, index) => <>
                        <div className={`
                        ${(planTime === '7days')? "text-[#156c65] border-[#abf98d] bg-[#dbfbd7]" : "bg-primary text-white border-[#9df1e5]"} 
                        ${(planTime === '14days')? "text-[#156c65] border-[#8df3f9] bg-[#c2f7f6]" : "bg-primary text-white border-[#9df1e5]"} 
                        ${(planTime === '30days')? "text-white border-[#81a7fa] bg-[#2d4069]" : "bg-primary text-white border-[#9df1e5]"} 
                        p-2 mt-5 md:mt-0 sm:p-3 w-full cursor-pointer border-[3px]  hover:-translate-y-1 duration-300 shadow-md  rounded-2xl`}>
                            <div className='flex justify-between gap-2'>
                                <div className='w-full'>
                                    <h3 className='text-xl sm:text-2xl'>{i.name}</h3>
                                </div>
                                <div className=' flex justify-end w-full items-center gap-2'><p className='text-[24px]'>{i.price} ৳</p> <RiVipCrown2Line size={30} /></div>
                            </div>
                            <div className='flex items-end justify-between mt-3'>
                                <div className=''>
                                    <h3 className='text-[14px]'>Price: {i.taskPrice}.00 ৳</h3>
                                    <p className='text-[12px]'>Daily task: {i.dailyTask}</p>
                                </div>
                                <Link to="#" className="btn w-[100px] btn-accent text-white btn-sm">Start</Link>
                            </div>
                        </div>
                    </>)
                    }
                </div>
            </div>  
        </div>
    );
};

export default PlanDetails;