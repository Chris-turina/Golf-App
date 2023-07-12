import React from 'react';
import { Table } from 'react-bootstrap'

function ScoreCard({ round, frontNine, backNine }) {
    console.log(frontNine);
    console.log(backNine);
    
    return (
        <div>
            <Table bordered className='table-light'>                
                <tbody>
                    <tr  className='table-success'>
                        <th>Hole</th>                        
                        {round.holeScores.map((holeStat, i) => (
                            <td key={i}>{holeStat.hole}</td>
                        ))}

                    </tr>
                    <tr>
                        <th>{round.teeColorUsed}</th>
                        {round.holeScores.map((holeStat, i) => (
                            <td key={i}>{holeStat.tee}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Par</th>
                        {round.holeScores.map((holeStat, i) => (
                            <td key={i}>{holeStat.par}</td>
                        ))}
                    </tr>
                    <tr className='table-dark'>
                        <th>Score</th>
                        {round.holeScores.map((holeStat, i) => (                            
                            <td className='score-card-strokes' key={i}>{holeStat.strokes}</td>
                        ))}
                    </tr>
                    <tr>
                        <th>Putts</th>
                        {round.holeScores.map((holeStat, i) => (
                            <td key={i}>{holeStat.putts}</td>
                        ))}
                    </tr>
                </tbody>      
            </Table>
        </div>
    )
}

export default ScoreCard