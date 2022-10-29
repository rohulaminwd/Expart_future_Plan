import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { useForm } from "react-hook-form";
import Loading from '../../Share/Loading';
import {Link, useLocation, useNavigate,} from 'react-router-dom';
import signInBg from '../../assets/images/signIn-bg.jpg'
import { AiOutlineGoogle, AiFillApple, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'

const SignIn = () => {
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);
    let signInError; 
    const navigate = useNavigate()
    const location = useLocation() 
    let from = location.state?.from?.pathname || '/';

    if(user){
        navigate(from, { replace: true })
        navigate('/dashboard')
    }  

    if(loading){
        return <Loading></Loading>
    }

    if(error){
        signInError = <p className='text-red-500 mb-2'><small>{error?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    }
    return (
        <div style={{ backgroundImage: `url(${signInBg})` }} className='bg-cover  h-screen'>
            <div className='h-screen bg-[#111f3b75] flex items-end sm:items-center justify-center w-full'>
            <div className="w-full sm:w-[500px] bg-base-100 rounded-3xl sm:rounded-b-3xl rounded-b-none p-5 sm:p-8 shadow-md" data-aos="zoom-in-down" data-aos-delay="100" data-aos-duration="800">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-center">Agent Login</h2>
                    <h6 className='text-center mb-3 leading-normal font-bold mx-auto sm:w-[80%]'>Hey Enter Your Details to get sign in to your account</h6>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <input 
                            type="email" 
                            placeholder="Your Email" 
                            className="input input-bordered input-success w-full" 
                            {...register("email", {
                                required: {
                                  value: true,
                                  message: 'Email is required'  
                                },
                                pattern: {
                                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                  message: 'provide a valid email..'
                                }
                              })}
                        />
                        <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
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
                    {signInError}
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