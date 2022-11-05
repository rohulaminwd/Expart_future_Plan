import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlansModale from '../../Modale/PlansModale';
import RechargeNow from '../../Modale/RechargeNow';
import WithdrawModule from '../../Modale/WithdrawModule';

const Wallet = () => {
    const [planModal, setPlanModal] = useState(null)
    const [recharge, setRecharge] = useState(null)
    const [withdraw, setWithdraw] = useState(null)
    return (
        <div className='w-full sm:p-0 p-2'>
            <div className='text-center border-[8px] border-[#8bf2e6] sm:mt-5 sm:py-12 px-3 py-8 bg-primary text-white rounded-2xl'>
                <h2 className='text-5xl sm:text-8xl font-bold'>$ 125485</h2>
                <p className='text-2xl sm:text-4xl mt-2'>Total Balance</p>
            </div>
            <div className='flex items-center my-4 sm:my-6 justify-between gap-3 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#abf98d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#dbfbd7] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 12</h3>
                    <h1 className='text-[12px] sm:text-xl'>Yesterday Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#f98d8d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#f9eded] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 112</h3>
                    <h1 className='text-[12px] sm:text-xl'>Available Balance</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#abf98d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#dbfbd7] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 78</h3>
                    <h1 className='text-[12px] sm:text-xl'>Today Income</h1>
                </div>
            </div>
            <div className='flex items-center my-4 justify-between gap-3 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Weekly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Monthly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Company Bunas</h1>
                </div>
            </div>
            <div className='border-t-2 sm:mt-8 mt-5 border-primary'>
                <div className='flex items-center gap-4 sm:mt-8 mt-5 justify-between'>
                    <div className='w-full'>
                        <label onClick={() => setRecharge("recharge")} for="recharge" className="btn btn-xl sm:btn-lg border-[4px] hover:shadow-md btn-success hover:shadow-[#c5f3f2] rounded-full border-[#b0f6b0] w-full text-[#fff] mr-5 font-bold bg-[#1e9558]">Recharge</label>
                    </div>
                    <div className='w-full'>
                        <label onClick={() => setWithdraw("withdraw")} for="withdraw" className="btn btn-xl sm:btn-lg border-[4px] border-[#f8c4b4] btn-secondary w-full font-bold rounded-full hover:shadow-md hover:shadow-secondary text-white bg-[#f05e41]">Withdraw</label>
                    </div>
                </div>
            </div>
            <label onClick={() => setPlanModal("plans")} for="plans-module">
                <div className='text-center border-[8px] cursor-pointer border-[#6182c9] sm:mt-8 mt-5 sm:py-12 px-3 py-8 bg-[#2d4069] text-white rounded-2xl'>
                    <h2 className='text-5xl sm:text-8xl font-bold'>Show Plan</h2>
                    <p className='text-2xl sm:text-4xl mt-2'>Our best plan</p>
                </div>
            </label>
            {
                planModal && <PlansModale 
                planModal={planModal} 
                setPlanModal={setPlanModal}
                />
            }
            {
                recharge && <RechargeNow 
                recharge={recharge} 
                setRecharge={setRecharge}
                />
            }
            {
                withdraw && <WithdrawModule 
                withdraw={withdraw} 
                setWithdraw={setWithdraw}
                />
            }
        </div>
    );
};

export default Wallet;