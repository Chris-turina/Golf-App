import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap'

function ScoreCardDisplay({ round, roundStats, stats}) {
    
    const [eightteenHoleCourse, setEightteenHoleCourse] = useState(false)
    const [nineHoleCourse, setNineHoleCourse] = useState(false)

    const [frontNine,setFrontNine] = useState( [] )
    const [backNine, setBackNine] = useState( [] )

    const [yardsOut, setYardsOut] = useState(0)
    const [yardsIn, setYardsIn] = useState(0)

    const [parOut, setParOut] = useState(0)
    const [parIn, setParIn] = useState(0)

    const [scoreOut, setScoreOut] = useState(0)
    const [scoreIn, setScoreIn] = useState(0)

    const [puttsOut, setPuttsOut] = useState(0)
    const [puttsIn, setPuttsIn] = useState(0)
    
console.log(roundStats);
    useEffect(() => {
        if (round.holeScores.length === 18) {
            const frontNineArr = round.holeScores.slice(0,9)
            const backNineArr = round.holeScores.slice(9,18)
            setFrontNine(frontNineArr)
            setBackNine(backNineArr)
            setEightteenHoleCourse(true)
        } else if (round.holeScores.length === 9) {
            setNineHoleCourse(true)
        }

        

    }, [])

    console.log(eightteenHoleCourse);
    console.log(nineHoleCourse);
    
    
    return (
        <div>
            <Table responsive bordered className='table-light'>                
                <tbody>
                    <tr  className='table-success'>
                        <th>Hole</th>                        
                        {frontNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.hole}</td>
                        ))}

                        {eightteenHoleCourse && <td>OUT</td>}
                        {nineHoleCourse && <td>IN</td>}                                                

                        {backNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.hole}</td>
                        ))}    
                        <td>IN</td>                    
                        <td>TOTAL</td>
                    </tr>
                    <tr>
                        <th>{round.teeColorUsed}</th>
                        {frontNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.tee}</td>
                        ))}
                        <td>{roundStats.yards_out}</td>
                        {backNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.tee}</td>
                        ))}
                        <td>{roundStats.yards_in}</td>
                        <td>{roundStats.totalDistance}</td>
                    </tr>
                    <tr>
                        <th>Par</th>
                        {frontNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.par}</td>
                        ))}
                        <td>{roundStats.par_out}</td>
                        {backNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.par}</td>
                        ))}
                        <td>{roundStats.par_in}</td>
                        <td>{roundStats.totalCoursePar}</td>
                    </tr>
                    <tr className='table-dark'>
                        <th>Score</th>
                        {frontNine.map((holeStat, i) => (                            
                            <td className='score-card-strokes' key={i}>{holeStat.strokes}</td>
                        ))}
                        <td>{roundStats.score_out}</td>
                        {backNine.map((holeStat, i) => (                            
                            <td className='score-card-strokes' key={i}>{holeStat.strokes}</td>
                        ))}
                        <td>{roundStats.score_in}</td>
                        <td>{roundStats.totalStrokes}</td>
                    </tr>
                    <tr>
                        <th>Putts</th>
                        {frontNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.putts}</td>
                        ))}
                        <td>{roundStats.putts_out}</td>
                        {backNine.map((holeStat, i) => (
                            <td key={i}>{holeStat.putts}</td>
                        ))}
                        <td>{roundStats.putts_in}</td>
                        <td>{roundStats.totalPutts}</td>
                    </tr>
                </tbody>      
            </Table>
        </div>
    )
}

export default ScoreCardDisplay