import React, { useEffect } from 'react';
// import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function Header ({userInfo}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
            
        }
    },[userInfo])

    // const logoutHandler = () => {        
    //     dispatch(logout())
    // }
    
    return (
        <div className='header-user'>
            <div className='header-title'>
                <h5>GRIP IT & RIP IT</h5>
            </div>
            <div className='header-user-container'>
                <p>{userInfo.first_name} {userInfo.last_name}</p>   
                
            </div>            
            {/* <div>
                <p>Sign Out</p>
            </div> */}
        </div>
    )
}

