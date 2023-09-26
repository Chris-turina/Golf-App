import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap'
import CourseBooker from '../components/CourseBooker';
import { listGolfCourses, listTeeColors } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Title from '../components/Title'
import Header from '../components/Header';
import CourseListItem from '../components/CourseListItem';
import SideHeader from '../components/SideHeader';
import TableStyleOne from '../components/Tables/TableStyleOne';

export default function PlayGolfScreen() {
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseList = useSelector(state => state.golfCourseList)
    const {error, loading, golfCourses} = golfCourseList

    useEffect(() => {
        dispatch(listGolfCourses())

    }, [dispatch])


    return (
        <div>
            <Header userInfo={userInfo} />
            <div className='user-container'>
                <SideHeader page='play-golf' />
                <div className='user-content-container'>                                          
                        {loading 
                            ? <Loader />
                            : error 
                                ? <Message variant='danger'>{error}</Message>
                                : (                        
                                    <div>
                                        <div className='table-style-one-container'>                                            
                                            <div className='table-style-one-top-header'>
                                                <div>
                                                    <form>
                                                        <input className='table-style-one-search-bar' placeholder={'Search Courses'} />
                                                    </form>
                                                </div>
                                                <div>
                                                    <Link to={`/golfcourses/quick_enter`}>
                                                        <button className='table-style-one-button'>Quick Score</button>                                                                                                        
                                                    </Link>
                                                    
                                                </div>
                                            </div>                                            
                                            <div className='table-style-one'>
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>GOLF COURSE</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {golfCourses.map((golfCourse, i) => (
                                                            <tr key={i}>
                                                                <td>
                                                                    <div>
                                                                        <Link className='table-style-one-link' to={`/golfcourses/${golfCourse.course_id}/scorecard`}>
                                                                            <p>{golfCourse.name}</p>
                                                                        </Link>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                )                    
                        }                
                </div>
            </div>
            
        </div>
    )
}

