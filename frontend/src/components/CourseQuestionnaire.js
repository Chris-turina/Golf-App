// IN USE

import React, {useState} from 'react'

export default function CourseQuestionnaire({getCourseData}) {

    const [courseName, setCourseName] = useState('')
    const [numberOfHoles, setNumberOfHoles] = useState(0)
    const [numberOfTeeBoxes, setNumberOfTeeBoxes] = useState('')

    


    const handleSubmit = (e) => {
        e.preventDefault()               
        let course = {name:courseName, num_of_holes: parseInt(numberOfHoles), num_of_tee_boxes: parseInt(numberOfTeeBoxes)}
        getCourseData(course)
    }



    return (
        <form className='form-one-container' onSubmit={handleSubmit}>
            <div className='form-one-input-container'>
                <input 
                    required
                    type='name'
                    name='courseName'
                    placeholder='Course Name'
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                />

                <input 
                    required
                    type='number'
                    name='numOfTeeBoxes'
                    placeholder='Number of Tee Boxes'
                    value={numberOfTeeBoxes}
                    onChange={(e) => setNumberOfTeeBoxes(e.target.value)}
                />
                
                <select required onChange={(e) => setNumberOfHoles(e.target.value)} >
                    <option>Number of Holes</option>
                    <option value={9} >9</option>
                    <option value={18}>18</option>                    
                </select>              
            </div>   
            <button className='next-button' type='submit'>Next</button>    
        </form>
    )
}