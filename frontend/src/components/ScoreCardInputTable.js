import React from 'react'

export default function ScoreCardInputTable({ teeBox, holes }) {

    return (
        <div className='score-card-input-table-container'>
            <form>            
                <table>
                    <thead>
                        <tr className=''>
                            <th>Hole:</th>
                            {teeBox.tees.map(tee => (
                                <th key={tee.id}>{tee.hole__number}</th>
                            ))}
                        </tr>                    
                        <tr>
                            <th>PAR:</th>
                            {holes.map(hole => (
                                <th key={hole.id}>{hole.par}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>SCORE</th>
                            {holes.map(hole => (
                                <td key={hole.id}>
                                    <input />
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button>Save Score</button>
                </div>
            </form>
        </div>
    )
}