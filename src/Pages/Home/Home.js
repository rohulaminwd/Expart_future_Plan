import React from 'react';
import './home.css'
import Footer from '../../Share/Footer';
import Navbar from '../../Share/Navbar';
import Banner from './Banner';
import Statistics from './Statistics';
import Review from './Review';
import Brands from './Brands';
import OurTeam from './OurTeam';
import PlanHome from './PlanHome';

const Home = () => {
    return (
        <div className='w-full relative bg-[#d7ebe4]'>
            <Navbar />
            <Banner />
            <div className='w-full max-w-7xl mx-auto'>
                <PlanHome />
                <OurTeam />
                <Statistics />
                <Brands />
                <Review />
            </div>
            <Footer />
        </div>
    );
};

export default Home;