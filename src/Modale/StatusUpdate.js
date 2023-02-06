import React, { useState } from 'react';
import { toast } from 'react-toastify';
import complete from '../assets/images/complete1.png'

const StatusUpdate = ({setUpdateStatus, updateStatus}) => {
    const {i, refetch, request} = updateStatus;
    const [transCode, setTransCode] = useState()
    const [accountNum, setAccountNum] = useState('01845389969')

    const handleUpdate = () => {
        const dataInfo = {
            status: (request === 'return')? "cancelled" : "complete",
            phoneNumber: i?.phoneNumber,
            amount: i?.amount,
            sector: i?.sector,
            tranId: (request === 'return')? transCode : i?.tranId,
            accountNumber: (request === 'return')? accountNum : i?.accountNumber,
        }
        
    fetch(`https://efp-usa-server-site.vercel.app/api/v1/request/${i?._id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',  
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
        },
        body: JSON.stringify(dataInfo)
        })
        .then(res => res.json())
        .then(data => {
            if(data.status == "success"){
                toast.success(data.message); 
                refetch();             
                setUpdateStatus(null);
            }
        })
        
    }
    
    return (
        <div>
            <input type="checkbox" id="update-status" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-3 py-5 sm:p-4">
                    {(setUpdateStatus === "recharge") && <h1 className='text-xl uppercase text-center font-bold text-primary'>Add Recharge</h1>}
                    <div className='text-center'>
                        <img src={complete} className='w-28 mx-auto' alt="complete" />
                        <div>
                            <h2 className='text-2xl font-bold text-[#000]'>Are you sure {i?.name} {i?.sector} Complete 
                                <span className='text-accent'> {i?.amount} tk</span> 
                            </h2>
                        </div>
                    </div>
                    {(request === 'return') &&
                        <div className='text-center w-full sm:w-[80%] mx-auto'>
                            <form action="" className='w-full flex items-center justify-between gap-3 mt-4'>
                             <input type="text" value={transCode} placeholder="Enter Transection Id" onChange={e => setTransCode(e.target.value)} class="input input-sm input-accent input-bordered w-full" required />
                             <input type="text" value={accountNum} placeholder="Enter Account Number" onChange={e => setAccountNum(e.target.value)} class="input input-sm input-accent input-bordered w-full" required />
                            </form>
                        </div>
                    }
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button onClick={handleUpdate} className="btn w-[100px] btn-primary text-white btn-sm" disabled={(request === 'return') && !transCode}>Yes</button>
                        <label for="update-status" className="btn btn-sm w-[100px] ">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusUpdate;