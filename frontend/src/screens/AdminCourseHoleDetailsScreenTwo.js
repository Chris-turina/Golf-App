import React, {useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Card, ListGroup, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listGolfCourseDetails } from '../actions/golfCourseActions';
import { createHole, updateHole } from '../actions/holeActions';


function AdminCourseHoleDetailsScreen() {

    const [holeId, setHoleId] = useState(0)
    const [holePar, setHolePar] = useState(0)
    const [holeNumber, setHoleNumber] = useState(0)
    const [holeTees, setHoleTees] = useState( [] )
    const [courseTees, setCourseTees] = useState( [] )
    const [holes, setHoles] = useState( [] )
    
    const [showEditForm, setShowEditForm] = useState(false)
    const [showHolesDetails, setShowHoleDetails] = useState(false)
    const [showHoleEditForm, setShowHoleEditForm] = useState(false)

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { error, loading, golfCourse } = golfCourseHoleDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id])


    // This Function sumbits the the par for the Hole
    const submitHandler = () => {
        dispatch(updateHole({
            id:holeId,
            par:holePar
        }))
    }

    // This Function sets the state for the "Par" information then shows the form
    const editHandler = (holeId,newPar) => {        
        setHoleId(holeId)
        setHolePar(newPar)
        setShowEditForm(true)
    }

    // This is the Edit form to change the Par of the Hole
    const renderEditForm = (hole) => {
        return (
            <FormContainer>
                <div className='formModalBackground'>
                    <Form className='formModal' onSubmit={submitHandler}>
                        <h3>Edit Hole - Par</h3>
                        <Form.Group controlId='num_of_holes'>
                            <Form.Label>Edit Par</Form.Label>                                
                            <Form.Select onChange={(e) =>setHolePar(e.target.value)} >
                                <option>Select New Par</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>        
                            </Form.Select>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                                Update
                            </Button>
                    </Form>
                </div>
            </FormContainer>
        )
    }

    // This is the function that sets the sate for when the user clicks on the Hole details button, it pulls up the Tees for the hole
    const getHoledetails = (holeId, holeNum, holePar, holeTees) => {
        // sets state for this hole's information        
        setCourseTees(golfCourse.teeColors)
        setHoleId(holeId)
        setHoleNumber(holeNum)
        setHolePar(holePar)
        setHoleTees(holeTees)    
        
        setShowHoleDetails(true)
    }

    
    // This function shows a modal with the details of the hole seleced
    const renderHoleDetails = () => {

        // This Function loops through the the holes.tees and matches the tee color with the courses main teeColors
        const getTeeColor = (colorId) => {
            for (let i = 0; i < courseTees.length; i++) {
                const colorArr = courseTees[i];
                if (colorArr.id == colorId) {                    
                    return colorArr.colors                   
                }             
            }
        }

        return (
            <div className='formModalBackground'>
                <Card style={{ width: '18rem' }}>
                    <div onClick={() => setShowHoleDetails(false)}>Back</div>                    
                    <Card.Title>Hole: {holeNumber}</Card.Title>
                    <Card.Text>Par: {holePar}</Card.Text>
                    <ListGroup>
                        {holeTees.map(tee => (                        
                            <ListGroup.Item key={tee.id}>{getTeeColor(tee.color)}: {tee.yards} yards</ListGroup.Item>

                        ))}
                    </ListGroup>
                </Card>
                
            </div>
        )
    }


    const getHoleEditFormDetails = () => {
        navigate(`/admin/golfcourse/${golfCourse.course_id}/holes_edit`)
    }

    // const renderEditHolesForm = () => {
    //     console.log(holes);

    //     if (holes.length !== 0) {
    //         return (
    //             <div>
    //                 <Form className=''>
    //                     {holes.map(hole => (                        
    //                         <Form.Group key={hole.id}>
    //                             <Form.Label>{hole.number}</Form.Label>
    //                             <Form.Control></Form.Control>
    //                         </Form.Group>                        
    //                     ))}
    //                 </Form>                        
    //             </div>
    //         )
    //     } else {
    //         console.log('no');
    //     }
    // }


    return (
        <div>
            <Row>
                <Link to='/admin/golfcourselist'>
                    Go Back
                </Link>
                <Col>
                    <h1>{golfCourse.name}</h1>
                </Col>                
                <Col>
                    <Button onClick={(e) => getHoleEditFormDetails()}>Edit Holes</Button>
                </Col>

            </Row>

            {showEditForm && renderEditForm()}
            {showHolesDetails && renderHoleDetails()}
            {/* {showHoleEditForm && renderEditHolesForm()} */}

            {loading
                ?(<Loader />)
                :error
                    ? (<Message variant='danger'>{error}</Message>)
                    :(  <div>                            
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>                                    
                                        <th>NUMBER</th>
                                        <th>PAR</th>                                                                                                     
                                        <th>HOLE DETAILS</th>                                    
                                    </tr>
                                </thead>

                                <tbody>
                                    {golfCourse.holes.map(hole => (
                                        <tr key={hole.id} >                                        
                                            <td>{hole.number}</td>
                                            <td>
                                                {hole.par}
                                                <Button variant='light' className='btn-sm' onClick={() => editHandler(hole.id, hole.par, hole.number, hole.tees)}>
                                                        <i className="fas fa-edit"></i>
                                                </Button>
                                            </td>                                                                              
                                            <td>
                                                <Button variant='light' className='btn-sm' onClick={() => getHoledetails(hole.id, hole.number, hole.par, hole.tees)}>
                                                        <i className="fa fa-circle-info"></i>
                                                </Button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )

            }
            

        </div>
    )
}

export default AdminCourseHoleDetailsScreen;