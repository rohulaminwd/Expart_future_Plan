import React from 'react';
import plan from '../../assets/images/blog.jfif'

const PlanHome = () => {
    return (
        <div className='py-8 md:mt-20 px-4'>
            <div className='md:flex w-full  gap-5 justify-between items-center'>
                <div className='w-full'>
                    <h1 className='font-bold my-5 text-5xl'>Expert Future Plan</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt odio enim est ipsa quas! Cupiditate, molestias voluptate consequatur mollitia temporibus quos recusandae commodi, provident nisi amet, perspiciatis facere magni repellat?</p>
                    <button className='btn my-5 btn-primary btn-outline'>See More</button>
                </div>
                <div className='w-full'>
                    <img src={plan} className='w-full shadow-2xl' alt="plan" />
                </div>
            </div>

        </div>
    );
};

export default PlanHome;