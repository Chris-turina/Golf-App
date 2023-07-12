import React from 'react'

function ScoreCardHole({ hole }) {
    console.log(hole);
    return (
        <div className='score-card-hole'>
            <p>{hole.hole}</p>
            <p>{hole.par}</p>
            <p>{hole.strokes}</p>

        </div>
    )
}

export default ScoreCardHole