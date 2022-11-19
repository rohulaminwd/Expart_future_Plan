import React from 'react';
import bg1 from '../../assets/images/bg-small6.jpg'
import bg3 from '../../assets/images/bg-small3.jpg'

const AdminHome = () => {
    return (
        <div className='p-2 sm:p-0'>
            <div style={{ backgroundImage: `url(${bg1})` }} className="bg-cover sm:mt-5 rounded-2xl">
                <div className='text-center cursor-pointer sm:mt-3 px-3 py-8 sm:py-12 text-white rounded-2xl'>
                    <h2 className='text-4xl sm:text-6xl font-bold'>100.00 ৳</h2>
                    <p className='text-xl text-primary mt-2'>Total company Balance</p>
                </div>
            </div>
            <div className='flex items-center my-4 sm:my-6 justify-between gap-3 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#abf98d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#dbfbd7] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 12</h3>
                    <h1 className='text-[12px] sm:text-xl'>Yesterday Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#f98d8d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#f9eded] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 112</h3>
                    <h1 className='text-[12px] sm:text-xl'>Available Balance</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#abf98d] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#dbfbd7] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 78</h3>
                    <h1 className='text-[12px] sm:text-xl'>Today Income</h1>
                </div>
            </div>
            <div className='flex items-center my-4 justify-between gap-3 sm:gap-6'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Weekly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Monthly Income</h1>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer border-[3px] border-[#8df3f9] hover:-translate-y-1 duration-300 shadow-lg text-[#156c65] bg-[#c2f7f6] rounded-lg'>
                    <h3 className='text-xl sm:text-2xl'>$ 122</h3>
                    <h1 className='text-[12px] sm:text-xl'>Company Bunas</h1>
                </div>
            </div>
            <div className='flex items-center w-full my-4 justify-between gap-3 sm:gap-6'>
                <div className="bg-cover sm:mt-5 w-full bg-white rounded-md">
                    <div className='text-center cursor-pointer sm:mt-3 py-3 text-primary shadow-md rounded-md'>
                        <h2 className='text-xl sm:text-5xl font-bold'>100.00 ৳</h2>
                        <p className='text-[14px] sm:text-xl'>Total Users</p>
                    </div>
                </div>
                <div className="bg-cover w-full sm:mt-5 bg-white rounded-md">
                    <div className='text-center cursor-pointer sm:mt-3 py-3 shadow-md text-primary rounded-md'>
                        <h2 className='text-xl sm:text-5xl font-bold'>100.00 ৳</h2>
                        <p className='text-[14px] sm:text-xl'>Withdraw Request</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;