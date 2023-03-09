import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import Loading from '../../Share/Loading';
import {Link, useLocation, useNavigate,} from 'react-router-dom';
import signInBg from '../../assets/images/signIn-bg.jpg'
import { AiOutlineGoogle, AiFillApple, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-phone-input-2/lib/style.css'
import { BiHide, BiShow } from 'react-icons/bi';
import PhoneInput from 'react-phone-input-2';
import loginImg from "../../assets/icons/key.png"

const SignIn = () => {
    const [error, setError] = useState();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const [ph, setPh] = useState();
    const [showPass, setshowPass] = useState(false);
    const [passType, setPassType] = useState("password");
    const navigate = useNavigate();

    const handleShowPass = () => {
        setshowPass(!showPass);
        setPassType(passType === "password"? "text" : "password")
    }


    if(loading){
        return <Loading></Loading>
    }


    const onSubmit = i => {
        const userInfo = {
            phoneNumber: "+" + ph,
            password: i.password,
        }
        console.log(userInfo)
        setLoading(true)
        fetch('https://efp-usa-server-site.vercel.app/api/v1/user/login', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userInfo)
        })
        .then(res => res.json())
        .then( status => {
            setLoading(false)
            if(status.data){
                navigate('/dashboard')
                toast.success('Well come to dashboard');
                const accessToken = status.data.token;
                console.log(status?.data)
                localStorage.setItem('accessToken', accessToken);
            }
            if(status.status === 'fail'){
                setError("Some thing is wrang");
            }
        })
    }
    return (
        <div style={{ backgroundImage: `url(${signInBg})` }} className='bg-cover  h-screen'>
            <div className='h-screen bg-[#111f3b75] flex items-end sm:items-center justify-center w-full'>
            <div className="w-full sm:w-[500px] bg-base-100 rounded-3xl sm:rounded-b-3xl rounded-b-none p-5 sm:p-8 shadow-md" data-aos="zoom-in-down" data-aos-delay="100" data-aos-duration="800">
                <div className="text-center">
                    <div>
                        <img src={loginImg} className="w-16 mx-auto" alt="" />
                    </div>
                    <h6 className='text-center mb-3 leading-normal font-bold mx-auto sm:w-[80%]'>Hey Enter Your Details to get sign in to your account</h6>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-3 w-full">
                            <label className="label">
                                <span className="label-text text-cyan-900 font-bold">Phone Number</span>
                            </label>
                            <div className='text-left'>
                                <PhoneInput
                                    inputProps={{
                                        name: 'phone',
                                        required: true,
                                        autoFocus: true
                                    }}
                                    inputClass="!py-6 border !border-primary"
                                    buttonClass="border !py-5 !border-primary"
                                    containerClass=''
                                    containerStyle={{ width: '100%',}}
                                    searchClass='border border-primary'
                                    inputStyle={{ width: '100%',}}
                                    country={"bd"}
                                    value={ph} 
                                    onChange={setPh}
                                />
                            </div>
                        </div>
                        <div className="form-control mb-5 w-full">
                            <label className="label">
                                <span className="label-text text-cyan-900 font-bold">Password</span>
                            </label>
                            <div className='relative'>
                            <input 
                                type={passType} 
                                placeholder="Password" 
                                className="input input-bordered !py-4 sm:!py-6 !rounded-md input-primary w-full" 
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
                            <div onClick={handleShowPass} className={`${showPass? "text-primary" : "text-gray-400 "} cursor-pointer  absolute top-[12px] right-2`}>
                                {showPass? <BiShow size={24} /> : <BiHide size={24} />}
                            </div>
                            </div>
                            {errors?.password && 
                                <label className="label p-0 pt-1">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            }
                        </div>
                    { error && <p className='text-red-500 mb-2'><small>{error}</small></p>}
                    <input className='btn w-full text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0' type="submit" value="Login"  />
                    </form>
                    <div className="divider">OR</div>
                    <div className='flex items-center justify-around'>
                        <div className='border hover:border-primary cursor-pointer hover:text-primary rounded-lg p-2'>
                              <p className='flex items-center gap-1'><AiOutlineGoogle size={20} /> <span className='hidden sm:block'>Google</span></p>
                        </div>
                        <div className='border hover:border-primary cursor-pointer hover:text-primary rounded-lg p-2'>
                              <p className='flex items-center gap-1'><AiFillApple size={20} /> <span className='hidden sm:block'>Apple</span></p>
                        </div>
                        <div className='border hover:border-primary cursor-pointer hover:text-primary rounded-lg p-2'>
                              <p className='flex items-center gap-1'><FaFacebookF size={20} /> <span className='hidden sm:block'>Facebook</span></p>
                        </div>
                    </div>
                    <div className='flex mt-5 items-center font-bold justify-between'>     
                        <div>
                            <Link to='/'><h6 className='flex items-center gap-1 text-[#2091d9]'><AiOutlineArrowLeft />Back</h6></Link>
                        </div>
                        <div>
                            <Link to='/signUp'><h6 className='flex items-center gap-1 text-[#13b38f]'>New Account<AiOutlineArrowRight /></h6></Link>
                        </div>       
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default SignIn;