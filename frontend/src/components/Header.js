import React from 'react';



export default function Header ({userInfo}) {
    
    return (
        <div className='header-user'>
            <div className='header-title'>
                <h5>GRIP IT & RIP IT</h5>
            </div>
            <div className='header-user-container'>
                <p>{userInfo.first_name} {userInfo.last_name}</p>               
            </div>            
        </div>
    )
}

