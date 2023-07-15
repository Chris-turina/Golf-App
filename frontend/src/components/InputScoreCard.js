import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

function InputScoreCard({ holes, teeUsed, passState }) {
    const [frontNine, setFrontNine] = useState( [] )
    const [backNine, setBackNine] = useState( [] )
    const [editFrontNineArr, setEditFrontNineArr] = useState( [] )
    const [editBackNineArr, setEditBackNineArr] = useState( [] )

    const [yardsOut, setYardsOut] = useState(0)
    const [yardsIn, setYardsIn] = useState(0)
    const [yardsTotal, setYardsTotal] = useState(0)

    const [parIn, setParIn] = useState(0)
    const [parOut, setParOut] = useState(0)
    const [parTotal, setParTotal] = useState(0)
    
    const [strokesOut, setStrokesOut] = useState(0)
    const [strokesIn, setStrokesIn] = useState(0)
    const [strokesTotal, setStrokesTotal] = useState(0)

    const [puttsOut, setPuttsOut] = useState(0)
    const [puttsIn, setPuttsIn] = useState(0)
    const [puttsTotal, setPuttsTotal] = useState(0)

    const [eightteenHoleCourse, setEightteenHoleCourse] = useState(true)

    

    useEffect(() => {

        // This Function is used to set the state for the Score card on initial render by splitting up the holes via front and back nine
        const setScoreCardState = async () => {                   
            const teesPlayedArr = []      
            let yardsOutNum = 0   
            let yardsInNum = 0
            let parOutNum = 0
            let parInNum = 0
            
            // This loop finds which tee the Player has selected
            for (let i = 0; i < holes.length; i++) {
                const hole = holes[i];                
                // Finds which tee is being used
                const selectedTee = hole.tees.find(tee => tee.color === teeUsed)
                // removes all the other tees that were not being used
                teesPlayedArr.push(selectedTee)
                
                hole.tees.splice(0,hole.tees.length)
                hole.tees.push(selectedTee)               
                
        
            }        
            
            // THis If statment is going to load what type of score card, either a 9 or 18 hole score car            
            if (holes.length > 9) {                
                // Cuts the Holes array in half to place on the score card                
                const frontNineHoles = teesPlayedArr.slice(0,9)
                const backNineHoles = teesPlayedArr.slice(9,18)         
                                                 
                // Sets the State for the Front 9 and Back 9 holes
                for (let i = 0; i < frontNineHoles.length; i++) {
                    const hole = frontNineHoles[i];
                    yardsOutNum += hole.yards
                    parOutNum += hole.par
                }
                for (let i = 0; i < backNineHoles.length; i++) {
                    const hole = backNineHoles[i];
                    yardsInNum += hole.yards
                    parInNum += hole.par
                }

                setParOut(parOutNum)
                setParIn(parInNum)
                setParTotal(parOutNum + parInNum)

                setYardsOut(yardsOutNum);
                setYardsIn(yardsInNum);
                setYardsTotal(yardsOutNum + yardsInNum)

                setFrontNine(frontNineHoles)
                setBackNine(backNineHoles)                
                                                
                return '18'
                
            } else if (holes.length === 9) {
                
                const frontNineHoles = teesPlayedArr
                console.log(frontNineHoles);
                for (let i = 0; i < frontNineHoles.length; i++) {
                    const hole = frontNineHoles[i];
                    yardsOutNum += hole.yards
                    parOutNum += hole.par
                }

                setParOut(parOutNum)
                setYardsOut(yardsOutNum);

                setFrontNine(frontNineHoles)
            }
        }
        setScoreCardState()
        
    }, [])
    
    // Changes the state for the score for the first 9 holes, and the total for the first 9 holes
    const handleChangeScoreFront = (index , e) => {            
        
        console.log('no');
        let strokes = 0
        const data = [...frontNine]
        data[index][e.target.name] = parseInt(e.target.value)        
        for (let i = 0; i < data.length; i++) {
            const hole = data[i];            
            strokes += hole.score                        
        }
        setStrokesOut(strokes);
        setEditFrontNineArr(data)
        setStrokesTotal(strokes + strokesIn)        
    }

    // Changes the state for the score for the second 9 holes, and the total for the second 9 holes
    const handleChangeScoreBack = (index , e) => {
        let strokes = 0
        const data = [...backNine]        
        data[index][e.target.name] = parseInt(e.target.value)
        for (let i = 0; i < data.length; i++) {
            const hole = data[i];            
            strokes += hole.score                        
        }
        setStrokesIn(strokes)
        setEditBackNineArr(data)
        setStrokesTotal(strokesOut + strokes)
    }

    // Changes the state for the putts for the first 9 holes, and the total for the first 9 holes
    const handleChangePuttsFront = (index , e) => {
        let putts = 0
        const data = [...frontNine]        
        data[index][e.target.name] = parseInt(e.target.value)
        for (let i = 0; i < data.length; i++) {
            const hole = data[i];            
            putts += hole.putts                        
        }
        setPuttsOut(putts)
        setEditFrontNineArr(data)
        setPuttsTotal(putts + puttsIn)
        
    }

    // Changes the state for the putts for the second 9 holes, and the total for the second 9 holes
    const handleChangePuttsBack = (index , e) => {
        let putts = 0
        const data = [...backNine]        
        data[index][e.target.name] = parseInt(e.target.value)
        for (let i = 0; i < data.length; i++) {
            const hole = data[i];            
            putts += hole.putts                        
        }
        setPuttsIn(putts)
        setEditBackNineArr(data)
        setPuttsTotal(puttsOut + putts)
    }

    const handleSubmit = (e) => { 
        e.preventDefault()       
        // const data = frontNine.concat(backNine)
        const holeScoreData = frontNine.concat(backNine)
        const data = {
            yardsOut, 
            yardsIn, 
            yardsTotal, 
            parOut, 
            parIn, 
            parTotal, 
            strokesOut, 
            strokesIn, 
            strokesTotal, 
            puttsOut, 
            puttsIn, 
            puttsTotal,            
        }        
        passState(data, holeScoreData)
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Table responsive hover>
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
                            <td>
                                <strong>
                                    {yardsOut}
                                </strong>
                            </td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.yards}</td>
                            ))}
                            <td>
                                <strong>
                                    {yardsIn}
                                </strong>
                            </td>
                            <td>
                                <strong>
                                    {yardsTotal}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <th>Par</th>
                            {frontNine.map(hole => (
                                <td key={hole.id}>{hole.par}</td>
                            ))}
                            <td>
                                <strong>
                                    {parOut}
                                </strong>
                            </td>
                            {backNine.map(hole => (
                                <td key={hole.id}>{hole.par}</td>
                            ))}
                            <td>
                                <strong>
                                    {parIn}
                                </strong>
                            </td>
                            <td>
                                <strong>
                                    {parTotal}
                                </strong>
                            </td>
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
                            <td>
                                <strong>
                                    {strokesOut}
                                </strong>
                            </td>
                            {backNine.map((hole, index) => (
                                <td key={hole.id}>
                                    <input
                                            style={{border:'none', width:'50px'}} 
                                            id='hole.id'
                                            name='score'
                                            type='number'
                                            value={hole.score}
                                            onChange={(e) => handleChangeScoreBack(index, e)}
                                        />
                                </td>
                            ))}
                            <td>
                                <strong>
                                    {strokesIn}
                                </strong>
                            </td>
                            <td>
                                <strong>
                                    {strokesTotal}
                                </strong>
                            </td>
                        </tr>
                        <tr>
                            <th>Putts</th>
                            {frontNine.map((hole, index) => (
                                <td key={hole.id}>
                                    <input
                                        style={{border:'none', width:'50px'}} 
                                        id='hole.id'
                                        name='putts'
                                        type='number'
                                        value={hole.putts}
                                        onChange={(e) => handleChangePuttsFront(index, e)}
                                    />
                                </td>
                            ))}
                            <td>
                                <strong>
                                    {puttsOut}
                                </strong>
                            </td>
                            {backNine.map((hole, index) => (
                                <td key={hole.id}>
                                    <input
                                        style={{border:'none', width:'50px'}} 
                                        id='hole.id'
                                        name='putts'
                                        type='number'
                                        value={hole.putts}
                                        onChange={(e) => handleChangePuttsBack(index, e)}
                                    />
                                </td>
                            ))}
                            <td>
                                <strong>
                                    {puttsIn}
                                </strong>
                            </td>
                            <td>
                                <strong>
                                    {puttsTotal}
                                </strong>
                            </td>
                        </tr>
                    </tbody>                    
                </Table>
                <input type='submit'/>
            </form>
        </div>
    )
}

export default InputScoreCard