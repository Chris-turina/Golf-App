// PLAN TO DEPRICATE THIS SCREEN




import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainter from '../components/FormContainer';
import { listGolfCourseDetails, updateGolfCourse } from '../actions/golfCourseActions';
import { createNineHoles, createEighteenHoles } from '../actions/holeActions';
import { GOLF_COURSE_UPDATE_RESET } from '../constants/golfCourseConstants';


function AdminCourseCreateScreen() {
    const [name, setName] = useState('')
    const [numOfHoles, setNumOfHoles] = useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { error, loading, golfCourse } = golfCourseTeeDetails

    const golfCourseUpdate = useSelector(state => state.golfCourseUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = golfCourseUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: GOLF_COURSE_UPDATE_RESET })
            navigate('/admin/golfcourselist')   
    
        } else {
            
            if(!golfCourse.name || golfCourse.course_id !== Number(id)) {
                dispatch(listGolfCourseDetails(id))
                
            } else {
                setName(golfCourse.name)
                setNumOfHoles(golfCourse.numOfHoles)            
            }
        }
        
    },[dispatch, navigate, successUpdate, golfCourse, id ])

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(numOfHoles);

        if (numOfHoles === 9) {
            console.log('9');
            dispatch(createNineHoles(golfCourse))
        } else {
            console.log('18');
            dispatch(createEighteenHoles(golfCourse))
        }

        dispatch(updateGolfCourse({
            course_id: id,
            name,
            numOfHoles,
        }))
        
    }


    return (
        <div>
            <Link to='/admin/golfcourselist'>
                Go Back
            </Link>

            <FormContainter>
                <h1>Create Golf Course</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId='num_of_holes'>
                                <Form.Label>Number of Holes</Form.Label>                                
                                <Form.Select onChange={(e) =>setNumOfHoles(e.target.value)} >
                                    <option value={18}>18</option>
                                    <option value={9}>9</option>                                    
                                </Form.Select>
                            </Form.Group>

                            <Button type='submit' variant='primary' >
                                Update
                            </Button>

                        </Form>
                    )
                }

            </FormContainter>
        </div>
    )
}

export default AdminCourseCreateScreen