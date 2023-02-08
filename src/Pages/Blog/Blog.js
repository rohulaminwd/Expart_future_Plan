import React from 'react';
import comingSoon from '../../assets/images/coming-soon.png'
import blog from '../../assets/images/blog1.webp'
import Navbar from '../../Share/Navbar';

const Blog = () => {
    return (
        <div className='relative'>
            <Navbar />
            <div style={{ backgroundImage: `url(${blog})` }} className='h-screen bg-cover w-full'>
            <div className='h-screen  flex items-center justify-center bg-[#111f3bae] w-full'>
                <div className="w-full mx-auto">
                    <h1 className='text-5xl text-primary my-8 uppercase text-center font-bold'>Coming soon This blog</h1>
                    <p className='sm:w-[540px] w-[300px] text-white mx-auto text-center'>We will soon provide our website apps for your convenience. Then we have a business plan and try to implement it. For this we need a big community, we will build a big community and implement business plan to get best profit and earn money for long time. Our USA team will fully support this. Don't be afraid everyone will work without fear.</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Blog;