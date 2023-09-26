import React, { useEffect, useState } from 'react'

export default function ScoreCardInputTable({ teeBox, holes, handleScoreSubmit }) {
    
    const [holesTeeData, setHolesTeeData] = useState([])
    const [showScoreCard, setShowScoreCard] = useState(false)

    useEffect(()=> {

        if (holesTeeData.length === 0) {
            setHolesTeeData(holes)
            setShowScoreCard(true)
        }
        
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        handleScoreSubmit(holesTeeData)
        
    }

    const handleStokesChange = (e, i) => {
        let data = [...holesTeeData]
        let currentHole = data[i]        
        if ('strokes' in currentHole === false) {
            currentHole['strokes'] = 0
        }
        currentHole[e.target.name] = parseInt(e.target.value)
        data[i] = currentHole
        setHolesTeeData(data)
    }

    // IF I ADD THE OPTION TO ADD PUTTS INPUT
    // const handlePuttsChange = (e,i) => {
    //     let data = [...holesTeeData]
    //     let currentHole = data[i]        
    //     if ('putts' in currentHole === false) {
    //         currentHole['putts'] = 0
    //     }
    //     currentHole[e.target.name] = parseInt(e.target.value)
    //     data[i] = currentHole
    //     setHolesTeeData(data)
    // }

    return (
        <div className='score-card-input-table-container'>
            {showScoreCard && 
                <form onSubmit={handleSubmit}>            
                    <table>
                        <thead>
                            <tr className=''>
                                <th>Hole:</th>
                                {holesTeeData.map(hole => (
                                    <th key={hole.id}>{hole.hole_number}</th>
                                ))}
                            </tr>                    
                        </thead>
                        <tbody>
                            <tr>
                                <th>STROKES</th>
                                {holesTeeData.map((holeScore, i) => (
                                    <td key={holeScore.id}>
                                        <input 
                                            name='strokes'
                                            type='number'
                                            value={holeScore.strokes || ''}
                                            onChange={e => handleStokesChange(e, i)}
                                        />
                                    </td>
                                ))}                            
                            </tr>
                            {/* <tr>
                            <th>PUTTS</th>
                                {holesTeeData.map((holeScore, i) => (
                                    <td key={holeScore.id}>
                                        <input 
                                            name='putts'
                                            type='number'
                                            value={holeScore.putts || ''}
                                            onChange={e => handlePuttsChange(e, i)}
                                        />
                                    </td>
                                ))}
                            </tr> */}
                        </tbody>
                    </table>
                    <div>
                        <button type='submit'>Save Score</button>
                    </div>
                </form>
            }
        </div>
    )
}