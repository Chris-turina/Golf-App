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
import HeaderAdmin from '../../../components/HeaderAdmin';
import AdminCourseListItem from '../../../components/AdminCourseListItem';
import AdminSideHeader from '../../../components/AdminSideHeader';
import ButtonLargeSquare from '../../../components/Buttons/ButtonLargeSquare';
import TableStyleOne from '../../../components/Tables/TableStyleOne';

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
    
    const routeChange = () => {
        navigate('/admin/golf_courses/create')
    }

    const deleteEditHandler = (value, id) => {
        console.log(id);
        if (value === 'delete') {
            if (window.confirm('Are you sure you want to delete this Golf Course?')) {
                dispatch(deleteGolfCourse(id))
            }
        }
    }

    return (
        <div>
            <HeaderAdmin userInfo={userInfo}/>
            <div className='admin-container'>
                <AdminSideHeader page='golf-courses' />
                <div className='admin-content-container'>
                    <div className='admin-new-row'>
                        {loading
                            ? (<Loader />)
                            : error
                                ? (<Message variant='danger'>{error}</Message>)
                                : (
                                    // <div className='admin-golf-course-content-container-style course-list'>
                                    //     <AdminCourseListItem
                                    //         itemStyle='header'
                                    //         header='true'
                                    //         id='ID'
                                    //         name='NAME'
                                    //         holes='HOLES'
                                    //         courseInfo='COURSE INFO'
                                    //         deleteCourse='DELETE COURSE'
                                    //     />
                                    //     {golfCourses.map(golfCourse => (
                                    //         <Link to={`course/${golfCourse.course_id}`} className='admin-course-list-screen-link' key={golfCourse.course_id}>
                                    //             <AdminCourseListItem     
                                    //             itemStyle='body'                                                                   
                                    //             listItem='true'
                                    //             id={golfCourse.course_id}
                                    //             name={golfCourse.name}
                                    //             holes={golfCourse.num_of_holes}
                                    //             courseInfo='Info'
                                    //             deleteCourse={deleteHandler}
                                    //         />
                                    //         </Link>
                                            
                                    //     ))}
                                    // </div>
                                    <div className=' admin-course-list'>
                                        
                                        <TableStyleOne 
                                            thArray = {['GOLF COURSE','ID', 'HOLES', 'ACTIONS']}
                                            tdArray = {golfCourses}
                                            tdAttributes = {[ 'name', 'course_id', 'num_of_holes', 'ACTIONS']}
                                            dataPointUrl ={`/admin/golf_courses/course/`}
                                            topHeader = {true}
                                            buttonText = {'Add Course'}
                                            searchBarText = {'Search Courses'}
                                            handleButtonClick = {routeChange}
                                            idName = {'course_id'}
                                            handleActions={deleteEditHandler}
                                        />

                                        

                                        
                                    </div>

                                    
                                )
                        }
                    </div>
                    
                


                    
                </div>
            
                
            </div>
        </div>
    )
}