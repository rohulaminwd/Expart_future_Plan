import React, { useState } from 'react';
import { toast } from 'react-toastify';
import task from "../assets/icons/task (2).png"

const GiveTask = ({setGiveTask, giveTask, refetch}) => {
    const [i, id] = giveTask;

    const handleUpdate = () => {
        i.date = new Date()
        console.log(i)

        fetch(`http://localhost:5000/api/v1/task/${i?._id}`, {
        method: 'PATCH',
        headers: {
            'content-type': 'application/json',  
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
        },
        body: JSON.stringify({status: "running"})
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === "success"){
                toast.success("Successfully add the task"); 
                refetch();             
                setGiveTask(null)
            }
            if(data.status === 'fail'){
                toast.error('Your Request fail plx try again');
            }
        })

        

        
        
    }
    
    return (
        <div>
            <input type="checkbox" id="give-task" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box p-3 py-5 sm:p-4">
                    <h1 className='text-xl uppercase text-center font-bold text-primary'>Add Task</h1>
                    <div className='text-center'>
                        <img src={task} className='w-28 mx-auto' alt="task" />
                        <div>
                            <h2 className='text-2xl font-bold text-[#000]'>Are you sure add the {i?.name} Task  
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-5"> 
                        <button onClick={handleUpdate} className="btn w-[100px] btn-primary text-white btn-sm">Yes</button>
                        <label for="give-task" className="btn btn-sm w-[100px] ">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiveTask;