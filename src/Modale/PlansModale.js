import React from 'react';
import { RiVipDiamondLine, RiVipCrown2Line, RiVipCrownLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';

const PlansModale = ({setPlanModal, planModal}) => {
    return (
        <div>
            <input type="checkbox" id="plans-module" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-blue-100 h-screen sm:h-auto px-3 py-5 sm:py-8 sm:px-4">
                    <label for="plans-module" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-2xl uppercase text-center font-bold text-primary'>Our best Plan</h1>
                    <div className='w-full'>
                        <div className='p-2 mt-5 sm:p-3 w-full cursor-pointer border-[3px] border-[#f98d8d] hover:-translate-y-1 duration-300 shadow-md text-white bg-accent rounded-2xl'>
                            <div className='flex justify-between gap-2'>
                                <div className='w-full'>
                                    <h3 className='text-xl sm:text-2xl'>Free Plan</h3>
                                </div>
                                <div className='text-white flex justify-end w-full items-center gap-2'><p className='text-[24px]'>0 ৳</p> <RiVipDiamondLine size={30} /></div>
                            </div>
                            <div className='flex items-end justify-between mt-3'>
                                <div className=''>
                                    <h3 className='text-[14px]'>Price: 20.00 ৳</h3>
                                    <p className='text-[12px]'>Daily task: 1/3</p>
                                </div>
                                <Link to="#" className="btn w-[100px] btn-primary text-white btn-sm">Start</Link>
                            </div>
                        </div>
                        <div className='p-2 mt-5 sm:p-3 w-full cursor-pointer border-[3px] border-[#9df1e5] hover:-translate-y-1 duration-300 shadow-md text-white bg-primary rounded-2xl'>
                            <div className='flex justify-between gap-2'>
                                <div className='w-full'>
                                    <h3 className='text-xl sm:text-2xl'>Lifetime Plan</h3>
                                </div>
                                <div className='text-white flex justify-end w-full items-center gap-2'><p className='text-[24px]'>1000 ৳</p> <RiVipCrown2Line size={30} /></div>
                            </div>
                            <div className='flex items-end justify-between mt-3'>
                                <div className=''>
                                    <h3 className='text-[14px]'>Price: 20.00 ৳</h3>
                                    <p className='text-[12px]'>Daily task: 1/3</p>
                                </div>
                                <Link to="#" className="btn w-[100px] btn-accent text-white btn-sm">Start</Link>
                            </div>
                        </div>
                        <div className='p-2 mt-5 sm:p-3 w-full cursor-pointer border-[3px] border-[#81a7fa] hover:-translate-y-1 duration-300 shadow-md text-white bg-[#2d4069] rounded-2xl'>
                            <div className='flex justify-between gap-2'>
                                <div className='w-full'>
                                    <h3 className='text-xl sm:text-2xl'>Plan In Time</h3>
                                </div>
                                <div className='text-white flex justify-end w-full items-center gap-2'><RiVipCrownLine size={30} /></div>
                            </div>
                            <div className='flex items-end justify-center mt-6 mb-1'>
                                <Link to="/dashboard/planDetails" className="btn w-full btn-primary text-white btn-sm">show details</Link>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    );
};

export default PlansModale;