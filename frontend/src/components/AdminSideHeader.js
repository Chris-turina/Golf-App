import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AdminSideHeader({ page }) {
    const [inactive, setInactive] = useState('admin-side-header-inactive')
    const [active, setActive] = useState('admin-side-header-active')

    let users = ''
    let golfCourses = ''
    let leauges = ''

    if (page === 'users') {
        users = active
        golfCourses = inactive
        leauges = inactive
    } else if (page === 'golf-courses'){
        users = inactive
        golfCourses = active
        leauges = inactive
    } else if ( page === 'leauges') {
        users = inactive
        golfCourses = inactive
        leauges = active
    } else {
        users = inactive
        golfCourses = inactive
        leauges = inactive
    }

    return (
        <div className='admin-side-header'>
            <Link to={`/admin/users/`} className='admin-side-header-link'>
                <div className={`admin-side-header-button ${users}`}>
                    <p>Users</p>
                </div>
            </Link>

            <Link to={`/admin/golf_courses/`} className='admin-side-header-link'>
                <div className={`admin-side-header-button ${golfCourses}`}>
                    <p>Golf Courses</p>
                </div>
            </Link>

            <Link to={`/admin/users/`} className='admin-side-header-link'>
                <div className={`admin-side-header-button ${leauges}`}>
                    <p>Leauges</p>
                </div>
            </Link>
        </div>
    )
}