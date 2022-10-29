import React from 'react';
import Footer from '../../Share/Footer';
import Navbar from '../../Share/Navbar';
import OurTeam from '../Home/OurTeam';
import PlanHome from '../Home/PlanHome';
import Review from '../Home/Review';
import Statistics from '../Home/Statistics';
import AboutBanner from './AboutBanner';

const About = () => {
    return (
        <div className='w-full'>
            <Navbar />
            <AboutBanner />
            <div className='w-full max-w-7xl mx-auto'>
                <PlanHome />
                <OurTeam />
                <Review />
            </div>
            <Footer />
        </div>
    );
};

export default About;