import React from 'react';
import comingSoon from '../../assets/images/coming-soon.png'
import blog from '../../assets/images/blog1.webp'
import Navbar from '../../Share/Navbar';

const Blog = () => {
    return (
        <div style={{ backgroundImage: `url(${blog})` }} className='h-screen bg-cover w-full'>
            <div className='h-screen  flex items-center justify-center bg-[#111f3bae] w-full'>
                <Navbar />
                <div className="w-full mx-auto">
                    <h1 className='text-5xl text-primary my-8 uppercase text-center font-bold'>Coming soon This blog</h1>
                    <p className='sm:w-[540px] w-[300px] text-white mx-auto text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eveniet quae a tempore unde culpa, quasi quia debitis accusantium nemo est ex ipsa obcaecati, dicta esse, nisi aliquam totam aut.</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;