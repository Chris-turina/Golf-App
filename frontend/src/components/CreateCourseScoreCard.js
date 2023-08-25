import React, {useState} from 'react'

export default function CreateCourseScoreCard({getCourse}) {

    const [showScoreCard, setShowScoreCard] = useState(false)
    const [showTeeBoxeForm, setShowTeeBoxeForm] = useState(true)
    
    
    const [courseName, setCourseName] = useState('')
    const [numberOfHoles, setNumberOfHoles] = useState(0)
    // const [golfCourse, setGolfCourse] = useState({})
    
    const [courseScoreCard, setCourseScoreCard] = useState( [] )    
    const [newTeeBoxData, setNewTeeBoxData] = useState( 
        {tee_box_color: '', front_nine_distance: '', back_nine_distance: '', slope:'', handicap:'', par:'', holes:[]}
    )
    console.log(courseScoreCard);
    console.log(newTeeBoxData);
    

    const handleSubmit = (e) => {
        e.preventDefault()

        if (courseScoreCard.length === 0) {
            let course = {name:courseName, num_of_holes: parseInt(numberOfHoles), tee_boxes:[]}
            setCourseScoreCard(course)    
        }
        

        let teeBox = newTeeBoxData
        let x = 0
        let arrHoles = []
        while (x < numberOfHoles) {
            let uniqueId = Math.floor(Math.random() * 100)
            arrHoles.push({id: uniqueId, number: x +1, handicap:'', yards:'', par:'' })
            x++
        }
        teeBox.holes = arrHoles
        
        setNewTeeBoxData(teeBox)
        setShowScoreCard(true)
        setShowTeeBoxeForm(false)
    }


    
    const handleHoleDataChange = (e, index) => {
        let data = [...newTeeBoxData.holes]
        console.log(data);
        data[index][e.target.name] = parseInt(e.target.value)
        setNewTeeBoxData({...newTeeBoxData, holes:data})
    }    




    const handleAddToScoreCardSubmit = (e) => {
        e.preventDefault()

        let currentTeeBoxes = [...courseScoreCard.tee_boxes]
        console.log(currentTeeBoxes);
        currentTeeBoxes.push(newTeeBoxData)
        setCourseScoreCard({...courseScoreCard, tee_boxes: currentTeeBoxes})        
        setShowScoreCard(false)

        getCourse(courseScoreCard)
    } 

    


    return (        
            <div>            
                        {/* <div onClick={addTeeBox}>Add a Tee Box</div> */}
                <div className='create-score-card-container'> 
                    {showTeeBoxeForm && ( <form className='form-container' onSubmit={handleSubmit}>
                        <div className='course-name-holes-container'>                            
                            <input 
                                required
                                type='name'
                                name='courseName'
                                placeholder='Course Name'
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                            
                            <select required onChange={(e) => setNumberOfHoles(e.target.value)} >
                                <option>Number of Holes</option>
                                <option value={9} >9</option>
                                <option value={18}>18</option>
                                
                            </select>  
                            
                        </div>

                        <div className='tee-box-form-options'>
                                                                                                         
                                <input
                                    required                                        
                                    placeholder='Tee Box Name'
                                    type='name'
                                    name='tee_box_color'
                                    value={newTeeBoxData.tee_box_color}                                              
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, tee_box_color: e.target.value})}
                                />
                            
                                <input
                                    required 
                                    placeholder='Front Nine Distance'
                                    type='number'
                                    name={`front_nine_distance`}
                                    value={newTeeBoxData.front_nine_distance}                                        
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, front_nine_distance: parseInt(e.target.value)})}
                                />
                            
                                <input 
                                    placeholder='Back Nine Distance'
                                    type='number'
                                    name={`back_nine_distance`}
                                    value={newTeeBoxData.back_nine_distance}
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, back_nine_distance: parseInt(e.target.value)})}
                                    
                                />   
                            
                                <input
                                    placeholder='Course Slope'
                                    type='number'
                                    name={`slope`}
                                    value={newTeeBoxData.slope}
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, slope: parseInt(e.target.value)})}
                                />
                            
                                <input 
                                    placeholder='Course Handicap'
                                    type='number'
                                    name={`handicap`}
                                    value={newTeeBoxData.handicap}
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, handicap: parseInt(e.target.value)})}
                                />

                                <input 
                                    required
                                    placeholder='Course Par'
                                    type='number'
                                    name={`par`}
                                    value={newTeeBoxData.par}
                                    onChange={(e) => setNewTeeBoxData({...newTeeBoxData, par: parseInt(e.target.value)})}
                                />                                
                        </div>                                                                                                                  
                                                
                        <button className='next-button' type='submit'>Next</button>
                    </form>)}
                    

                    {showScoreCard && (
                        <div className='create-course-score-card-holes'>
                            <form className='form-container' onSubmit={handleAddToScoreCardSubmit}>
                                <div className='create-course-score-card-container'>
                                    <div>                                        
                                        <h3>{courseName}</h3>
                                        <h4>tee: {newTeeBoxData.tee_box_color}</h4>
                                    
                                    
                                        <div className='course-score-card-input-container'>
                                            {newTeeBoxData.holes.map((hole, index) => (
                                                <div className='course-score-card-input-div' key={index}>
                                                    <p>{hole.number}</p>                                                        
                                                    <input 
                                                        placeholder='yards'                                                                
                                                        type='number'
                                                        name='yards'
                                                        value={hole.yards}
                                                        onChange={(e) => handleHoleDataChange(e, index)}
                                                    />

                                                    <input
                                                        placeholder='handicap'
                                                        type='number'
                                                        name='handicap'
                                                        value={hole.handicap}
                                                        onChange={(e) => handleHoleDataChange(e, index)}
                                                    />

                                                    <input 
                                                        placeholder='par'
                                                        type='number'
                                                        name='par'
                                                        value={hole.par}
                                                        onChange={(e) => handleHoleDataChange(e, index)}
                                                    />
                                                </div>
                                                
                                            ))}
                                        </div>                                                                              
                                    </div>                                        
                                </div>

                                <button type='submit'>Add Tee Box</button>
                            </form>
                        </div>
                    )}
                </div>
        </div>
    )
}