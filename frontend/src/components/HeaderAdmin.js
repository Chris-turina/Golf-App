import React from 'react'
import { Link } from 'react-router-dom';

export default function HeaderAdmin({userInfo}) {
    return (
        <div className='header-admin'>
            <div className='header-admin-title'>
                <h5>GRIP IT & RIP IT - ADMIN PANEL</h5>
            </div>
            <div className='header-admin-user-container'>
                <p className='header-admin-user'>{userInfo.first_name} {userInfo.last_name}</p>
                <div>
                    <Link to={`/`}>
                        <p>Exit Admin</p>    
                    </Link>
                </div>
            </div>
        </div>
    )
}