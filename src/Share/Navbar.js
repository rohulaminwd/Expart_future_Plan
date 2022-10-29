import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';
import auth from '../firebase.init';
import { AiOutlineHome } from 'react-icons/ai'
import { FaBlogger } from 'react-icons/fa'
import { MdOutlineDashboard } from 'react-icons/md'
import {BiMessageSquareDetail} from 'react-icons/bi'
import profile from '../assets/images/rohul.png'

const Navbar = ({userClass}) => {
    const [user, loading, error] = useAuthState(auth);

    const logOut = () => {
        signOut(auth)
        localStorage.removeItem('accessToken');
    }

    if(window.scrollY > 200){
      console.log('scroll')
    }

    const menuItems = <>
        <li className='mx-1'>
            <NavLink to='/' 
                className={({ isActive }) =>
                isActive ? 'bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3' : 'px-1 rounded-none mx-1 sm:mx-3 text-white'
              }
             >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold fontSize text-[18px] sm:hidden flex justify-center'><AiOutlineHome /></div>
                    <span className='ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm'>Home</span>
                </div>
            </NavLink>
        </li>
        <li className='mx-1'>
            <NavLink to='/about' 
                className={({ isActive }) =>
                isActive ? 'bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3' : 'px-1 rounded-none mx-1 sm:mx-3 text-white'
             }
            >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold fontSize text-[18px] sm:hidden flex justify-center'><BiMessageSquareDetail /></div>
                    <span className='ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm'>About</span>
                </div>
            </NavLink>
        </li>
        <li className='mx-1'>
            <NavLink to='/blog'
                className={({ isActive }) =>
                isActive ? 'bg-transparent border-b-2 border-primary text-primary px-1 rounded-none mx-1 sm:mx-3' : 'px-1 rounded-none mx-1 sm:mx-3 text-white'
              }
             >
                <div className='sm:flex justify-center sm:items-center'>
                    <div className='font-bold fontSize text-[18px] sm:hidden flex justify-center'><FaBlogger /></div>
                    <span className='ml-1 mt-0 sm:block hidden hide-p sm:text-[18px] text-sm'>Blog</span>
                </div>
            </NavLink>
        </li>
    </>

    const ProfileItems = <>
        <li className='pl-2 ml-0 list-none'>
          {
              user?
              <div className="dropdown p-0 dropdown-end">
                    <label tabindex="0" className="btn btn-ghost btn-circle online avatar">
                        <div className="w-8 sm:w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                         { userClass?.image? <img src={userClass?.image} alt='profile' /> : <img src={profile} alt='profile' />}
                        </div>
                    </label>
                    <ul tabindex="0" className="p-2 shadow-md border text-cyan-800 border-blue-200 top-[60px] menu menu-compact dropdown-content bg-base-100 rounded-box w-48">
                        <div className="text-center border-b-2 border-blue-200 mb-3">
                            <div className="avatar online">
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                 { userClass?.image? <img src={userClass?.image} alt='profile' /> : <img src={profile} alt='profile' />}
                                </div>
                            </div>
                            <h1 className='mb-2 text-blue-900'>{userClass?.name}</h1>
                        </div>
                        <li className='mx-1'>
                            <NavLink className='' to='/dashboard' >
                                <div className='sm:flex justify-center sm:items-center'>
                                    <div className='font-bold fontSize text-[18px] sm:block flex justify-center'><MdOutlineDashboard /></div>
                                    <span className='ml-1 mt-0 hide-p sm:text-[18px] text-sm'>Dashboard</span>
                                </div>
                            </NavLink>
                        </li>
                        <li><a>Update Profile</a></li>
                        <li><a>Settings</a></li>
                        <li onClick={logOut}><a>Sign Out</a></li>
                    </ul>
                </div>
              :
              <li className='mx-1'>
                <NavLink className='' to='/signIn' >
                    <div className='sm:flex justify-center sm:items-center'>
                        <span className='ml-1 mt-0 block text-white sm:text-[18px] text-sm'>Login</span>
                    </div>
                </NavLink>
            </li>
          }
        </li>
    </>
    return (
        <div className={` ${(window.scrollY > 100)? "bg-[#111f3bad]" : "bg-[#111f3bad]"} fixed top-0 left-0 z-50 font-bold text-cyan-900 w-full`}>
            <div className="navbar px-xl max-w-7xl flex items-center justify-between mx-auto">
                <div className="">
                <h1 className='text-xl text-white uppercase font-bold'>E.F.p USA</h1>
                </div>
                <div className="">
                    <div className="flex">
                        <ul className="menu menu-horizontal font-bold p-0">
                            {menuItems}
                        </ul>
                    </div>
                </div>
                <div>
                {ProfileItems}
                </div>
            </div>
        </div>
    );
};

export default Navbar;