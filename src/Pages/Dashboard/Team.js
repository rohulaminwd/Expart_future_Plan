import { Button, CopyButton } from '@mantine/core';
import React from 'react';
import { AiOutlineUsergroupAdd } from 'react-icons/ai'

const Team = () => {
    return (
        <div className='w-full p-2 sm:py-3 sm:px-0'>
            <div className='flex justify-between gap-3 sm:gap-5 items-center'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer hover:-translate-y-1 duration-300 shadow-md text-gray-700 bg-white rounded-md'>
                    <h3 className='text-2xl font-bold text-center sm:text-4xl'>145</h3>
                    <h2 className='text-[16px] text-center text-gray-600 sm:text-2xl'>Team size</h2>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer hover:-translate-y-1 duration-300 shadow-md text-gray-700 bg-white rounded-md'>
                    <h3 className='text-2xl font-bold text-center sm:text-4xl'>12</h3>
                    <h2 className='text-[16px] text-center text-gray-600 sm:text-2xl'>Team Investment</h2>
                </div>
            </div>
            <div className='flex justify-between gap-3 sm:gap-5 mt-3 sm:mt-5 items-center'>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer hover:-translate-y-1 duration-300 shadow-md text-gray-700 bg-white rounded-md'>
                    <h3 className='text-2xl font-bold text-center sm:text-4xl'>22</h3>
                    <h2 className='text-[16px] text-center text-gray-600 sm:text-2xl'>tody commission</h2>
                </div>
                <div className='p-2 sm:p-3 w-full text-center cursor-pointer hover:-translate-y-1 duration-300 shadow-md text-gray-700 bg-white rounded-md'>
                    <h3 className='text-2xl font-bold text-center sm:text-4xl'>152</h3>
                    <h2 className='text-[16px] text-center text-gray-600 sm:text-2xl'>Team commission</h2>
                </div>
            </div>
            <div className='p-3 w-full gap-2 flex items-center justify-center mt-5 text-center cursor-pointer hover:-translate-y-1 duration-300 shadow-md text-gray-700 bg-white rounded-md'>
                <h2 className='text-[20px] text-center text-gray-600 sm:text-2xl'>Team Investment:</h2>
                <h3 className='text-2xl font-bold text-center sm:text-3xl'>2</h3>
            </div>
            <div className='mt-5'>
                <div className='text-center text-gray-800 p-3 sm:p-5 shadow-md rounded-lg bg-white'>
                    <div className='flex items-center text-6xl sm:text-8xl text-[#174e78] justify-center'><AiOutlineUsergroupAdd /></div>
                    <h2 className='text-xl sm:text-3xl'>বোন্ধুকে এই এপে রেফার করুন</h2>
                    <p className='text-[12px] sm:text-[16px] mx-auto mt-2 sm:mt-3 sm:w-[60%] text-gray-700'>এই রেফার লিংক/কোড ব্যাবহার করে আপনার বন্ধুকে এই আপে আমন্ত্রন জানান। প্রতি সকল রেফারে আপনি পাবেন দারুন অফার।</p>
                    <div className='flex mx-auto rounded-lg sm:mt-5 mt-2 gap-2 sm:gap-3 max-w-[500px] items-center'>
                        <div className='p-1 sm:p-2 border shadow-md w-full rounded-md'>
                            <p className='max-w-[300px]'>https://expartfutureplan.com</p>
                        </div>
                        <div className=''>
                            <CopyButton value="https://expartfutureplan.com">
                                {({ copied, copy }) => (
                                    <Button className={`${copied ? 'bg-[#177865]' : 'bg-[#174e78]'}`} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </div>
                    </div>
                    <div className='flex mx-auto rounded-lg mt-2 sm:mt-5 mb-3 gap-2 sm:gap-3 max-w-[500px] items-center'>
                        <div className='p-1 sm:p-2 border shadow-md w-full rounded-md'>
                            <p className='font-bold text-xl'>7526CV27</p>
                        </div>
                        <div className=''>
                            <CopyButton value="7526CV27">
                                {({ copied, copy }) => (
                                    <Button className={`${copied ? 'bg-[#177865]' : 'bg-[#174e78]'}`} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Team;