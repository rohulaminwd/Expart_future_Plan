import React, { useState } from 'react';
import { toast} from 'react-toastify';
import Loading from '../Share/Loading';
import delete1 from  '../assets/icons/delete.png'

const DeleteModalConfirm = ({deleteModule, refetch, method, setDeletingModal}) => {
    const [loading, setLoading] = useState(false)

    if(loading){
        return <Loading></Loading>
    }
    const handleDelete = () => {
        setLoading(true)
        fetch(`http://localhost:5000/api/v1/${method}/${deleteModule?._id}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.status === 'success'){
                toast.success(` ${data.message} ${deleteModule?.name}`);
                setDeletingModal(null)
                setLoading(false)
                refetch();
            }
            if(data.status === 'fail'){
                toast.success(` ${data.message} ${deleteModule?.name}`);
                setLoading(false)
                refetch();
            }
        })
    }
    return (
        <div>
            <input type="checkbox" id="delete-confirm-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-blue-100">
                    <div className='text-center'>
                        <img src={delete1} className='w-20 mx-auto' alt="delete" />
                    </div>
                    <h2 className="text-red-700 text-2xl">Are you sure you want to delete This item</h2>
                    <div className="flex items-center justify-center gap-3 mt-5">
                        <button onClick={handleDelete} className="btn w-[100px] btn-primary text-white btn-sm">Yes</button>
                        <label for="delete-confirm-modal" className="btn btn-sm w-[100px] ">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModalConfirm;