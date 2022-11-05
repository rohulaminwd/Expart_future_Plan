import React from 'react';
import notice1 from '../../assets/images/plan-notice (1).jpg'
import notice2 from '../../assets/images/plan-notice (2).jpg'
import notice3 from '../../assets/images/plan-notice (3).jpg'
import notice4 from '../../assets/images/plan-notice (4).jpg'
import notice5 from '../../assets/images/plan-notice (5).jpg'

const WorkAbout = () => {
    return (
        <div className='w-full p-2 sm:py-3 sm:px-0'>
            <h1 className='text-xl border-[3px] border-[#6182c9] uppercase bg-[#2d4069] text-center p-3 rounded-md shadow-md font-bold text-white'>Important Information</h1>
            <div className='mt-4 sm:mt-8 w-full shadow-md rounded-md'>
                <img src={notice4} className="w-full rounded-lg" alt="" />
            </div>
            <div className='mt-4 sm:mt-8 w-full shadow-md rounded-md'>
                <img src={notice1} className="w-full rounded-lg" alt="" />
            </div>
            <div className='mt-4 sm:mt-8 w-full shadow-md rounded-md'>
                <img src={notice5} className="w-full rounded-lg" alt="" />
            </div>
            <div className='mt-4 sm:mt-8 w-full shadow-md rounded-md'>
                <img src={notice2} className="w-full rounded-lg" alt="" />
            </div>
            <div className='mt-4 sm:mt-8 w-full shadow-md rounded-md'>
                <img src={notice3} className="w-full rounded-lg" alt="" />
            </div>
        </div>
    );
};

export default WorkAbout;