import React, {useEffect} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listGolfCourses, deleteGolfCourse, createGolfCourse } from '../../../actions/golfCourseActions';
import { GOLF_COURSE_CREATE_RESET } from '../../../constants/golfCourseConstants';
import Header from '../../../components/Header';
import AdminCourseListItem from '../../../components/AdminCourseListItem';

export default function AdminCourseListScreen() {

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

    console.log(golfCourses);
    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
            <div>
                <div className='admin-user-list-screen-back-arrow-container'>
                    <i className="fa-solid fa-arrow-left"></i>
                    <Link className='select-tee-link' to='/admin'>
                        <p>Admin</p>
                    </Link>
                    
                </div>
                <Link to='create'>
                    <button>Add a Course</button>
                </Link>
            </div>
            


            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div className='admin-courses-list-screen-content-container'>
                            <AdminCourseListItem
                                headerStyle='admin-user-list-item-header'
                                header='true'
                                id='ID'
                                name='NAME'
                                holes='HOLES'
                                courseInfo='COURSE INFO'
                                deleteCourse='DELETE COURSE'
                            />
                            {golfCourses.map(golfCourse => (
                                <Link to={`${golfCourse.course_id}`} className='admin-course-list-screen-link' key={golfCourse.course_id}>
                                    <AdminCourseListItem                                                                        
                                    listItem='true'
                                    id={golfCourse.course_id}
                                    name={golfCourse.name}
                                    holes={golfCourse.numOfHoles}
                                    courseInfo='Info'
                                    deleteCourse='delete course'
                                />
                                </Link>
                                
                            ))}
                        </div>

                        
                    )
            }
        </div>
    )
}