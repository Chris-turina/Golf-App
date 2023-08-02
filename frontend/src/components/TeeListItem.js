import React from 'react'
import { Link } from 'react-router-dom'

export default function TeeListItem({ golfCourse, teeColor }) {
    return (
        <div className='tee-list-item-container'>
            <Link state={{tee_color:teeColor, golf_course:golfCourse}}  to={`/golfcourses/${golfCourse.course_id}/scorecard`} className='tee-list-item-container-link'>
                <h3>{teeColor.colors}</h3>
            </Link>
            
            <p>{teeColor.total_yards} yds</p>
        </div>
    )
}