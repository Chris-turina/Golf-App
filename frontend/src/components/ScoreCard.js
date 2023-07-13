import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function ScoreCard({ holes, teeUsed, teeUsedId }) {
    const [frontNine, setFrontNine] = useState( [] )
    const [backNine, setBackNine] = useState( [] )
    const [frontNineTees, setFronNineTees] = useState( [] )

    

    useEffect(() => {

        const setScoreCardState = async () => {            
            const teesPlayed = []
            // console.log(holes);

            for (let i = 0; i < holes.length; i++) {
                const hole = holes[i];                
                // Finds which tee is being used
                const selectedTee = hole.tees.find(tee => tee.color == teeUsed)                                
                // removes all the other tees that were not being used
                hole.tees.splice(0,hole.tees.length)
                hole.tees.push(selectedTee)                
            }
            

            if (holes.length > 9) {                              
                const frontNineHoles = holes.slice(0,9)
                const backNineHoles = holes.slice(9,18)            
                
                
                setFrontNine(frontNineHoles)
                setBackNine(backNineHoles)                
                                                
                return '18'
                
            } else if (holes.length <= 9) {
                
            }
        }
        setScoreCardState()
        
    }, [])
    
    console.log(frontNine);

    const renderFrontYards = () => {        
        // const teesPlayed = []
        const frontTeesPlayed = []
        
        
        for (let i = 0; i < frontNine.length; i++) {
            const hole = frontNine[i];            
            for (let i = 0; i < hole.tees.length; i++) {
                const tee = hole.tees[i];
                if (tee.color === teeUsed) {
                    frontTeesPlayed.push(tee)
                    
                }                                
            }
            
        }

        
        
        return (
            frontTeesPlayed.map(tee => (
                <td key={tee.id}>{tee.yards}</td>
            ))
           
        )
        
    }

    const renderBackYards = () => {
        // const teesPlayed = []
        const backTeesPlayed = []
        

        for (let i = 0; i < backNine.length; i++) {
            const hole = backNine[i];            
            for (let i = 0; i < hole.tees.length; i++) {
                const tee = hole.tees[i];
                if (tee.color === teeUsed) {
                    backTeesPlayed.push(tee)                    
                }                                
            }            
        }

        return (
            backTeesPlayed.map(tee => (
                <td key={tee.id}>{tee.yards}</td>
            ))
    )
    }
    


    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Hole</th> 
                        {frontNine.map(hole => (
                            <td key={hole.id}>{hole.number}</td>
                        ))}
                        <td>
                            <strong>
                                OUT
                            </strong>
                        </td>
                        {backNine.map(hole => (
                            <td key={hole.id}>{hole.number}</td>
                        ))}
                        <td>
                            <strong>
                                IN
                            </strong>
                        </td>                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{teeUsed}</th>
                        {frontNine.map(hole => (
                            <td key={hole.id}>{hole.tees[0].yards}</td>
                        ))}
                        <td>OUT</td>
                        {backNine.map(hole => (
                            <td key={hole.id}>{hole.tees[0].yards}</td>
                        ))}
                        <td>IN</td>
                    </tr>
                </tbody>
                
            </Table>
        </div>
    )
}

export default ScoreCard