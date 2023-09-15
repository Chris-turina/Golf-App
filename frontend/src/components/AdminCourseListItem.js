import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AdminCourseListItem({ header, id, name, itemStyle, deleteCourse }) {

    const [applyHeaderStyle, setApplyHeaderStyle] = useState('is-header')
    const [applyBodyStyle, setApplyBodyStyle] = useState('is-body')

    if ( itemStyle === 'header') {
        itemStyle = applyHeaderStyle        
    } else if ( itemStyle === 'body') {
        itemStyle = applyBodyStyle
    }

    const deleteHandler = (id) => {
        deleteCourse(id)
    }


    return (
        <div to={`/admin/golf_courses/${id}`} className={`admin-course-list-item-container ${itemStyle}`}>
            <div>
                <p>{id}</p>
            </div>

            <div>
                <p>{name}</p>
            </div>
      
            <div>
                <button variant='danger' className='btn-sm'onClick={() => deleteHandler(id)} >
                    <i className='fas fa-trash'></i>
                </button>    
            </div>            

        </div>
    )
}