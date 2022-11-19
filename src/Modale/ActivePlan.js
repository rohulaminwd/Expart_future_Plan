import React from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { Context } from '../App';
import active from '../assets/icons/activeplan.png'

const ActivePlan = ({setActivePlan, activePlan}) => {

    const [me, , refetch,] = useContext(Context);

    const handlePlanActive = () => {
        activePlan.date = new Date();
        console.log(activePlan)
        fetch(`http://localhost:5000/api/v1/User/plan/${me?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(activePlan)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    toast.success(data.message); 
                    setActivePlan(null);
                    refetch();             
                }
                console.log(data)
            })
        }
        
    return (
        <div>
            <input type="checkbox" id="active-plan" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-blue-100">
                    <div className='text-center'>
                        <img src={active} className='w-20 mx-auto' alt="delete" />
                    </div>
                    <h2 className="text-green-500 text-2xl">Are you sure you want to active {activePlan?.planName}</h2>
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button onClick={handlePlanActive} className="btn w-[100px] btn-primary text-white btn-sm">Yes</button>
                        <label for="active-plan" className="btn btn-sm w-[100px] ">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivePlan;