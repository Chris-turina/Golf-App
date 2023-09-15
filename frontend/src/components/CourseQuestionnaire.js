// IN USE

import React, {useState} from 'react'
import FormStyleOneInput from './FormStyleOneInput'

export default function CourseQuestionnaire({getCourseData}) {

    const [courseName, setCourseName] = useState('')
    const [numberOfHoles, setNumberOfHoles] = useState('')
    const [numberOfTeeBoxes, setNumberOfTeeBoxes] = useState('')

    


    const handleSubmit = (e) => {
        e.preventDefault()               
        let course = {name:courseName, num_of_holes: parseInt(numberOfHoles), num_of_tee_boxes: parseInt(numberOfTeeBoxes)}
        getCourseData(course)
    }



    return (
        <div className='admin-content-item-container-style form-style-one-container'>
            <form className='form-one-style' onSubmit={handleSubmit}>
                <div className='form-style-one-input-container'>
                    <FormStyleOneInput
                        label={'Course Name'}
                        type={'text'}
                        name={'courseName'}
                        placeholder={'Highlands'}
                        value={courseName}
                        handleChange={(e) => setCourseName(e.target.value)}

                    />

                    <FormStyleOneInput 
                        label={'# of Tee Boxes'}
                        type={'number'}
                        name={'numOfTeeBoxes'}
                        placeholder={'3'}
                        value={numberOfTeeBoxes}
                        handleChange={(e) => setNumberOfTeeBoxes(e.target.value)}
                    />

                    <FormStyleOneInput 
                        label={'# of Holes'}
                        type={'holes'}
                        name={'numOfTeeBoxes'}
                        placeholder={'18'}
                        value={numberOfHoles}
                        handleChange={(e) => setNumberOfHoles(e.target.value)}
                    />
                    <button className='next-button' type='submit'>Next</button>        
                </div>   
                
            </form>
        </div>
        
    )
}