import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import { useForm } from "react-hook-form";
import Loading from '../../Share/Loading';
import { Link, useNavigate } from 'react-router-dom';
import signInBg from '../../assets/images/signIn-bg.jpg'
import { AiOutlineGoogle, AiFillApple, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'

const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [updateProfile, updating, updateeError] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const navigate = useNavigate()  
    let signInError;  

    if(loading || gLoading || updating){
        return <Loading></Loading>
    }

    if(error || gError || updateeError){
        signInError = <p className='text-red-500 mb-2'><small>{error?.message || gError?.message || updateeError.message}</small></p>
    }

    if(user || gUser){
        navigate('/dashboard')
    }
    

    const onSubmit = async data => {
        // console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.firstName});
        console.log('update name done', data);
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
                                        type="firstName" 
                                        placeholder="First Name" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("name", {
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
                                    {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    {errors.name?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    </label>
                                </div>
                                <div className="form-control w-full">
                                    <input 
                                        type="lastName" 
                                        placeholder="Last Name" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("name", {
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
                                        type="ConformPassword" 
                                        placeholder="Conform password" 
                                        className="input input-bordered input-success w-full" 
                                        {...register("password", {
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
                                    {errors.ConformPassword?.type === 'required' && <span className="label-text-alt text-red-500">{errors.ConformPassword.message}</span>}
                                    {errors.ConformPassword?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.ConformPassword.message}</span>}
                                    </label>
                                </div>
                            </div>
                            {signInError}
                            <input className='btn w-full text-white uppercase font-bold bg-gradient-to-r from-[#2091d9] to-[#13b38f] hover:from-[#13b38f] hover:to-[#2091d9] duration-300 border-0' type="submit" value="Create Account"  />
                        </form>
                        <div className="divider">OR</div>
                        <div className='flex items-center justify-around'>
                            <div onClick={() => signInWithGoogle()} className='border hover:border-primary cursor-pointer hover:text-primary rounded-lg p-2'>
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