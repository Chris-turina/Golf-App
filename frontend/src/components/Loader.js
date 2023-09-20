import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
    return (
        <Spinner
            animation='border'
            role='status'
            style={{
                height: '100px',
                width: '100px',
                margin: 'auto',
                display: 'block',
                position: 'fixed',
                top: '30%',
                left: '50%'
            }}
        >
            <span className='sr-only'></span>
        </Spinner>
    )
}

export default Loader