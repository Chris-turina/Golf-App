import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CourseInfo from '../components/CourseInfo';
import { listGolfCourseDetails, listTeeColors } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ScoreFormInput from '../components/ScoreFormInput';
import { createRound } from '../actions/roundActions';

function CourseDetailsScreen() {
    
    const [selectedTee, setSelectedTee] = useState(0)
    const [selectedTeeId, setSelectedTeeId] = useState('')
    const [selectedTeeHoles, setSelectedTeeHoles] = useState([])
    const [showForm, setShowForm] = useState(false) 
    
    
    const [createArr, setCreateArr] = useState( [ {hole: '', yards: '', score: '', putts: '' }] )


    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { loading, error, golfCourse} = golfCourseTeeDetails
    

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))    
        }

        
          

    }, [dispatch, id])

    // This function handles when you click on a tee color, it takes the tee color ID and Color and sets the local state to determine which holes will be displayed
    const teeColorClickHandler = (teeId, color) => {
        setSelectedTee(color)
        setSelectedTeeId(teeId)
        setSelectedTeeHoles([])
        const teeHoles = [...selectedTeeHoles]           

        if (selectedTeeHoles.length === 0) {
            for (let i = 0; i < golfCourse.holes.length; i++) {
                const hole = golfCourse.holes[i];                 

                for (let i = 0; i < hole.tees.length; i++) {
                    const tee = hole.tees[i];                       
                    if (color === tee.color) {   
                        tee.num = hole.number
                        tee.par = hole.par
                        tee.score = 0
                        tee.putts = 0
                        teeHoles.push(tee)                        
                        setSelectedTeeHoles(teeHoles)                          
                    }
                }
            }

            setShowForm(true)
        } else {
            setShowForm(false)
        }        
    }

    // This Function handles each change that is made to the form and updates the state
    const handleFormChange = (index, e) => {
        const data  = [...selectedTeeHoles]
        const createdValue = e.target.name
        data[index][createdValue] = e.target.value
        setCreateArr(data)
        console.log(data);

    }

    // This function handles the submition of the form and also converts all the values from the form into an Int instead of a string
    const handleSubmit = () => {        
        const data = selectedTeeHoles
        const newScore = []
        data.forEach(({color, hole, id, num, putts, score, yards}) => {
            newScore.push({ color, hole, id, putts:parseInt(putts), score:parseInt(score), yards })
        })  

        setSelectedTeeHoles(newScore)
           
        dispatch(createRound({
            golfCourse: golfCourse.course_id,
            teeColor: selectedTeeId,
            newScore: selectedTeeHoles
        }))

    }

    // This function renders Each form input for each hole
    const renderForm = () => {    
        // console.log(selectedTeeHoles);        
        return (
            <div>                                
                <form onSubmit={handleSubmit}>
                    <div className='formScore'>
                        {selectedTeeHoles.map((hole, index) => (

                        <ScoreFormInput 
                            props={hole} 
                            handleChange = {(e) => handleFormChange(index, e)} 
                            key={hole.id}
                        />

                        ))}
                    </div>
                    <input type='submit' />
                </form>                
            </div>
        )
    }


    return (
        <div>            
            {loading 
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>                            
                            <Row>
                                <h3>{golfCourse.name}</h3>
                            </Row>
                            <Row><p>Select the Tees you played</p></Row>
                            <Row style={{marginBottom: '2rem'}}>
                                {golfCourse.teeColors.map(teeColor => (
                                    <Col key={teeColor.id}>
                                        <Button onClick={() => teeColorClickHandler(teeColor.id, teeColor.colors)} >{teeColor.colors}</Button>
                                    </Col>
                                ))}
                            </Row>
                            <div>
                                {showForm && renderForm()}
                            </div>                  
                        </div>
                        
                    )

            }
            
        </div>
    )
}

export default CourseDetailsScreen