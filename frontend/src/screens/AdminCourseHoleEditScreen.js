// This screen can be deleted during next refactor




import React, {useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listGolfCourseDetails, updateTeeYards } from '../actions/golfCourseActions';

function AdminCourseHoleEditScreen() {
    const [showForm, setShowForm] = useState(false)
    const [selectedTee, setSelectedTee] = useState('')
    const [selectedTeeId, setSelectedTeeId] = useState(0)
    const [selectedTeeHoles , setSelectedTeeHoles] = useState([])


    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { error, loading, golfCourse} = golfCourseHoleDetails

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { error: errorTeeColor, loading: loadingTeeColor, golfCourse: courseTees} = golfCourseTeeDetails

    useEffect(() => {
        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))
            
            
            
        }
    }, [id, dispatch, navigate, userInfo])


    // When the Tee Color Button is clicked, all the tee's with that color on each hole are filtered to a single array
    const buttonClickHandler = (color, teeId) => {
        console.log(color);
        console.log(teeId);
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

    // This Function handles the changes that happen on the Tee's length for each hole
    const handleFormChange = (index, e) => {        
        const yards = [...selectedTeeHoles];
        const updatedValue = e.target.name        
        yards[index][updatedValue] = e.target.value
        setSelectedTeeHoles(yards)    
        console.log(selectedTeeHoles);    
    }

    // This Function takes the new array of hole yards from the form, converts the values into numbers and then sends the info to the database 
    const submitForm = () => {

        setShowForm(false)
        const data = selectedTeeHoles
        const newTeeYards = []        
        data.forEach(({id, yards, color, hole }) => {
            newTeeYards.push({id, yards:parseInt(yards), color, hole })            
        })  
        setSelectedTeeHoles(newTeeYards)        
        dispatch(updateTeeYards({
            golfCourse:golfCourse,
            teeColor: selectedTeeId,
            newTees: newTeeYards
        }))
        window.location.reload()
    }  

    // This function shows the hidden form to change the tee's for each hole length
    const renderForm = (teeColorId) => { 

        return(
            <div>
                <Form onSubmit={submitForm} >
                    <div className='form-EditYards'>
                    {golfCourse.holes.map(hole => (
                        <Col className='edit-hole-yards-form' key={hole.id}>
                            <h3>Hole: {hole.number}</h3>
                            <p>Par: {hole.par}</p>
                            <div className=''>
                                {selectedTeeHoles.map((tee, index) => (
                                    <div key={tee.id}>                                        
                                        {hole.id === tee.hole &&
                                            
                                            <Form.Group>
                                                <Row>                                                
                                                        <Form.Label>Yards</Form.Label>                                                                                                    
                                                        <Form.Control
                                                        name='yards'
                                                        type='number'
                                                        placeholder={tee.yards}
                                                        value = {tee.yards}
                                                        onChange={(e) => handleFormChange(index, e)}
                                                        />                                                    
                                                </Row>
                                            </Form.Group>
                                                
                                        }
                                    </div>
                                ))}
                            </div>
                        </Col>
                        
                        

                    ))}
                    
                    </div>
                    <Button type='submit' variant='primary'>
                        Update Holes
                    </Button>
                </Form>
            </div>
        )
    }

    return (
            <div> 
                {errorTeeColor && (<Message>{errorTeeColor}</Message>)}

                {loading && loadingTeeColor
                    ?(<Loader />)
                    : error
                        ? (<Message variant='danger'>{error}</Message>)
                        :( 
                            <div>
                                    <Col>
                                        <Link to={`/admin/golfcourse/${id}/holes_details/`}>
                                            <Button>Go Back</Button>
                                        </Link>
                                    </Col>
                                <Row>
                                    
                                    <Col>
                                        <h1>{golfCourse.name}</h1>
                                        <h4>Select Tee Color</h4>
                                    </Col>                                    
                                </Row>
                                <Row>
                                    {courseTees.teeColors.map(teeColor => (
                                        <Col key={teeColor.id}>
                                            <Button onClick={() => buttonClickHandler(teeColor.colors, teeColor.id)}>{teeColor.colors}</Button>
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

export default AdminCourseHoleEditScreen