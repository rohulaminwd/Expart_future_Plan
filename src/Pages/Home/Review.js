import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from "swiper";
import {BsStarFill} from 'react-icons/bs'
import {ImQuotesLeft} from 'react-icons/im'

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Review = () => {
    const reviews = [
        {
            name: 'Rohul Amin', 
            comment: "This is the nice quality full website choose this website link",
            star: [1, 2, 3, 4]
        },
        {
            name: 'Rohul Amin', 
            comment: "This is the nice quality full website choose this website link",
            star: [1, 2, 3,]
        },
        {
            name: 'Rohul Amin', 
            comment: "This is the nice quality full website choose this website link",
            star: [1, 2, 3, 5]
        },
        {
            name: 'Rohul Amin', 
            comment: "This is the nice quality full website choose this website link",
            star: [1, 2, 3,]
        },
        {
            name: 'Rohul Amin', 
            comment: "This is the nice quality full website choose this website link",
            star: [1, 2, 3, 5]
        },
    ]
    return (
        <div className='py-8'>
            <div>
                <h1 className='text-center font-bold my-5 text-5xl'>Reviews</h1>
            </div>
            <Swiper
                // slidesPerView={3}
                modules={[Pagination]}
                className="mySwiper"
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                    },
                    868: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {
                    reviews?.map((review, index) => (
                        <div key={index}>
                            <SwiperSlide className=''>
                                <div className='p-4' data-aos="zoom-in-down" data-aos-delay="100" data-aos-duration="800">
                                    <div className="card p-3 bg-base-100 text-start h-full border hover:border-primary hover:shadow-md hover:translate-y-[-5px] transition border-blue-800">
                                        <div className='text-3xl font-bold text-primary'><ImQuotesLeft /></div>
                                        <p className='my-2'>{review?.comment.slice(0, 80)}...</p>
                                        <div className="flex items-center justify-between">
                                            <div className="">
                                                <h2 className="text-xl text-primary font-bold my-0">{review?.name}</h2>
                                                <div className="flex ">
                                                    {review?.star.map( (index) => <div key={index} className='mx-1 flex font-bold text-xl text-primary'> <BsStarFill /> </div>  )}  
                                                </div>
                                            </div>
                                            <div className="">
                                                <div className="avatar">
                                                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        <img src="https://api.lorem.space/image/face?hash=3174" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </div>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Review;