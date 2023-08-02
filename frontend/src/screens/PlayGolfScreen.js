import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import CourseBooker from '../components/CourseBooker';
import { listGolfCourses, listTeeColors } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Title from '../components/Title'
import Header from '../components/Header';
import CourseListItem from '../components/CourseListItem';

export default function PlayGolfScreen() {
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseList = useSelector(state => state.golfCourseList)
    const {error, loading, golfCourses} = golfCourseList

    const teeColorList = useSelector(state => state.teeColorList)
    const { error: teeColorError, loading: teeColorLoading, teeColors} = teeColorList

    useEffect(() => {
        dispatch(listGolfCourses())
        dispatch(listTeeColors())

    }, [dispatch])


    return (
        <div>
            <Header userInfo={userInfo} page='play-golf' />
            <div className='play-golf-screen-container'>                        
            {loading 
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (                        
                        <div>
                            <h3 className='play-golf-screen-title'>Select Course</h3>
                            <div className='play-golf-screen-filter-options'>
                                <p>FAVORITE</p>
                                <p>PLAYED</p>
                                <p>SEARCH</p>
                            </div>
                            <div className='content-container'>
                                {golfCourses.map(golfCourse => (                            
                                        <CourseListItem
                                            golfCourse={golfCourse}                                        
                                            key={golfCourse.course_id}
                                        />
                                                    
                                ))}
                            </div>
                            
                        
                        </div>
                        
                    )
                    
            }
            </div>
        </div>
    )
}

