import React from 'react';
import { Link } from 'react-router-dom';
import aboutImg from '../../assets/images/aboutBanner.jpg'

const AboutBanner = () => {
    return (
        <div style={{ backgroundImage: `url(${aboutImg})` }} className="w-full relative pt-16 h-[450px] sm:h-[500px] bg-cover ">
            <div className="text-center px-3 top-0 left-0 w-full flex items-center h-full absolute bg-[#192949b3]">
                <div className='my-auto w-full ox-hidden'>
                    <h1 className="text-xl sm:text-4xl mb-2 sm:mb-5 md:text-6xl text-white font-bold"  data-aos="zoom-in-right" data-aos-delay="300" data-aos-duration="800">About Us</h1>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl capitalize text-white font-bold"  data-aos="zoom-in-right" data-aos-delay="300" data-aos-duration="800">If You can Dream it, You can do It</h1>
                    <p className="my-2 text-white lg:my-8 mx-auto sm:w-1/2"  data-aos="zoom-in-right" data-aos-delay="500" data-aos-duration="800">If you can dream it, you can do it.
We are not here to show dreams, we are coming to fulfill dreams. We are not here to cheat anyone or grab a large sum of money. We are all coming together to create a community to earn money for a long time and no one should face loss.
And it is sure that all those who will work here will be able to earn a good amount of money. And will work without fear and will create a big community. The company has a business plan  will implement it together...</p>
                    {/* <Link to='/signUp' className="btn btn-outline border-5 rounded-2xl btn-secondary mr-5 font-bold text-white md:btn-md btn-sm"  data-aos="zoom-in-right" data-aos-delay="700" data-aos-duration="800">Register now</Link>
                    <Link to='/signIn' className="btn btn-outline border-5 rounded-2xl btn-secondary font-bold text-white md:btn-md btn-sm"  data-aos="zoom-in-left" data-aos-delay="700" data-aos-duration="800">Sing In</Link> */}
                </div>
            </div>
        </div>
    );
};

export default AboutBanner;