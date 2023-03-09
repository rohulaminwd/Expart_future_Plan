import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

const ProfileInformation = ({user, present, meLoading, absent, setAttendanceToday}) => {



    return (
        <div className='w-full border bg-[#e3f5ff]  shadow-md !z-[900] rounded-2xl sm:p-3 p-2'>
            <div className='flex justify-between w-full gap-2'>
                { ((user?.role === "student") || (user?.role === "teacher")) &&
                <div className='p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg'>
                    <div className='w-8 sm:w-12'>
                        {/* <img src={daimon} className='w-full' alt="" /> */}
                    </div>
                    <div>
                        <h3 className='text-secondary font-bold sm:text-3xl'>{user?.gam}</h3>
                        <p className='text-sm'>Gam</p>
                    </div>
                </div>
                }

                { (user?.role === "admin") &&
                <Link to='/dashboard/applyUser' className='w-full'>
                    <div className='p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg'>
                        <div className='w-6 sm:w-12'>
                            {/* <img src={userAply} className='w-full' alt="" /> */}
                        </div>
                        <div>
                            <h3 className='text-secondary font-bold sm:text-3xl'>55</h3>
                            <p className='text-xs sm:text-sm'>Aply Users</p>
                        </div>
                    </div>
                </Link>
                }

                {(user?.role === "student") &&
                <div className='p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg'>
                    <div className='w-8 sm:w-12'>
                        {/* <img src={attendance} className='w-full' alt="" /> */}
                    </div>
                    <div>
                        <h3 className='text-secondary font-bold sm:text-3xl'>{present?.length + " | " + absent?.length}</h3>
                        <p className='text-sm'>Attendance</p>
                    </div>
                </div>
                }

                {((user?.role === "admin") || (user?.role === "teacher")) &&
                <div className='p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg'>
                    <div className='w-6 sm:w-12'>
                        {/* <img src={attendance} className='w-full' alt="" /> */}
                    </div>
                    <div>
                        <div className='flex items-center gap-x-2'>
                            54
                        </div>
                        <p className='text-xs sm:text-sm'>Attendance</p>
                    </div>
                </div>
                }

                { (user?.role === "admin") &&
                <Link to='/dashboard/bulkSms' className='w-full'>
                    <div className='p-1 sm:p-2 w-full flex items-center gap-x-2 border bg-[#d2f8fb] border-[#b1f3fc] rounded-lg'>
                        <div className='w-6 sm:w-12'>
                            {/* <img src={sms} className='w-full' alt="" /> */}
                        </div>
                        <div>
                            <h3 className='text-secondary font-bold sm:text-3xl'>Sms</h3>
                            <p className='text-xs sm:text-sm'>Send Sms</p>
                        </div>
                    </div>
                </Link>
                }
               
            </div>
            <div className='flex gap-4 text-sm sm:text-md items-center mt-2 sm:mt-3 justify-between'>
                {!((user?.role === 'teacher') || (user?.role === 'admin')) && 
                <div className='w-full'>
                    <div className='flex py-1 sm:py-2 border-b border-[#d7b7fd] justify-between items-center'>
                        <h3 className=''>Class:</h3>
                        <h3 className=''>{user?.class}</h3>
                    </div>
                    <div className='flex py-1 sm:py-2 border-b border-[#d7b7fd] justify-between items-center'>
                        <h3 className=''>Role No:</h3>
                        <h3 className=''>{user?.roleNo}</h3>
                    </div>
                </div>
                }
                <div className='w-full'>
                    <div className='flex py-1 sm:py-2 border-b border-[#d7b7fd] justify-between items-center'>
                        <h3 className=''>Role:</h3>
                        <h3 className=''>{user?.role}</h3>
                    </div>
                    <div className='flex py-1 sm:py-2 border-b border-[#d7b7fd] justify-between items-center'>
                        <h3 className=''>Gender:</h3>
                        <h3 className=''>{user?.gender}</h3>
                    </div>
                </div>
            </div>
            <div className='w-full text-sm sm:text-md border-b border-[#d7b7fd] sm:flex items-center justify-between gap-4'>
                <div className='flex w-full py-1 sm:py-2 sm:border-b-0 border-b border-[#d7b7fd] justify-between items-center'>
                    <h3 className=''>Phone Number:</h3>
                    <h3 className=''>{user?.phoneNumber}</h3>
                </div>
                <div className='flex w-full py-1 sm:py-2 justify-between items-center'>
                    <h3 className=''>Address:</h3>
                    <h3 className=''>{user?.address}</h3>
                </div>
            </div>
            { (user?.role === 'student') &&
            <div className='w-full border-b text-sm sm:text-md border-[#d7b7fd] sm:flex items-center justify-between gap-4'>
               { user?.fatherName && 
               <div className='flex w-full py-1 sm:py-2 sm:border-b-0 border-b border-[#d7b7fd] justify-between items-center'>
                    <h3 className=''>Father Name:</h3>
                    <h3 className=''>{user?.fatherName}</h3>
                </div>}
                <div className='flex w-full py-1 sm:py-2 justify-between items-center'>
                    <h3 className=''>Date of Birth:</h3>
                    <h3 className=''>{user?.age}</h3>
                </div>
            </div>
            }
            <div className='flex w-full py-1 text-sm sm:text-md sm:py-2 justify-between items-center'>
                <h3 className=''>Bio Date: {user?.bio}</h3>
            </div>
        </div>
    );
};

export default ProfileInformation;