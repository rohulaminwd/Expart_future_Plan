
import { useForm } from "react-hook-form";
import Loading from '../../Share/Loading';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import signInBg from '../../assets/images/signIn-bg.jpg'
import { AiOutlineGoogle, AiFillApple, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineCodeSandbox } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {

    const search = useLocation().search;
    let refer = new URLSearchParams(search).get('refer');

    const [error, setError] = useState();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()   

    if(loading){
        return <Loading></Loading>
    }
    if(refer === null){
        refer = undefined
    }
    console.log(refer);
    const onSubmit = async data => {
        setLoading(true)
        const user = {
            firstName : data.firstName,
            lastName: data.lastName,
            password: data.password,
            confirmPassword: data.confirmPassword,
            phoneNumber: data.phone,
            referCode: refer,
        }
        console.log(user);
        if(data.password !== data.confirmPassword){
            setError("Password not match")
        }
        
        fetch('http://localhost:5000/api/v1/user/signup', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then( status => {
            setLoading(false)
            if(status.status === 'success'){
                navigate('/signIn')
                toast.success('Sign up success please login now');
            }
            if(status.status === 'fail'){
                setError('Some this is wrong please try again')
            }
            // console.log(status.status)
            console.log(status)
        })
    }



    return (
        <div style={{ backgroundImage: `url(${signInBg})` }} className='bg-cover  h-screen'>
            <div className='h-screen bg-[#111f3b75] flex items-end sm:items-center justify-center w-full'>
                <div className="w-full sm:w-[500px] bg-base-100 rounded-3xl sm:rounded-b-3xl rounded-b-none p-5 sm:p-8 shadow-md" data-aos="zoom-in-down" data-aos-delay="100" data-aos-duration="800">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-center">New Account</h2>
                        <h6 className='text-center mb-3 leading-normal font-bold mx-auto sm:w-[80%]'>Hey Enter Your Details to create a account</h6>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='w-full flex items-center justify-between gap-3'>
                                <div className="form-control w-full">
                                    <input 
                                        type="text" 
                                        placeholder="First Name" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("firstName", {
                                            required: {
                                            value: true,
                                            message: 'Name is required'  
                                            },
                                            minLength: {
                                            value: 3,
                                            message: 'Must be 3 characters'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                    {errors.firstName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.firstName.message}</span>}
                                    {errors.firstName?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.firstName.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <input 
                                        type="text" 
                                        placeholder="Last Name" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("lastName", {
                                            required: {
                                            value: true,
                                            message: 'Name is required'  
                                            },
                                            minLength: {
                                            value: 3,
                                            message: 'Must be 3 characters longer'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                    {errors.lastName?.type === 'required' && <span className="label-text-alt text-red-500">{errors.lastName.message}</span>}
                                    {errors.lastName?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.lastName.message}</span>}
                                    </label>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <input 
                                    type="tel" 
                                    placeholder="Your Phone Number" 
                                    className="input input-bordered input-success w-full" 
                                    {...register("phone", {
                                        required: {
                                        value: true,
                                        message: 'Email is required'  
                                        },
                                    })}
                                />
                                <label className="label">
                                {errors.phone?.type === 'required' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                {errors.phone?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.phone.message}</span>}
                                </label>
                            </div>
                            <div className='w-full flex items-center justify-between gap-3'>
                                <div className="form-control w-full">
                                    <input 
                                        type="password" 
                                        placeholder="Your Password" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("password", {
                                            required: {
                                            value: true,
                                            message: 'Password is required'  
                                            },
                                            minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters longer'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <input 
                                        type="password" 
                                        placeholder="Conform password" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("confirmPassword", {
                                            required: {
                                            value: true,
                                            message: 'Password is required'  
                                            },
                                            minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters'
                                            }
                                        })}
                                    />
                                    <label className="label">
                                    {errors.confirmPassword?.type === 'required' && <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                                    {errors.confirmPassword?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.confirmPassword.message}</span>}
                                    </label>
                                </div>
                            </div>
                            { error && <p className='text-red-500 mb-2'><small>{error}</small></p>}
                            <input className='btn w-full text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0' type="submit" value="Create Account"  />
                        </form>

                        <div className="divider">OR</div>
                        <div className='flex items-center justify-around'>
                            <div className='border hover:border-primary cursor-pointer hover:text-primary rounded-lg p-2'>
                                <p className='flex items-center gap-1'><AiOutlineCodeSandbox size={20} /> <span className=''>Referral Code: {refer}</span></p>
                            </div>
                        </div>
                        <div className='flex mt-5 items-center font-bold justify-between'>     
                            <div>
                                <Link to='/'>
                                <h6 className='flex items-center gap-1 text-[#2091d9]'><AiOutlineArrowLeft />Back</h6>
                                </Link>
                            </div>
                            <div>
                                <Link to="/signIn">
                                    <h6 className='flex items-center gap-1 text-[#13b38f]'>Login <AiOutlineArrowRight /></h6>
                                </Link>
                            </div>       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;