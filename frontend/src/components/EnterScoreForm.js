import React, { useState, useEffect } from 'react';
import ButtonThree from './Buttons/ButtonThree';
import ScoreButton from './Buttons/ScoreButton';
import PuttButton from './Buttons/PuttButton';

// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
// [1,2,3,4,5,6,7,8,9]

export default function EnterScoreForm({ tees }) {     

    const [teesArr, setTeesArr] = useState( [] )
    const [currentTee, setCurrentTee] = useState({})
    const [currentTeeIndex, setCurrentTeeIndex] = useState(0)
    const [showInputForm, setShowInputForm] = useState(false)
    
    const [selectedScoreButton, setSelectedScoreButton] = useState(0)
    const [selectedPuttButton, setSelectedPuttButton] = useState(0)

    const [totalStrokes, setTotalStrokes] = useState(0)
    const [totalPutts, setTotalPutts] = useState(0)
    const [totalPar, setTotalPar] = useState(0)



    useEffect(() =>{
        setTeesArr(tees)        
        setCurrentTee(tees[0])
        setShowInputForm(true)
    }, [setShowInputForm, setTeesArr, setCurrentTee])


    const updateScore = (value) => {       
        // FUNCTION takes value from button then adds the attribute to the currently selected Tee 
        let oldCurrentTee = {...currentTee}
        let allTees = teesArr
        if (Object.hasOwn(oldCurrentTee, 'strokes') === true) {
            oldCurrentTee.strokes = value
            allTees[currentTeeIndex].strokes = value
            console.log(allTees[currentTeeIndex]);
        } else {
            oldCurrentTee['strokes'] = value
            allTees[currentTeeIndex]['strokes'] = value
        }                
        setTeesArr(allTees)
        setCurrentTee(oldCurrentTee)
        setSelectedScoreButton(value)     
        
        let addStrokes = 0
        for (let i = 0; i < teesArr.length; i++) {
            const tee = teesArr[i];
            if (Object.hasOwn(tee, 'strokes') === true) {
                addStrokes += tee.strokes    
            }            
        }
        setTotalStrokes(addStrokes)
    }

    const updatePutt = (value) => {
        let oldCurrentTee = {...currentTee}
        let allTees = teesArr
        if (Object.hasOwn(oldCurrentTee, 'putts') === true) {
            oldCurrentTee.putts = value
            allTees[currentTeeIndex].putts = value
            console.log(allTees[currentTeeIndex]);
        } else {
            oldCurrentTee['putts'] = value
            allTees[currentTeeIndex]['putts'] = value
        }   
        setTeesArr(allTees)
        setCurrentTee(oldCurrentTee)
        setSelectedPuttButton(value)

        let addPutts = 0
        for (let i = 0; i < teesArr.length; i++) {
            const tee = teesArr[i];
            if (Object.hasOwn(tee, 'putts') === true) {
                addPutts += tee.putts
            }            
        }
        setTotalPutts(addPutts)

    }

    console.log(selectedPuttButton);

    const toggleTee = (tee, i, e) => {
        setCurrentTee(tee)
        setCurrentTeeIndex(i)
        setSelectedScoreButton(tee.strokes)
    }

    const toggleNextTee = () => {

    }
    
    
    return (
        <div>
            { showInputForm &&
                <div className='enter-score-form-container'>
                    <div className='enter-score-form-holes-buttons-container'>
                        {teesArr.map((tee, i) => (                            
                            <ButtonThree 
                                key={tee.id}
                                itemId={tee.id} 
                                handleClick={e => toggleTee(tee, i, e)}                                                              
                                text={tee.hole__number}
                                selected={currentTee}
                            />                            
                        ))}
                    </div>
                    <div className='enter-score-form-header'>
                        <div className='enter-score-form-header-item enter-score-form-hole-info'>
                            <h1>{currentTee.hole__number}</h1>
                            <div className='enter-score-form-yards-and-par'>
                                <p>PAR <strong>{currentTee.hole__par}</strong></p>
                                <p>{currentTee.yards}</p>
                            </div>                            
                        </div>

                        <div className='enter-score-form-header-item'>
                            Total Strokes
                            <p>{totalStrokes}</p>
                        </div>

                        <div className='enter-score-form-header-item'>
                            Total Putts
                            <p>{totalPutts}</p>
                        </div>

                        <div className='enter-score-form-header-item'>
                            Total To Par
                        </div>
                    </div>
                    
                    <div className='enter-score-form'>
                        <div>
                            <div className='score-buttons-container'>
                                <div className='score-buttons-title'>
                                    <p>STROKES:</p>
                                </div>                                
                                <ScoreButton selected={selectedScoreButton} text={1} value={1} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={2} value={2} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={3} value={3} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={4} value={4} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={5} value={5} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={6} value={6} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={7} value={7} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={8} value={8} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={9} value={9} handleClick={updateScore}/>
                                <ScoreButton selected={selectedScoreButton} text={10} value={10} handleClick={updateScore}/>
                            </div>

                            <div className='putt-buttons-container'>
                                <div>
                                    <p>PUTTS:</p>
                                </div>
                                <div className='putt-buttons'>
                                    <PuttButton selected={selectedPuttButton} text={1} value={1} handleClick={updatePutt}/>
                                    <PuttButton selected={selectedPuttButton} text={2} value={2} handleClick={updatePutt}/>
                                    <PuttButton selected={selectedPuttButton} text={3} value={3} handleClick={updatePutt}/>
                                    <PuttButton selected={selectedPuttButton} text={4} value={4} handleClick={updatePutt}/>
                                </div>
                            </div>

                            <div className='fairway-buttons'>
                                Fairway Hit
                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    )
}