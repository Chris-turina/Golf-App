import React, {useState} from 'react'

export default function CreateCourseScoreCard() {

    const [showScoreCard, setShowScoreCard] = useState(false)
    const [showTeeBoxes, setShowTeeBoxes] = useState(true)

    const [courseName, setCourseName] = useState('')
    const [numberOfHoles, setNumberOfHoles] = useState(0)
    const [teeBoxData, setTeeBoxData] = useState( [
        {tee_box_color: '', front_nine_distance: 0, back_nine_distance: 0, slope:0, handicap:0, par:0}
    ] )
    const [tees, setTees] = useState([
        {color:'', yards: 0}
    ])
    
    const [holes, setHoles] = useState([])


    const [holesData, setHolesData] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()

        let x = 0
        let arrHoles = []
        while (x < numberOfHoles) {
            arrHoles.push({number: x +1, handicap:0, tees:[]})
            x++
        }
        setHoles(arrHoles)
        setShowScoreCard(true)
        // setShowTeeBoxes(false)
    }

    const handleChange = (index, e) => {
        let data = [...teeBoxData]
        data[index][e.target.name] = e.target.value
        setTeeBoxData(data)
    }

    const addTeeBox = () => {
        let newTeeBox = {tee_box_color: '', front_nine_distance: 0, back_nine_distance: 0}
        setTeeBoxData([...teeBoxData, newTeeBox])
    }
    

    // 
// 
// WORKING ON CREATING THE SCORE CARD TO ADD A COURSE
// 
    // 

    return (
        <div>
            <div className='admin-create-course-content-container'>
                    <form onSubmit={handleSubmit}>
                        <label>Course Name</label>
                        <input 
                            type='name'
                            name='courseName'
                            placeholder='Highlands'
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                        <select onChange={(e) => setNumberOfHoles(e.target.value)} >
                            <option>Number of Holes</option>
                            <option value={9} >9</option>
                            <option value={18}>18</option>
                            
                        </select>
                        
                        <div className='admin-create-course-tee-boxes-container'>
                            {teeBoxData.map((teeBox, index) => (
                                <div key={index}>
                                    <input 
                                        placeholder='Tee Box Name'
                                        type='name'
                                        name={`tee_box_color`}   
                                        value={teeBox.tee_box_color}  
                                        onChange={(e) => handleChange(index, e)}                                                                 
                                    />
                                    <input 
                                        placeholder='Front Nine Distance'
                                        type='number'
                                        name={`front_nine_distance`}
                                        value={teeBox.front_nine_distance}
                                        onChange={(e) => handleChange(index, e )}
                                    />

                                    <input 
                                        placeholder='Back Nine Distance'
                                        type='number'
                                        name={`back_nine_distance`}
                                        value={teeBox.back_nine_distance}
                                        onChange={(e) => handleChange(index, e)}
                                    />

                                    <input 
                                        placeholder='Slope'
                                        type='number'
                                        name={`slope`}
                                        value={teeBox.slope}
                                        onChange={(e) => handleChange(index, e)}
                                    />

                                    <input 
                                        placeholder='handicap'
                                        type='number'
                                        name={`handicap`}
                                        value={teeBox.handicap}
                                        onChange={(e) => handleChange(index, e)}
                                    />

                                    <input 
                                        placeholder='Par'
                                        type='number'
                                        name={`par`}
                                        value={teeBox.par}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                            ))}
                            <button onClick={addTeeBox}>Add a Tee Box</button>
                        </div>
                        <button type='submit'>Next</button>
                    </form>

                    {showScoreCard && (
                        <div className='create-course-score-card'>
                            <form>
                                <div>
                                    <div>
                                        <p>{courseName}</p>
                                    </div>
                                    {holes.map((hole, index) => (
                                        <div key={index}>
                                            <p>{hole}</p>
                                        </div>
                                    ))}
                                </div>

                                

                            </form>
                        </div>
                    )}
                </div>
        </div>
    )
}