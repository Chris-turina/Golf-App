import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminListItem({ title, link }) {
    return (
        <div className='admin-list-item'>
            <Link to={`/admin/${link}`} className='admin-list-item-container-link'>
                <h3>{title}</h3>
            </Link>
            
        </div>
    )
}