import React from 'react'

function StatCard({ title, value }) {
    return (
        <div className='stat-card'>
            <h5>{title}</h5>
            <hr />
            <h3>{value}</h3>
        </div>
    )
}

export default StatCard