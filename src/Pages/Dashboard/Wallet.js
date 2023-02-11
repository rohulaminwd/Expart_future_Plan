import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PlansModale from '../../Modale/ActivePlan';
import RechargeNow from '../../Modale/RechargeNow';
import WithdrawModule from '../../Modale/WithdrawModule';
import taka from '../../assets/icons/taka (1).png'
import taka2 from '../../assets/icons/taka1 (2).png'
import taka3 from '../../assets/icons/taka1 (3).png'
import taka4 from '../../assets/icons/taka1 (4).png'
import taka5 from '../../assets/icons/taka1 (5).png'
import taka6 from '../../assets/icons/taka1 (1).png'
import bg1 from '../../assets/images/bg-small6.jpg'
import bg2 from '../../assets/images/bg-small4.jpg'
import UpdatePassword from '../../Modale/UpdatePassword';
import Loading from '../../Share/Loading';
import { useContext } from 'react';
import { Context } from '../../App';
import { Circles, FidgetSpinner, Watch } from 'react-loader-spinner';
import useIncomeTracker from '../../Hooks/useIncomeTracker';

const Wallet = () => {
    const [me, isLoading] = useContext(Context);
    const [planModal, setPlanModal] = useState(null)
    const [recharge, setRecharge] = useState(null)
    const [withdraw, setWithdraw] = useState(null)
    const [updateModal, setUpdateModal] = useState(null)
    const { yesterdayIncome, todayIncome, weeklyIncome, monthlyIncome } = useIncomeTracker(me?.CompleteTask);
    if(isLoading){
        return <Loading></Loading>
    }

    const timelyBalance = (duration) => {
        let dateExpr
        let price = []
        me?.CompleteTask?.map(i => {
            const currentDate = new Date()
           const date = new Date(i?.date)
           const date1 = date.setDate(date.getDate())
           const currentDate1 = currentDate.setDate(currentDate.getDate() - duration)
           dateExpr = date.toLocaleTimeString();
           if(currentDate < date){
               price.push(i?.price)
           }
        })
        const totalprice = price.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        return totalprice
    }



    return (
        <div className='w-full sm:p-0 sm:pb-3 p-2'>
            <div style={{ backgroundImage: `url(${bg2})` }} className="bg-cover rounded-2xl">
                <div className='text-center cursor-pointer px-3 py-8 sm:py-12 bg-[#33446929] text-white rounded-2xl'>
                    <h3 className='text-5xl sm:text-8xl font-bold'>{me?.balance} ৳</h3>
                    <p className='text-3xl sm:text-5xl text-[#9cabc9] sm:mt-4 mt-2'>Total Balance</p>
                </div>
            </div>
            <div className='flex items-center mt-5 mb-3 sm:my-6 justify-between gap-2 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>{yesterdayIncome} ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Yesterday Income</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Yesterday Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka5} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>{me?.balance} ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Available Balance</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Available Balance</h1>
                </div>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka3} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>{todayIncome} ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Today Income</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Today Income</h1>
                </div>
            </div>
            <div className='flex items-center my-2 justify-between gap-2 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka6} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>{weeklyIncome} ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Weekly Income</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Weekly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka4} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>{monthlyIncome} ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Monthly Income</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Monthly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-lg bg-[#fff] rounded-lg'>
                    <div className='gap-1 flex items-center justify-between sm:justify-start sm:gap-2'>
                        <div className='w-9 sm:w-16 -ml-1'>
                            <img src={taka2} className='w-full' alt="taka" />
                        </div>
                        <div className=''>
                            <h3 className='font-bold sm:mb-1 sm:text-2xl'>12 ৳</h3>
                            <h1 className='text-[12px] hidden sm:block text-[#727988] sm:text-xl'>Company Bunas</h1>
                        </div>
                    </div>
                    <h1 className='text-[12px] sm:hidden block text-[#727988] sm:text-xl'>Company Bunas</h1>
                </div>
            </div>
            <div className='border-t-2 sm:mt-8 mt-5 border-primary'>
                <div className='flex items-center gap-4 sm:mt-8 mt-5 justify-between'>
                    <div className='w-full'>
                        {(me?.bkash & me?.nagad)? <label onClick={() => setRecharge("recharge")} for="recharge" className="btn btn-xl sm:btn-lg border-[4px] hover:shadow-md btn-success hover:shadow-[#c5f3f2] rounded-full border-[#b0f6b0] w-full text-[#fff] mr-5 font-bold bg-[#1e9558]">Recharge</label> 
                        : <label onClick={() => setUpdateModal("bankCard")} for="update-password" className="btn btn-xl sm:btn-lg border-[4px] hover:shadow-md btn-success hover:shadow-[#c5f3f2] rounded-full border-[#b0f6b0] w-full text-[#fff] mr-5 font-bold bg-[#1e9558]">Recharge</label>
                        }

                    </div>
                    <div className='w-full'>
                        {(me?.bkash & me?.nagad)? <label onClick={() => setWithdraw("withdraw")} for="withdraw" className="btn btn-xl sm:btn-lg border-[4px] border-[#f8c4b4] btn-secondary w-full font-bold rounded-full hover:shadow-md hover:shadow-secondary text-white bg-[#f05e41]">Withdraw</label>
                        : <label onClick={() => setUpdateModal("bankCard")} for="update-password" className="btn btn-xl sm:btn-lg border-[4px] border-[#f8c4b4] btn-secondary w-full font-bold rounded-full hover:shadow-md hover:shadow-secondary text-white bg-[#f05e41]">Withdraw</label>
                        }
                    </div>
                </div>
            </div>
            <Link to="/dashboard/planDetails">
                <div className='border-[4px] cursor-pointer flex gap-2 sm:gap-4 items-center border-[#6182c9] sm:mt-8 mt-5 p-2 bg-[#2d4069] text-white rounded-[80px]'>
                    <div className='w-[80px] h-[80px] grid place-content-center border-[4px] border-[#77e9d2] bg-[#cff8f7] rounded-full'>
                        <div className='text-center'>
                            <Circles
                            visible={true}
                            height="60"
                            width="60"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            ballColors={['#ff0000', '#00ff00', '#0000ff']}
                            backgroundColor="#F4442E"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-4xl sm:text-5xl font-bold'>Show Plan</h2>
                        <p className='text-2xl sm:text-3xl'>Our best plan</p>
                    </div>
                </div>
            </Link>
            <Link to="/dashboard/history">
                <div className='border-[4px] cursor-pointer flex gap-2 sm:gap-4 items-center border-[#e4b88c] sm:mt-8 mt-5 p-2 bg-[#965a2c] text-white rounded-[80px]'>
                    <div className='w-[80px] h-[80px] grid place-content-center border-[4px] border-[#77e9d2] bg-[#cff8f7] rounded-full'>
                        <div className='text-center'>
                            <Watch
                            visible={true}
                            height="60"
                            width="60"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                            ballColors={['#ff0000', '#00ff00', '#0000ff']}
                            backgroundColor="#F4442E"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className='text-4xl sm:text-5xl font-bold'>My History</h2>
                        <p className='text-2xl sm:text-3xl'>My Request history</p>
                    </div>
                </div>
            </Link>
            { (me?.role === "admin") &&
                <Link to='/admin-dashboard'>
                    <div style={{ backgroundImage: `url(${bg1})` }} className="bg-cover rounded-2xl">
                        <div className='text-center cursor-pointer sm:mt-3 mt-5 px-3 py-8 bg-[#2d4069cd] text-white rounded-2xl'>
                            <h2 className='text-3xl sm:text-5xl font-bold'>Admin Dashboard</h2>
                            <p className='text-xl text-primary mt-2'>only admin access the dashboard</p>
                        </div>
                    </div>
                </Link>
            }
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
            {
                updateModal && <UpdatePassword 
                updateModal={updateModal} 
                setUpdateModal={setUpdateModal}
                />
            }
        </div>
    );
};

export default Wallet;