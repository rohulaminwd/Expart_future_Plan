import React from 'react';
import team1 from '../../assets/images/Team1.jpg'
import team2 from '../../assets/images/team2.jpg'
import team3 from '../../assets/images/team3.jpg'

const OurTeam = () => {
    const teams = [{img: team1}, {img: team2}, {img: team3}]
    return (
        <div className='py-8 px-4'>
            <h1 className='text-center font-bold my-5 text-5xl'>Our teams</h1>
            <div className='mt-12 team-container'>
                {
                    teams?.map((i, index) => <>
                        <div className='w-full cursor-pointer duration-300 hover:-translate-y-1 hover:shadow-lg'>
                            <img src={i.img} alt="" />
                        </div>
                    </> )
                }
            </div>
        </div>
    );
};

export default OurTeam;