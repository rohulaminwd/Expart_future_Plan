import React from 'react';
import brand1 from '../../assets/images/brand1.jpg'
import brand2 from '../../assets/images/brand4.png'
import brand3 from '../../assets/images/brand5.png'
import brand4 from '../../assets/images/brand6.jfif'
import brand5 from '../../assets/images/brand7.webp'

const Brands = () => {
    const brands = [{img: brand1}, {img: brand2}, {img: brand3}, {img: brand4}, {img: brand5}]
    return (
        <div className='py-8 px-4'>
            <h1 className='text-center font-bold my-5 text-5xl'>Our Brands</h1>
            <div className='mt-12 brand-container'>
                {
                    brands?.map((i, index) => <>
                        <div className='w-full border border-primary hover:shadow-[#5bb5a27e] cursor-pointer duration-300 hover:-translate-y-1 hover:shadow-lg'>
                            <img src={i.img} alt="" />
                        </div>
                    </> )
                }
            </div>
        </div>
    );
};

export default Brands;