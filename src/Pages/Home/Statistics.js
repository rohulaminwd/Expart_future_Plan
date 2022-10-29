import React from 'react';
import {AiOutlineClockCircle, AiOutlineArrowDown, AiOutlineArrowUp} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'

const Statistics = () => {
    return (
        <div className='py-8 pb-12 px-4'>
            <h1 className='text-center font-bold my-5 text-5xl'>Statistics</h1>
            <div className='mt-12 statistics-container'>
                <div className='py-10 pb-16 px-2 text-center text-white bg-[#111f3b]'>
                    <div className='flex justify-center text-primary font-bold text-7xl'><AiOutlineClockCircle /></div>
                    <h2 className='text-white font-bold my-3 text-3xl'>25424</h2>
                    <p className='text-gray-400'>Days online</p>
                </div>
                <div className='py-10 pb-16 px-2 text-center text-white bg-[#111f3b]'>
                    <div className='flex justify-center text-primary font-bold text-7xl'><BsPerson /></div>
                    <h2 className='text-white font-bold my-3 text-3xl'>123645</h2>
                    <p className='text-gray-400'>Total Accounts</p>
                </div>
                <div className='py-10 pb-16 px-2 text-center text-white bg-[#111f3b]'>
                    <div className='flex justify-center text-primary font-bold text-7xl'><AiOutlineArrowDown /></div>
                    <h2 className='text-white font-bold my-3 text-3xl'>$ 21852465</h2>
                    <p className='text-gray-400'>Total Deposits</p>
                </div>
                <div className='py-10 pb-16 px-2 text-center text-white bg-[#111f3b]'>
                    <div className='flex justify-center text-primary font-bold text-7xl'><AiOutlineArrowUp /></div>
                    <h2 className='text-white font-bold my-3 text-3xl'>$ 98450152465</h2>
                    <p className='text-gray-400'>Total Withdrawal</p>
                </div>
            </div>
        </div>
    );
};

export default Statistics;