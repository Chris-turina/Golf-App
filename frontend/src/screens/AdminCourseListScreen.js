import React, {useEffect, useState } from 'react';
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
        dispatch({ type: GOLF_COURSE_CREATE_RESET })

        if (!userInfo.isAdmin) {
            navigate('/login')
        }

        if(successCreate) {
            navigate(`/admin/golfcourse/${createdGolfCourse.course_id}/create`)
        } else {
            dispatch(listGolfCourses()) 
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, createdGolfCourse])

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
                <Col className='text-right'>
                    <Button className='my-3' onClick={createGolfCourseHandler}>
                        <i className='fas fa-plus'></i> Create Golf Course
                    </Button>
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
                                    <th>TEE COLORS</th>
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
                                            <LinkContainer to={`/admin/golfcourse/${golfCourse.course_id}/holes_details`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fa fa-arrow-right"></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/golfcourse/${golfCourse.course_id}/details`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className="fa fa-arrow-right"></i>
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <LinkContainer to={`/admin/golfcourse/${golfCourse.course_id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>                                            
                                            </LinkContainer>

                                            <Button variant='danger' className='btn-sm'onClick={() => deleteHandler(golfCourse.course_id)} >
                                                <i className='fas fa-trash'></i>
                                            </Button>

                                            
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

export default AdminCourseListScreen