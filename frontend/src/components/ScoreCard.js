import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function ScoreCard({ holes, teeUsed, teeUsedId }) {
    const [frontNine, setFrontNine] = useState( [] )
    const [backNine, setBackNine] = useState( [] )
    const [editFrontNineArr, setEditFrontNineArr] = useState( [] )
    const [editBackNineArr, setEditBackNineArr] = useState( [] )
    const [editFrontNinePuttsArr, setEditFrontNinePuttsArr] = useState( [] )
    const [editBackNinePuttsArr, setEditBackNinePuttsArr] = useState( [] )
    const [teesPlayed, setTeesPlayed] = useState([])


    

    useEffect(() => {

        const setScoreCardState = async () => {                   
            const teesPlayedArr = []            
            for (let i = 0; i < holes.length; i++) {
                const hole = holes[i];                
                // Finds which tee is being used
                const selectedTee = hole.tees.find(tee => tee.color == teeUsed)
                // removes all the other tees that were not being used
                teesPlayedArr.push(selectedTee)
                // console.log(selectedTee);
                // console.log(selectedTee);
                hole.tees.splice(0,hole.tees.length)
                hole.tees.push(selectedTee)               
                
        
            }            
            if (holes.length > 9) {                
                // Cuts the Holes array in half to place on the score card                
                const frontNineHoles = teesPlayedArr.slice(0,9)
                const backNineHoles = teesPlayedArr.slice(9,18)                                            
                // Sets the State for the Front 9 and Back 9 holes
                
                setFrontNine(frontNineHoles)
                setBackNine(backNineHoles)                
                                                
                return '18'
                
            } else if (holes.length <= 9) {
                const frontNineHoles = holes
                setFrontNine(frontNineHoles)
            }
        }
        setScoreCardState()
        
    }, [])
    

    const handleChangeScoreFront = (index , e) => {
        const data = [...frontNine]
        console.log(frontNine);
        data[index][e.target.name] = parseInt(e.target.value)
        setEditFrontNineArr(data)
        
        
        // NEXT step here work on handleing the change by updating the state
    }
    console.log(frontNine);
    return (
        <div>
            <form>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Hole</th> 
                            {frontNine.map((hole) => (
                                <td key={hole.id}>{hole.num}</td>
                            ))}
                            <td>
                                <strong>
                                    OUT
                                </strong>
                            </td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.num}</td>
                            ))}
                            <td>
                                <strong>
                                    IN
                                </strong>
                            </td>    
                            <td>
                                <strong>
                                    TOTAL
                                </strong>
                            </td>                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>{teeUsed}</th>
                            {frontNine.map(hole => (
                                <td key={hole.id}>{hole.yards}</td>
                            ))}
                            <td>OUT</td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.yards}</td>
                            ))}
                            <td>IN</td>
                            <td>TOTAL</td>
                        </tr>
                        <tr>
                            <th>Strokes</th>
                            {frontNine.map((hole, index ) => (
                                <td key={hole.id}>
                                    <input
                                        style={{border:'none', width:'50px'}} 
                                        id='hole.id'
                                        name='score'
                                        type='number'
                                        value={hole.score}
                                        onChange={(e) => handleChangeScoreFront(index, e)}
                                    />
                                </td>
                            ))}
                            <td>OUT</td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.score}</td>
                            ))}
                            <td>IN</td>
                            <td>TOTAL</td>
                        </tr>
                        <tr>
                            <th>Putts</th>
                            {frontNine.map(hole => (
                                <td key={hole.id}>{hole.putts}</td>
                            ))}
                            <td>OUT</td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.putts}</td>
                            ))}
                            <td>IN</td>
                            <td>TOTAL</td>
                        </tr>
                    </tbody>                    
                </Table>
            </form>
        </div>
    )
}

export default ScoreCard