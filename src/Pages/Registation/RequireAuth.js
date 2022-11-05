import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../Share/Loading';

const RequireAuth = ({children}) => {
    const location = useLocation();
    const usertoken = localStorage.getItem('accessToken')
    
    // if(loading){
    //     return <Loading />
    // }

    if(!usertoken){
        return <Navigate to='/signIn' state={{ from: location }} replace ></Navigate>
    }
    return children;
};

export default RequireAuth;