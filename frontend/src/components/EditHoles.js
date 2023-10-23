// IN USE

import React, { useEffect, useState } from 'react'
import EditTees from './EditTees'
import ButtonTwo from './Buttons/ButtonTwo'
import FormStyleOneInput from './FormStyleOneInput'

export default function EditHoles({holes, holeContentUpdate}) {

    const [allHoles, setAllHoles] = useState([])
    const [showHoles, setShowHoles] = useState(false)
    const [currentHole, setCurrentHole] = useState({})
    const [currentHoleIndex, setCurrentHoleIndex] = useState(0)

    const [showSubmitBtn, setShowSubmitBtn] = useState(false)
    const [showNextBtn, setShowNextBtn] = useState(true)

    console.log(currentHoleIndex);
    console.log(currentHole);
    console.log(allHoles);
    


    const loadHoles = () => {
        setAllHoles(holes)
        setCurrentHole(holes[0])
        setShowHoles(true)
    }

    useEffect(() => {
        loadHoles()
    }, [])

    const handleChange = (e) => {
        let data = {...currentHole}
        let allData = allHoles
        data[e.target.name] = parseInt(e.target.value)
        allData[currentHoleIndex][e.target.name] = parseInt(e.target.value)
        setAllHoles(allData)
        setCurrentHole(data)
    }


    const handleSubmit = (e) => {
        e.preventDefault()        
        holeContentUpdate(allHoles)

    }

    

    const toggleHole = (hole, i, e) => {
        if (i === allHoles.length - 1) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        } else {
            setShowNextBtn(true)
            setShowSubmitBtn(false)
        }

        setCurrentHole(hole)
        setCurrentHoleIndex(i)
    }

    const toggleNextHole = () => {
        const nextHoleIndex = currentHoleIndex + 1
        const newHole = allHoles[nextHoleIndex]
        if (allHoles.length === currentHoleIndex + 2) {
            setShowNextBtn(false)
            setShowSubmitBtn(true)
        }
        setCurrentHoleIndex(nextHoleIndex)
        setCurrentHole(newHole)
    }

    

    return (
        <div className='admin-content-item-container-style admin-holes-edit-form'>
            <form onSubmit={handleSubmit} className='form-style-one'>
            <div className='holes-buttons-container'>
                <div className='holes-title'>
                    <p>HOLES:</p>
                </div>
                <div className='holes-buttons-content'>
                    {allHoles.map((hole, index) => (
                        <ButtonTwo 
                            key={hole.id}
                            itemId = {hole.id}
                            handleClick={e => toggleHole(hole, index, e)}
                            index={index}
                            item = {hole}
                            selected={currentHole}
                        />
                    ))}

                </div>
            </div>
                    {showHoles && <div>
                        <div className='holes-inputs-container'>
                            <h3>Hole: {currentHole.number}</h3>
                            <FormStyleOneInput 
                                label={'Hole Handicap'}
                                type={'number'}
                                name={'handicap'}
                                placeholder={'4'}
                                value={currentHole.handicap || ''}
                                handleChange={e => handleChange(e)}
                            />

                            {/* ADD PAR for HOLE HERE */}
                        </div>

                        <EditTees 
                            tees={currentHole.tees}
                        />
                    </div>}                                            

                    {showNextBtn && <button className='button-style-two' type='button' onClick={() => toggleNextHole()}>Next Hole</button>}
                { showSubmitBtn && <button className='button-style-three' type='submit'>Save</button>}
            </form>
        </div>
    )
}