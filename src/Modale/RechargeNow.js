import React from 'react';
import { useState } from 'react';
import {  } from 'react-icons/ri'
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';


const RechargeNow = ({setRecharge, recharge}) => {
    const [card, setCard] = useState('bkash');
    return (
        <div>
            <input type="checkbox" id="recharge" className="modal-toggle" />
            <div className="modal h-screen modal-bottom sm:modal-middle">
                <div className="modal-box bg-blue-100 h-screen sm:h-auto px-2 py-4 sm:py-8 sm:px-4">
                    <label for="recharge" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-xl uppercase text-center font-bold text-primary'>Recharge</h1>
                    <div className='text-center w-full p-2 shadow-md mt-5 rounded-md bg-white'>
                        <p>Available Balance: 1254</p>
                    </div> 
                    <div className='w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white'>
                        <div className='rounded-md p-3 bg-slate-200'>
                            <p>Recharge channel</p>
                            <div className="tabs mt-4 flex items-center gap-3 tabs-boxed">
                                <span onClick={() => setCard('bkash')} className={`${(card === 'bkash')? 'tab-active !text-white' : 'border border-[#9b9b9b] rounded-lg'} tab`}>Bkash</span> 
                                <span onClick={() => setCard('nagad')} className={`${(card === 'nagad')? 'tab-active !text-white' : 'border border-[#9b9b9b] rounded-lg'} tab`}>Nagad</span> 
                            </div>
                        </div>
                        <p className='p-2 text-[16px] text-gray-700'>Recharge Amount: <span className='text-secondary text-[14px]'>( Minimum 1000 )</span></p>
                        <form className='w-full mt-4'>
                            <input type="number" placeholder="Enter Recharge Amount" class="input input-sm input-bordered w-full" required />
                            <input type="submit" value="Recharge Now" className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm" />
                        </form>
                    </div> 
                    <div className=' w-full p-2 shadow-md mt-5 rounded-md bg-white'>
                        <p>Help Video</p>
                        <div className='flex items-center py-4 px-2 justify-between gap-8'>
                          <ReactPlayer height='80px' url='https://www.youtube.com/watch?v=h0yPK_A1b74' />
                          <ReactPlayer height='80px' url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    );
};

export default RechargeNow;