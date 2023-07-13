// This Screen Can be deleted During Refactor








import React, { useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { listGolfCourseDetails, createTeeColor, deleteTeeColor, updateTeeColor } from '../actions/golfCourseActions';
import { createTees, deleteTeeBatch, addedToHole} from '../actions/teeActions';
import { TEE_COLOR_CREATE_RESET } from '../constants/golfCourseConstants';


function AdminCourseDetailScreen() {
    const [showForm, setShowForm] = useState(false)

    const [colors, setColors] = useState('')
    const [yards, setYards] = useState(0)
    const [teeId, setTeeId] =useState(0)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { error, loading, golfCourse } = golfCourseTeeDetails

    const teeColorCreate = useSelector(state => state.teeColorCreate)
    const { loading: loadingTeeCreate, error: errorTeeCreate, success:successTeeCreate, teeColor: createdTeeColor} = teeColorCreate 

    const teeColorDelete = useSelector(state => state.teeColorDelete)
    const { loading: loadingTeeColorDelete, error: errorTeeColorDelete, success: successTeeColorDelete } = teeColorDelete

    const teeBatchDelete = useSelector(state => state.teeBatchDelete)
    const { loading: loadingTeeDelete, error: errorTeeDelete, success:successTeeDelete } = teeBatchDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo.isAdmin) {
            navigate('/login')
        }                 
        else {
            dispatch(listGolfCourseDetails(id))                        
        }
        
    }, [dispatch, id, userInfo.isAdmin, navigate, successTeeColorDelete, successTeeCreate])


    // Add the Tee Color instance to all holes in this course
    const addTeeColorsToHoles = (courseId, teeColorId, bool) => {
        if (bool == false) {            
            dispatch(createTees({
                courseId,
                teeColorId
            }))

            dispatch(addedToHole({
                id:teeColorId,
                added_to_holes: true
            }))
            window.location.reload()
        } 
    }

    // This renders either a Red X or a Green Check
    const renderRedAndGreenButton = (teeColor) => {

        const popoverHoverFocus = (
            <Popover id='popover-trigger-hover-focus' title='Add to Holes'>
                <strong>Click to add tee color to holes</strong>
            </Popover>
        )

        if (teeColor.added_to_holes == false) {            
            return (
                <OverlayTrigger trigger={['hover', 'focus']} placement='left' overlay={popoverHoverFocus}>
                    <Button variant='light' className='btn-sm' onClick={() => addTeeColorsToHoles(golfCourse.course_id, teeColor.id, teeColor.added_to_holes)}>
                        <i className="fa-solid fa-x" style={{color: 'red'}} ></i>
                    </Button>
                </OverlayTrigger>
            )
        } else {
            return (
                <Button variant='light'>
                    <i className="fa-solid fa-check" style={{ color: 'green'}}></i>
                </Button>
            )   
        }            
    }

    // Create a new Blank Tee 
    const createTeeColorHandler = () => {   
        dispatch(createTeeColor(golfCourse))
    }
  
    //  This function deletes TeeColor instance in all holes and the main TeeColor itself
    const deleteHandler = (course_id, teeColor_id ) => {
        if (window.confirm('Delete this TEE COLOR from all the holes in this course?')) {
            dispatch(deleteTeeBatch(teeColor_id))            
        }

        if( window.confirm('Delete this TEE COLOR from the Course')) {
            dispatch(deleteTeeColor(course_id, teeColor_id))
        }
    }

    // Submits the Edit TeeColor form and updates the database with the new information
    const submitHandler = () => {             
        dispatch(updateTeeColor({
            id:teeId,
            colors,
            yards,
        }))

    }

    // This sets the state of the new created tee color
    const editHandler = (newId, newColors, newYards) => {
        setTeeId(newId)
        setColors(newColors)
        setYards(newYards)
        setShowForm(true)        
        
    }
    console.log(yards);
    // This is the TeeColor Form to edit the information
    const renderTeeColorForm = () => {
        return (
            <FormContainer>
                <div className='formModalBackground'>
                    <Form className='formModal' id="edit_tee" onSubmit={submitHandler}>
                        <h3>Edit Tee</h3>
                        <Form.Group controlId='teeId'>
                            <Form.Control 
                                type='id'
                                placeholder='id'
                                value={teeId}
                                disabled
                            />
                        </Form.Group>

                        <Form.Group controlId='name'>
                            <Form.Label>Color</Form.Label>
                            <Form.Control                                 
                                type='name'
                                placeholder ='color'
                                value={colors}
                                onChange={(e) => setColors(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='yards'>
                            <Form.Label>Yards</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Total Yards'
                                value = {yards}
                                onChange={(e) => setYards(e.target.value)}
                            />
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>

                    </Form>
                </div>
            </FormContainer>
        )
    }

    

    return (
        <div>
            <Row>
                <Link to='/admin/golfcourselist'>
                    Go Back
                </Link>

                <Col>
                    <h1>{golfCourse.name}</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' type='submit' onClick={createTeeColorHandler}>
                        <i className='fas fa-plus'></i> Create a New Tee
                    </Button>
                </Col>
            </Row>
            
            {showForm && renderTeeColorForm()}

            {loadingTeeColorDelete && <Loader />}
            {errorTeeColorDelete && <Message variant='danger'>{errorTeeColorDelete}</Message>}

            {loadingTeeDelete && <Loader />}
            {errorTeeDelete && <Message variant='danger'>{errorTeeDelete}</Message>}

            {loadingTeeCreate && <Loader />}
            {errorTeeCreate && <Message variant='danger' >{errorTeeCreate}</Message>}


            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TEE COLOR</th>
                                    <th>YARDS</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {golfCourse.teeColors.map(teeColor => (
                                    <tr key={teeColor.id}>
                                        <td>{teeColor.id}</td>
                                        <td>{teeColor.colors}</td>
                                        <td>{teeColor.yards}</td>
                                        <td>
                                            <Button variant='light' className='btn-sm' onClick={() => editHandler(teeColor.id,teeColor.colors, teeColor.yards)} >
                                                    <i className='fas fa-edit'></i>
                                            </Button> 

                                            
                                                <Button variant='danger' className='btn-sm'onClick={() => deleteHandler(golfCourse.course_id, teeColor.id)} >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            
                                            
                                        </td>
                                        <td>
                                            
                                                {renderRedAndGreenButton(teeColor)}
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }
        </div>
    )
}

export default AdminCourseDetailScreen