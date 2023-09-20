// IN USE

import React, {useEffect, useState} from 'react'
import FormStyleOneInput from './FormStyleOneInput'
import ButtonTwo from './Buttons/ButtonTwo'


export default function EditTeeBoxes({ teeBoxes, teeBoxContentUpdate }) {
    
    const [allTeeBoxes, setAllTeeBoxes] = useState([])
    const [showTeeBox, setShowTeebox] = useState(false)
    const [currentTeeBox, setCurrentTeeBox] = useState({})
    const [currentTeeBoxIndex, setCurrentTeeBoxindex] = useState(0)

    const [showSubmitBtn, setShowSubmitBtn] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(true)
    const [activeButton, setActiveButton] = useState(false)

    const loadTeeBox = () => {
        setAllTeeBoxes(teeBoxes)
        setCurrentTeeBox(teeBoxes[0])
        setShowTeebox(true)
        if (teeBoxes.length === 1) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        }
        
    }
    

    useEffect(() => {
        loadTeeBox()
    }, [])


    const handleTeeBoxChange = (e) => {
        let data = {...currentTeeBox}
        let allData = allTeeBoxes

        if (e.target.type === 'number') {
            data[e.target.name] = parseInt(e.target.value)
            allData[currentTeeBoxIndex][e.target.name] = parseInt(e.target.value)
        } else {
            data[e.target.name] = e.target.value
            allData[currentTeeBoxIndex][e.target.name] = e.target.value
        }
        setAllTeeBoxes(allData)
        setCurrentTeeBox(data)          
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        teeBoxContentUpdate(allTeeBoxes)
    }

    const toggleTeeBox = (teeBox, i, e) => {
        console.log(e.target);
        if (i === allTeeBoxes.length - 1) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        } else {
            setShowNextBtn(true)
            setShowSubmitBtn(false)
        }
        setCurrentTeeBox(teeBox)
        setCurrentTeeBoxindex(i)
    }

    const toggleNextTeeBox = () => {
        const nextTeeBoxIndex = currentTeeBoxIndex + 1
        const newTeeBox = allTeeBoxes[nextTeeBoxIndex]        
        if (allTeeBoxes.length === currentTeeBoxIndex + 2 ) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        }
        setCurrentTeeBoxindex(nextTeeBoxIndex)
        setCurrentTeeBox(newTeeBox)
        

    }

    return (
        <div className='admin-content-item-container-style form-style-one-container'>
            <form onSubmit={handleSubmit} className='form-style-one'>
                <div className='edit-tee-boxes-container'>                    
                    <div className='tee-box-buttons-container'>
                        {allTeeBoxes.map((teeBox, index) => (
                            <ButtonTwo 
                                key = {teeBox.id}
                                itemId = {teeBox.id}
                                handleClick = {(e) => toggleTeeBox(teeBox, index, e)}
                                index = {index}
                                teeBox = {teeBox}
                                selected = {currentTeeBox}
                            />
                        ))}
                    </div>

                    { showTeeBox && <div className='form-style-one-input-container'>
                        <FormStyleOneInput                                
                            label={'Tee Box Name'}
                            type={'text'}
                            name={'color'}
                            placeholder={'Green'}
                            value={currentTeeBox.color}                            
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={'Handicap'}
                            type={'number'}
                            name={'handicap'}
                            placeholder={'76'}
                            value={currentTeeBox.handicap || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={'Slope'}
                            type={'number'}
                            name={'slope'}
                            placeholder={'142'}
                            value={currentTeeBox.slope || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={'Par'}
                            type={'number'}
                            name={'par'}
                            placeholder={'72'}
                            value={currentTeeBox.par || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={"Front 9 Yards"}
                            type={'number'}
                            name={'front_nine_yards'}
                            placeholder={'3113'}
                            value={currentTeeBox.front_nine_yards || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={"Back 9 Yards"}
                            type={'number'}
                            name={'back_nine_yards'}
                            placeholder={'3303'}
                            value={currentTeeBox.back_nine_yards || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />

                        <FormStyleOneInput
                            label={"Total Yards"}
                            type={'number'}
                            name={'total_yards'}
                            placeholder={'6612'}
                            value={currentTeeBox.total_yards || ''}
                            handleChange={e => handleTeeBoxChange(e)}
                        />
                        
                    </div> } 
                </div>

                
                {showNextBtn && <button className='button-style-two' type='button' onClick={() => toggleNextTeeBox()}>Next Tee Box</button>}
                { showSubmitBtn && <button className='button-style-three' type='submit'>Save Tee Boxes</button>}
            </form>
            
        </div>
    )
}








