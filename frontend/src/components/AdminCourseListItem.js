import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminCourseListItem({ header, id, name, holes, itemStyle, headerStyle }) {
    return (
        <div to={`/admin/golf_courses/${id}`} className={`admin-course-list-item-container ${headerStyle}`}>
            <div>
                <p>{id}</p>
            </div>

            <div>
                <p>{name}</p>
            </div>

            <div>
                <p>{holes}</p>
            </div>                        

        </div>
    )
}