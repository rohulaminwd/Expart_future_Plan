import { Button, CopyButton } from '@mantine/core';
import React, {useState, useContext } from 'react';
import taka from '../../assets/icons/taka (1).png'
import taka2 from '../../assets/icons/taka1 (2).png'
import taka3 from '../../assets/icons/taka1 (3).png'
import reffer from '../../assets/icons/refer.png'
import taka6 from '../../assets/icons/taka1 (1).png'
import { Context } from '../../App';
import Loading from '../../Share/Loading';
import { useQuery } from 'react-query';
import UserInfo from '../../Modale/UserInfo';

const Team = () => {
    const [me, loading] = useContext(Context);
    const referCode = me?.myReferralCode;
    const [userInfo, setUserInfo] = useState(null)

    const getFacts = async () => {
		const res = await fetch('https://efp-usa-server-site.vercel.app/api/v1/user');
		return res.json();
	};
	// Using the hook
	const {data, error, refetch, isLoading} = useQuery('allUsers', getFacts);

    const myReferralUser = data?.data?.filter(i => i?.referCode?.includes(referCode))

    if(isLoading || loading ){
        return <Loading></Loading>
    }
    return (
        <div className='w-full p-2 sm:py-3 sm:px-0'>
            <div className='flex justify-between gap-3 sm:gap-5 items-center'>
                <label onClick={() => setUserInfo(myReferralUser)} htmlFor='user-info' className='p-3 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm bg-[#fff] rounded-lg'>
                    <div className='w-12 sm:w-16 -ml-1'>
                        <img src={taka6} className='w-full' alt="taka" />
                    </div>
                    <div className=''>
                        <h3 className='font-bold sm:mb-1 sm:text-2xl'>{`0${myReferralUser?.length}`}</h3>
                        <h1 style={{lineHeight: '16px'}} className='text-[14px] text-[#727988] sm:text-xl'>Team Size</h1>
                    </div>
                </label>
                <div className='p-3 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm bg-[#fff] rounded-lg'>
                    <div className='w-12 sm:w-16 -ml-1'>
                        <img src={taka3} className='w-full' alt="taka" />
                    </div>
                    <div className=''>
                        <h3 className='font-bold sm:mb-1 sm:text-2xl'>120 ৳</h3>
                        <h1 style={{lineHeight: '16px'}} className='text-[14px] text-[#727988] sm:text-xl'>Team Investment</h1>
                    </div>
                </div>
            </div>
            <div className='flex justify-between gap-3 sm:gap-5 mt-3 sm:mt-5 items-center'>
                <div className='p-3 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm bg-[#fff] rounded-lg'>
                    <div className='w-12 sm:w-16 -ml-1'>
                        <img src={taka2} className='w-full' alt="taka" />
                    </div>
                    <div className=''>
                        <h3 className='font-bold sm:mb-1 sm:text-2xl'>120 ৳</h3>
                        <h1 style={{lineHeight: '16px'}} className='text-[14px] text-[#727988] sm:text-xl'>tody commission</h1>
                    </div>
                </div>
                <div className='p-3 gap-1 sm:p-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm bg-[#fff] rounded-lg'>
                    <div className='w-12 sm:w-16 -ml-1'>
                        <img src={taka} className='w-full' alt="taka" />
                    </div>
                    <div className=''>
                        <h3 className='font-bold sm:mb-1 sm:text-2xl'>120 ৳</h3>
                        <h1 style={{lineHeight: '16px'}} className='text-[14px] text-[#727988] sm:text-xl'>Team Investment</h1>
                    </div>
                </div>
            </div>
            <div className='p-3 gap-1 sm:p-4 mt-4 flex items-center sm:gap-2 w-full cursor-pointer hover:-translate-y-1 duration-300 shadow-sm bg-[#fff] rounded-lg'>
                <div className='w-12 sm:w-16 -ml-1'>
                    <img src={taka3} className='w-full' alt="taka" />
                </div>
                <div className=''>
                    <h3 className='font-bold text-xl sm:mb-1 sm:text-2xl'>120 ৳</h3>
                    <h1 style={{lineHeight: '16px'}} className='text-[16px] text-[#727988] sm:text-xl'>Team Investment</h1>
                </div>
            </div>
            <div className='mt-5'>
                <div className='text-center text-gray-800 p-3 py-5 sm:p-5 shadow-md rounded-lg bg-white'>
                <div className='w-full mb-5'>
                    <img src={reffer} className='w-[104px] mx-auto' alt="taka" />
                </div>
                    <h2 className='text-xl sm:text-3xl'>Invite Your Friends</h2>
                    <p className='text-[12px] sm:text-[16px] mx-auto mt-2 sm:mt-3 sm:w-[60%] text-gray-700'>Invite your friends by sharing this refer link and get bonus and </p>
                    <div className='flex mx-auto rounded-lg sm:mt-5 mt-2 gap-2 sm:gap-3 max-w-[500px] items-center'>
                        <div className='p-1 sm:p-2 border w-full rounded-md'>
                            <p className='max-w-[500px] text-[12px]'>https://expart-future-plan.vercel.app/signUp?refer={referCode}</p>
                        </div>
                        <div className=''>
                            <CopyButton value={`https://expart-future-plan.vercel.app/signUp?refer=${referCode}`}>
                                {({ copied, copy }) => (
                                    <Button className={`${copied ? 'bg-[#177865]' : 'bg-[#174e78]'}`} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </div>
                    </div>
                    {/* <div className='flex mx-auto rounded-lg mt-2 sm:mt-5 mb-3 gap-2 sm:gap-3 max-w-[500px] items-center'>
                        <div className='p-1 sm:p-2 border shadow-md w-full rounded-md'>
                            <p className='font-bold text-xl'>7526CV27</p>
                        </div>
                        <div className=''>
                            <CopyButton value="7526CV27">
                                {({ copied, copy }) => (
                                    <Button className={`${copied ? 'bg-[#177865]' : 'bg-[#174e78]'}`} onClick={copy}>
                                    {copied ? 'Copied' : 'Copy'}
                                    </Button>
                                )}
                            </CopyButton>
                        </div>
                    </div> */}
                </div>
            </div>
            { userInfo &&
                <UserInfo
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                />
            }
        </div>
    );
};

export default Team;