import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listGolfCourses, deleteGolfCourse, createGolfCourse } from '../actions/golfCourseActions';
import { GOLF_COURSE_CREATE_RESET } from '../constants/golfCourseConstants';
import Title from '../components/Title';

function AdminCourseListScreen() {
    // const [showCourseEdit, setShowCourseEdit] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const golfCourseList = useSelector(state => state.golfCourseList)
    const { loading, error, golfCourses, } = golfCourseList

    const golfCourseDelete = useSelector(state => state.golfCourseDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete} = golfCourseDelete

    const golfCourseCreate = useSelector(state => state.golfCourseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, golfCourse: createdGolfCourse } = golfCourseCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {        
        dispatch({ type: GOLF_COURSE_CREATE_RESET})
        if (!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourses()) 
        }

        if (successCreate) {
            navigate(`/admin/golfcourselist/create/${createdGolfCourse.course_id}`)
        }

        if (successDelete) {
            dispatch(listGolfCourses()) 
        }

    }, [dispatch, navigate, userInfo, successDelete, successCreate ])

    // Delete a Course
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this Golf Course?')) {
            dispatch(deleteGolfCourse(id))
        }
    }
    // create a new instance of course 
    const createGolfCourseHandler = () => {        
        dispatch(createGolfCourse())
    }

    return (
        <div>
            <Row className='align-items-center'>
                <Col>                    
                    <Title props={'Golf Courses'} />
                </Col>                
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger' >{errorCreate}</Message>}

            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <Table striped bordered hover responsive className='table-sm' style={{ marginLeft:'15px'}}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>HOLES</th>
                                    <th>COURSE INFO</th>                                    
                                    <th>EDIT/DELETE</th>
                                </tr>
                            </thead>

                            <tbody>
                                {golfCourses.map(golfCourse => (
                                    <tr key={golfCourse.course_id}>
                                        <td>{golfCourse.course_id}</td>
                                        <td>{golfCourse.name}</td>
                                        <td>
                                            {golfCourse.numOfHoles}                                            
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/golfcourse/${golfCourse.course_id}/score_card`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fa fa-arrow-right"></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>                                        
                                        <td>                                            
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>                                                                                        

                                            <Button variant='danger' className='btn-sm'onClick={() => deleteHandler(golfCourse.course_id)} >
                                                <i className='fas fa-trash'></i>
                                            </Button>                                                                                    
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>
                                        <Button  size='sm' className='my-1' onClick={createGolfCourseHandler}>
                                            Add
                                        </Button>
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>                                    
                                </tr>
                            </tbody>
                        </Table>
                    )
            }

        </div>
    )
}

export default AdminCourseListScreen