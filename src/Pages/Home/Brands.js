import React from 'react';
import brand1 from '../../assets/images/Facebook-2019.jpg'
import brand2 from '../../assets/images/youtube.jpg'
import brand3 from '../../assets/images/tik-tok.png'
import brand4 from '../../assets/images/data-entry.jfif'
import brand5 from '../../assets/images/instagram.png'

const Brands = () => {
    const brands = [{img: brand1}, {img: brand2}, {img: brand3}, {img: brand4}, {img: brand5}]
    return (
        <div className='py-8 px-4'>
            <h1 className='text-center font-bold my-5 text-5xl'>Our Brands</h1>
            <div className='mt-12 brand-container'>
                {
                    brands?.map((i, index) => <>
                        <div
                         className='w-full border hover:shadow-lg cursor-pointer duration-300 hover:-translate-y-1'
                         data-aos="zoom-in-up" data-aos-delay="100" data-aos-duration="800"
                        >
                            <img src={i.img} className='w-full h-full' alt="brands" />
                        </div>
                    </> )
                }
            </div>
        </div>
    );
};

export default Brands;