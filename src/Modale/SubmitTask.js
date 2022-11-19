import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loading from '../Share/Loading';
import task1 from '../assets/icons/addImage.png'
import { useRef } from 'react';
import { ImFilePicture } from 'react-icons/im';

const SubmitTask = ({setSubmitTask, refetch, submitTask, me,}) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [image, setImage] = useState();
    const [img, setImg] = useState()
    const imageRef = useRef();
    const [visible, setVisible] = useState(false);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImg(img)
            setImage({
                image: URL.createObjectURL(img)
            })
        }
    }

    const onSubmit = () => {
        const taskInfo = {
            phoneNumber: me?.phoneNumber,
            price: submitTask?.price,
            date: new Date(),
            planCategory: submitTask?.planCategory,
            category: submitTask?.category,
            status: "complete",
            id: submitTask?._id
        }

        fetch(`http://localhost:5000/api/v1/task/submit/${submitTask?._id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',  
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
            },
            body: JSON.stringify(taskInfo)
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === "success"){
                    toast.success('Your task submit success'); 
                    refetch();
                    const completeTask = setTimeout(() => {
                        fetch(`http://localhost:5000/api/v1/user/CompleteTask/${me?._id}`, {
                        method: 'PATCH',
                        headers: {
                            'content-type': 'application/json',  
                            'authorization': `Bearer ${localStorage.getItem('accessToken')}`                  
                        },
                        body: JSON.stringify(taskInfo)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if(data.status === "success"){
                                refetch(); 
                                toast.success('pement ok'); 
                                setSubmitTask(null);
                                console.log(data)
                            }
                            if(data.status === "fail"){
                                toast.error('Opps request not success'); 
                            }
                        })
                    }, 3000);
                    return () => clearTimeout(completeTask);             
                }
                if(data.status === 'fail'){
                    toast.error('Your Request fail plx try again');
                    console.log(data.status)
                }
            })
    }
    
    return (
        <div>
            <input type="checkbox" id="submit-task" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <form onSubmit={handleSubmit(onSubmit)} className="bg-blue-100 h-screen sm:h-auto modal-box p-3 py-5 sm:p-4">
                   { !image && 
                   <div className='w-full text-center'>
                        <h2 className='text-xl uppercase text-center mb-3 font-bold text-[#2e4260]'>Select picture</h2>
                    </div>
                    }
                    {image && <h2 className='text-xl uppercase text-center mb-3 font-bold text-[#2e4260]'> picture</h2> }
                    <div className='w-full max-h-[500px] overflow-y-auto rounded-2xl'>
                        {image && <img src={image.image} className='w-full rounded-2xl' alt="post img" />}
                    </div>
                    <div onClick={() => imageRef.current.click()} className="flex cursor-pointer justify-center items-center">
                        <div className="text-[20px] sm:text-[30px] text-blue-700 text-center font-bold">
                            {!image && <img src={task1} className='w-28 mx-auto' alt="create" />}
                            {image && <span className='text-[16px] mt-5 uppercase text-center mb-3 btn btn-secondary btn-sm font-bold text-white'>Change picture</span> }
                        </div>
                        <div style={{ display: 'none' }} className="hidden">
                            <input type="file" name="images" onChange={onImageChange} ref={imageRef} id="" />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-3 mt-3">
                        <input type="submit" value="Submit" disabled={!image} className="btn w-[100px] btn-primary text-white btn-sm" />
                        <label for="submit-task" className="btn btn-sm w-[100px] ">cancel</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitTask;