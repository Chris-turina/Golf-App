import React, { useState, useEffect } from 'react';
import ButtonThree from './Buttons/ButtonThree';
import ScoreButton from './Buttons/ScoreButton';
import PuttButton from './Buttons/PuttButton';
import FairwayButton from './Buttons/FairwayButton';
import { createRound } from '../actions/roundActions';


export default function EnterScoreForm({ tees, submitScore }) {     

    const [teesArr, setTeesArr] = useState( [] )
    const [currentTee, setCurrentTee] = useState({})
    const [currentTeeIndex, setCurrentTeeIndex] = useState(0)
    const [showInputForm, setShowInputForm] = useState(false)


    const [selectedScoreButton, setSelectedScoreButton] = useState(0)
    const [selectedPuttButton, setSelectedPuttButton] = useState(0)
    const [selectedFairwayButton, setSelectedFairwayButton] = useState('')

    const [currentPar, setCurrentPar] = useState(0)

    const [totalStrokes, setTotalStrokes] = useState(0)
    const [totalPutts, setTotalPutts] = useState(0)
    const [totalToPar, setTotalToPar] = useState('E')

    const [showNextBtn, setShowNextBtn] = useState(true)
    const [showSubmitBtn, setShowSubmitBtn] = useState(false)



    useEffect(() =>{
        setTeesArr(tees)        
        setCurrentTee(tees[0])
        setShowInputForm(true)

    }, [setShowInputForm, setTeesArr, setCurrentTee])

    useEffect(() => {        
        let oldCurrentTee = {...currentTee}
        let allTees = teesArr

        if ('strokes' in currentTee != 0 && 'putts' in currentTee != 0 && 'fairway' in currentTee && 'completed' in currentTee != true) {
            oldCurrentTee['completed'] = true
            allTees[currentTeeIndex]['completed'] = true
            console.log(oldCurrentTee);
            setTeesArr(allTees)
            setCurrentTee(oldCurrentTee)
        } 
    })


    const updateScore = (value) => {       
        // FUNCTION takes value from button then adds the attribute to the currently selected Tee 
        let oldCurrentTee = {...currentTee}
        console.log(oldCurrentTee);
        let allTees = teesArr
        if (Object.hasOwn(oldCurrentTee, 'strokes') === true) {
            oldCurrentTee.strokes = value
            allTees[currentTeeIndex].strokes = value            
        } else {
            oldCurrentTee['strokes'] = value
            allTees[currentTeeIndex]['strokes'] = value
        }                
        setTeesArr(allTees)
        setCurrentTee(oldCurrentTee)
        setSelectedScoreButton(value)     
        
        let addStrokes = 0
        let toPar = 0
        for (let i = 0; i < teesArr.length; i++) {
            const tee = teesArr[i];
            if (Object.hasOwn(tee, 'strokes') === true) {
                addStrokes += tee.strokes    
                toPar = toPar + (tee.strokes - tee.hole__par)
                console.log(toPar);
                
            }            
        }
        if (toPar > 0) {
            toPar = `+${toPar}`
        } else if (toPar === 0) {
            toPar = 'E'
        }
        console.log(toPar);
        setTotalStrokes(addStrokes)
        setTotalToPar(toPar)
        
        
    }

    const updatePutt = (value) => {
        let oldCurrentTee = {...currentTee}
        let allTees = teesArr
        if (Object.hasOwn(oldCurrentTee, 'putts') === true) {
            oldCurrentTee.putts = value
            allTees[currentTeeIndex].putts = value            
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

    const updateFairwayHit = (value) => {
        let oldCurrentTee = {...currentTee}
        let allTees = teesArr
        if (Object.hasOwn(oldCurrentTee, 'fairway') === true) {
            oldCurrentTee.fairway = value
            allTees[currentTeeIndex].fairway = value            
        } else {
            oldCurrentTee['fairway'] = value
            allTees[currentTeeIndex]['fairway'] = value
        }   
        setTeesArr(allTees)
        setCurrentTee(oldCurrentTee)
        setSelectedFairwayButton(value)
        
        
    }

    // THIS FUNCTION CONTROLS WHEN YOU CLICK ON A TEE BUTTON AT THE TOP OF THE DIPLAY
    const toggleTee = (tee, i, e) => {
        if (i === teesArr.length -1) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        } else {
            setShowNextBtn(true)
            setShowSubmitBtn(false)
        }

        setCurrentTee(tee)
        setCurrentTeeIndex(i)
        setSelectedScoreButton(tee.strokes)
        setSelectedPuttButton(tee.putts)
        setSelectedFairwayButton(tee.fairway)
    }

    // THIS FUNCTION CONTROLS THE NEXT TEE BUTTON
    const toggleNextTee = () => {
        const nextTeeIndex = currentTeeIndex + 1
        const newTee = teesArr[nextTeeIndex]
        if (teesArr.length === currentTeeIndex + 2) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        }

        setCurrentTeeIndex(nextTeeIndex)
        setCurrentTee(newTee)

        setSelectedScoreButton(newTee.strokes)
        setSelectedPuttButton(newTee.putts)
        setSelectedFairwayButton(newTee.fairway)
    }

    const handleSubmit = () => {
        
        for (let i = 0; i < teesArr.length; i++) {
            const tee = teesArr[i];
            if (tee.completed !== true) {                
                return window.confirm('Please Fill Out Each Hole')
            }
        }
        submitScore(teesArr)
        
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
                                    item={tee}
                                    handleClick={e => toggleTee(tee, i, e)}                                                              
                                    text={tee.hole__number}
                                    selected={currentTee}
                                />                            
                            ))}                        
                    </div>
                    <div className='enter-score-form-header user-content-container-style'>
                        <div className='enter-score-form-header-item enter-score-form-hole-info'>
                            <h1>{currentTee.hole__number}</h1>
                            <div className='enter-score-form-yards-and-par'>
                                <p>PAR <strong>{currentTee.hole__par}</strong></p>
                                <p>{currentTee.yards}</p>
                            </div>                            
                        </div>

                        <div className='enter-score-form-header-item'>                            
                            <p>TOTAL STOKES</p>
                            <p>{totalStrokes}</p>
                        </div>

                        <div className='enter-score-form-header-item'>
                            <p>TOTAL PUTTS</p>
                            <p>{totalPutts}</p>
                        </div>

                        <div className='enter-score-form-header-item'>
                            <p>TO PAR</p>
                            <p>{totalToPar}</p>
                        </div>
                    </div>
                    
                    <div className='enter-score-form user-content-container-style'>
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

                            <div className='fairway-buttons-container'>
                                <div className='fairway-buttons-title'>
                                    <p>FAIRWAY HIT:</p>
                                </div>
                                <div className='fairway-buttons-content-container'>
                                    <FairwayButton text={'ROUGH LEFT'} value={'left'} selected={selectedFairwayButton} handleClick={updateFairwayHit} />
                                    <FairwayButton text={'FAIRWAY'} value={'center'} selected={selectedFairwayButton} handleClick={updateFairwayHit} />
                                    <FairwayButton text={'ROUGH RIGHT'} value={'right'} selected={selectedFairwayButton} handleClick={updateFairwayHit} />
                                </div>
                            </div>
                        </div>
                        <div className='enter-score-form-next-button'>
                            {showNextBtn && <button className='button-style-two' type='button' onClick={() => toggleNextTee()}>Next Hole</button>}
                            {showSubmitBtn && <button className='button-style-three' type='button' onClick={() => handleSubmit()}>Save Score</button>}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}