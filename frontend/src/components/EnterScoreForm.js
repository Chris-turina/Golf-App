import React, { useState, useEffect } from 'react';
import ButtonThree from './Buttons/ButtonThree';
import ScoreButton from './Buttons/ScoreButton';

// [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
// [1,2,3,4,5,6,7,8,9]

export default function EnterScoreForm({ tees }) {     

    const [teesArr, setTeesArr] = useState( [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18] )
    const [currentTee, setCurrentTee] = useState({})
    const [currentTeeIndex, setCurrentTeeIndex] = useState(0)
    const [showInputForm, setShowInputForm] = useState(false)

console.log(tees);

    useEffect(() =>{
        setTeesArr(tees)        
        setCurrentTee(tees[0])
        setShowInputForm(true)
    }, [setShowInputForm, setTeesArr, setCurrentTee])


    const toggleTee = (tee, i, e) => {
        setCurrentTee(tee)
        setCurrentTeeIndex(i)
    }

    const toggleNextTee = () => {

    }
    console.log(currentTee);
    
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
                        <div>
                            Hole Info
                        </div>
                    </div>
                    <div className='enter-score-form'>
                        <div>
                            <div className='score-buttons'>
                                <ScoreButton text={1} value={1}/>
                                <ScoreButton text={2} value={2}/>
                                <ScoreButton text={3} value={3}/>
                                <ScoreButton text={4} value={4}/>
                                <ScoreButton text={5} value={5}/>
                                <ScoreButton text={6} value={6}/>
                                <ScoreButton text={7} value={7}/>
                                <ScoreButton text={8} value={8}/>
                                <ScoreButton text={9} value={9}/>
                                <ScoreButton text={10} value={10}/>
                            </div>

                            <div>
                                Fairway Hit
                            </div>

                            <div>

                            </div>
                        </div>
                        
                    </div>
                </div>
            }
        </div>
    )
}