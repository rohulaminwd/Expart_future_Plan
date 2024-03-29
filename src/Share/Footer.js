import React from 'react';
import banner from '../assets/images/banks.jpg'
import logo from '../assets/images/logo1.png'

const Footer = () => {
    return (
        <div className='w-full h-full bg-[#111f3b]'>
            <div style={{ backgroundImage: `url(${banner})` }} className='w-full bg-cover h-[350px] relative'>
                <div className='absolute p-10 top-0 left-0 w-full h-full text-center bg-[#16243fc7]'>
                    <h1 className="text-2xl sm:text-3xl mt-10 md:text-4xl text-white font-bold">Join Our News Letter</h1>
                    <div className='flex items-center justify-center mt-24'>
                        <div class="form-control">
                            <label class="input-group">
                                <input type="text" placeholder="info@site.com" class="input bg-transparent w-[200px] md:w-[400px] text-white font-bold border-white input-bordered" />
                                <span className='cursor-pointer px-10 font-bold text-[#111f3b]'>Email</span>
                            </label>
                            <label class="label">
                                <span class="label-text">Your Email</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center mt-5'>
                <img src={logo} className='w-[100px] mx-auto' alt="logo" />
            </div>
            <div className='w-full max-w-7xl mx-auto grid grid-clos-1 sm:grid-cols-2 pb-16 pt-5 text-white px-4 gap-5'>
                <div className='text-center sm:text-left'>
                    <h1 className="text-2xl sm:text-3xl my-5 md:text-4xl text-white font-bold">Expert Future Plan USA</h1>
                    <p>Visit our website and create an account. We have tried our best and have been offering a good quality high speed website for a long time. Because we have a small business plan.</p>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='mx-auto'>
                        <ul>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>Home</li>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>About</li>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>Contact</li>
                        </ul>
                    </div>
                    <div className='mx-auto'>
                        <ul>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>Testimonial</li>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>Our Team</li>
                            <li className='cursor-pointer hover:text-green-500 duration-200 my-2 hover:translate-x-2'>Contact</li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className='text-white py-3 text-center'>{(new Date().getFullYear())} &copy; Expert Future Plan USA</p>
        </div>
    );
};

export default Footer;