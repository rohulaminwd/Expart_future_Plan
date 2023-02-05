import React from 'react';
import '../App.css'
import { useState } from 'react';
import {  } from 'react-icons/ri'
import ReactPlayer from 'react-player';
import Loading from '../Share/Loading';
import ConfirmWithdraw from './ConfirmWithdraw';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Context } from '../App';


const WithdrawModule = ({setWithdraw, withdraw}) => {
    const [card, setCard] = useState('bkash');
    const [withdrawConfirm, setWithdrawConfirm] = useState(null);
    const [amount, setAmount] = useState(0);
    const [loading1, setLoading] = useState(false)
    const [me, isLoading, refetch] = useContext(Context);

    if(loading1 || isLoading){
        return <Loading />
    } 

    const accountNumber = (card === "bkash")? `${me?.bkash}` : `${me?.nagad}`
    const handleState = () => {
        setWithdrawConfirm({amount, card});
        // setLoading(true)
        const requestInfo = {
            sector: 'withdraw',
            name: me?.firstName + ' ' + me?.lastName,
            amount: amount,
            phoneNumber: me?.phoneNumber,
            accountNumber: accountNumber
        }
        console.log(requestInfo, 'dta data');
        
        fetch('https://efp-usa-server-site.vercel.app/api/v1/request/add', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(requestInfo)
        })
        .then(res => res.json())
        .then( status => {
            if(status.status === 'success'){
                toast.success('Your Request Success');
                setLoading(false);
                setWithdraw('hidden');
                setWithdrawConfirm({amount, card});
                refetch()
            }
            if(status.status === 'fail'){
                setLoading(false)
                toast.error('Your Request fail plx try again');
                setWithdraw(null);
                setWithdrawConfirm(null);
            }
            console.log(status)
        })

        
    }
    return (
        <div>
            <input type="checkbox" id="withdraw" className="modal-toggle" />
            <div  className={`${(withdraw === 'hidden') && 'hidden'} modal h-screen modal-bottom sm:modal-middle`}>
                <div className="modal-box bg-blue-100 h-auto px-2 py-4 sm:py-8 sm:px-4">
                    <label for="withdraw" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h1 className='text-xl uppercase text-center font-bold text-primary'>Withdraw</h1>
                    <div className='text-center w-full p-2 shadow-md mt-5 rounded-md bg-white'>
                        <p>Available Balance: {me?.balance}</p>
                    </div> 
                    <div className='w-full p-2 sm:p-3 shadow-md mt-4 rounded-md bg-white'>
                        <div className='rounded-md p-3 bg-slate-200'>
                            <p className=''>Withdraw channel</p>
                            <div className="tabs mt-4 flex items-center gap-3 tabs-boxed">
                                <span onClick={() => setCard('bkash')} className={`${(card === 'bkash')? 'tab-active !text-white' : 'border border-[#9b9b9b] rounded-lg'} tab`}>Bkash</span> 
                                <span onClick={() => setCard('nagad')} className={`${(card === 'nagad')? 'tab-active !text-white' : 'border border-[#9b9b9b] rounded-lg'} tab`}>Nagad</span> 
                            </div>
                            <p className='mt-3'>{`${(card === 'bkash')? "Bkash: 01965476647" : "Nagod: 01831294559"}`}</p>
                        </div>
                        <p className='p-2 text-[16px] text-gray-700'>Withdraw Amount: <span className='text-secondary text-[14px]'>( Minimum 500 )</span></p>
                        <form className='w-full mt-4'>
                            <input type="number" placeholder="Enter Recharge Amount" onChange={e => setAmount(e.target.value)} class="input input-sm input-bordered w-full" required />
                            <label onClick={handleState} for='confirmWithdraw' className="btn w-full mt-5 mb-3 btn-primary rounded-2xl text-white btn-sm" disabled={(amount < 500) || (me?.balance < 500)}>Withdraw Now</label>
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
            {
                withdrawConfirm && <ConfirmWithdraw 
                withdrawConfirm={withdrawConfirm} 
                setWithdrawConfirm={setWithdrawConfirm}
                />
            }
        </div>
    );
};

export default WithdrawModule;