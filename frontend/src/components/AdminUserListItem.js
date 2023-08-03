import React from 'react'

export default function AdminUserListItem({ id, username, firstName, lastName, admin, headerStyle}) {


    return (
        <div className={`admin-user-list-item-container ${headerStyle}`}>
            <div className='admin-user-list-item-small'>
                <p>{id}</p>
            </div>

            <div>
                <p>{username}</p>
            </div>

            <div>
                <p>{firstName}</p>
            </div>
            
            <div>
                <p>{lastName}</p>
            </div>
            
            <div className='admin-user-list-item-small'>
                {admin === 'ADMIN' && (
                    <p>{admin}</p>
                )}
                {admin === true && (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                )}
                {admin === false && (
                    <i className='fas fa-check' style={{ color: 'red' }}></i>
                )}
            </div>
            

        </div>
    )
}