import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonLargeSquare({link, buttonText}) {
    return (
        <div className='button-large-square'>
            <Link className='button-large-square-link' to={link}>
                <button>{buttonText}</button>                 
            </Link>

        </div>
    )
}