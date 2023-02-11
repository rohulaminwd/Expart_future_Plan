import React from 'react';
import { Link } from 'react-router-dom';
import banner from '../../assets/images/banner9.jpg'

const Banner = () => {
    const usertoken = localStorage.getItem('accessToken')
    return (
        <div style={{ backgroundImage: `url(${banner})` }} className="w-full relative pt-16 h-[450px] md:h-screen bg-cover ">
            <div className="text-center top-0 left-0 w-full flex items-center px-2 h-full absolute bg-[#192949b3]">
                <div className='my-auto w-full ox-hidden'>
                    <h1 className="text-2xl oswald sm:text-3xl md:text-5xl sm:mb-5 mb-3 text-primary font-bold"  data-aos="zoom-in-right" data-aos-delay="300" data-aos-duration="800">Welcome To</h1>
                    <h1 className="text-4xl px-4 sm:px-0 uppercase oswald sm:text-5xl md:text-8xl text-white font-bold"  data-aos="zoom-in-right" data-aos-delay="300" data-aos-duration="800">Expert Future Plan USA</h1>
                    <p className="my-2 text-white  lg:my-8 mx-auto  sm:w-1/2"  data-aos="zoom-in-right" data-aos-delay="500" data-aos-duration="800">Thank you very much for visiting our website. How do you create an account? If you don't have an account open then click on register and create an account  for you then click on login option to login and visit our website  and start working with the plan you like..</p>
                    <div className='max-w-[500px] flex gap-5 items-center mx-auto border-[5px] bg-[#26c4bf1e] border-[#26c4bf56] outline-[10px] outline-[#b4f5f3] p-4 sm:p-8'>
                        {!usertoken && 
                         <>
                            <div className='w-full'>
                                <Link to='/signUp' className="btn btn-outline border-[3px] hover:border-0 hover:shadow-md hover:shadow-[#c5f3f2] border-[#7ff3ef] w-full hover:bg-[#7ff3ef] hover:text-[#000] mr-5 font-bold text-[#7ff3ef] md:btn-md btn-sm"  data-aos="zoom-in-right" data-aos-delay="700" data-aos-duration="800">Register now</Link>
                            </div>
                            <div className='w-full'>
                                <Link to='/signIn' className="btn border-[3px] btn-secondary w-full font-bold hover:shadow-md hover:shadow-secondary text-white md:btn-md btn-sm"  data-aos="zoom-in-left" data-aos-delay="700" data-aos-duration="800">Login</Link>
                            </div>
                         </>
                        }
                        { usertoken && 
                        <div className='w-full'>
                            <Link to='/dashboard' className="btn border-[3px] btn-primary rounded-[50px] w-full font-bold hover:shadow-md hover:shadow-primary text-white md:btn-lg btn-md"  data-aos="zoom-in-left" data-aos-delay="700" data-aos-duration="800">Start Now</Link>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;