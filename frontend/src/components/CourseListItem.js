import React from 'react'
import { Link } from 'react-router-dom'

export default function CourseListItem({ golfCourse }) {

    return (
        <div className='course-list-item'>
            <i className="fa-regular fa-star fa-xl"></i>
            <Link className='course-list-item-link' to={`/golfcourses/${golfCourse.course_id}`}>
                <h3>{golfCourse.name}</h3>
            </Link>        
            
            
        </div>
    )
}