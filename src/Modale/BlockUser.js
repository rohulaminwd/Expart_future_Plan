import React, {useState} from 'react';
import axios from "../Utils/Axios.config"
import { toast} from 'react-toastify';
import stop from '../assets/icons/stop.png';
import approve from '../assets/icons/approve.png';
import { ProgressBar } from 'react-loader-spinner';

const BlockUser = ({setOpenBlock, refetch, blocked}) => {
    const [loading, setLoading] = useState(false)

    const [user, type] = blocked;

    const data = {
        status : (type === "block")? "blocked" : "active",
    }


    const handleBlock = async () => {
        setLoading(true)
        axios.patch(`/user/${user?._id}`, data)
        .then((response) => {
          toast.success("successfully Blocked the user")
          refetch();
          setOpenBlock(null);
          setLoading(false);
        })
        .catch((error) => {
            toast.error("Ops No..!! Something is wrong")
            setLoading(false);
        });
    }

    return (
        <div>
            <input type="checkbox" id="blocked" className="modal-toggle" />
            <div className="modal h-screen modal-bottom sm:modal-middle">
                <div className="modal-box pb-8 mb-10 bg-blue-100 h-auto px-2 py-4 sm:py-8 sm:px-4">
                    <div className='text-xl text-center font-bold text-accent'>
                       { (type === "block") && <img src={stop} className='w-32 mx-auto' alt="complete" />}
                       { !(type === "block") && <img src={approve} className='w-32 mx-auto' alt="complete" />}
                       <h2 className={`${(type === "block")? "text-[#8b8989]" : "text-primary"} text-2xl font-bold`}>Are Your sure..? you want to {(type === 'block')? "Blocked" : "UnBlock"} <span className='text-purple-700'>{user?.firstName} {user?.lastName}</span></h2>
                    </div>
                    <div className='p-4 mt-5 shadow-md rounded-md bg-white'>
                        { loading &&
                            <div className='w-full flex items-center justify-center'>
                                <ProgressBar
                                height="80"
                                width="80"
                                ariaLabel="progress-bar-loading"
                                wrapperStyle={{}}
                                wrapperClass="progress-bar-wrapper"
                                borderColor = '#F4442E'
                                barColor = '#51E5FF'
                                />
                            </div>
                        }
                        <div className='flex items-center justify-center gap-x-3'>
                            <button onClick={handleBlock} className="btn w-[100px] btn-primary text-white btn-sm">Yes</button>
                            <label htmlFor="blocked" className="btn btn-sm w-[100px]">No</label>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default BlockUser;