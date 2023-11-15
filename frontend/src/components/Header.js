import React, { useEffect, useState } from 'react';
import { logout } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export default function Header ({userInfo}) {

    // const [showScreen, setShowScreen] = useState(false)
    const [firstName,setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        console.log('1');
        if (!userInfo) {
            console.log('hit');
            navigate('/login')
        } else {
            setFirstName(userInfo.first_name)
            setLastName(userInfo.last_name)
        }
    },[userInfo])

    if (!userInfo) {
        console.log('ITS NULL');
    }

    const logoutHandler = () => {        
        dispatch(logout())
        window.location.reload(true)
    }
    
    return (
        <div className='header-user'>
            <div className='header-title'>
                <h5>GRIP IT & RIP IT</h5>
            </div>
            <div className='header-admin-user-container'>
                <p className='header-admin-user'>{firstName} {lastName}</p>
                <div>                    
                    <p onClick={logoutHandler}>Sign Out</p>                        
                </div>
            </div>                  
        </div>
    )
}

