import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import CourseBooker from '../components/CourseBooker';
import { listGolfCourses, listTeeColors } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Title from '../components/Title'

function CourseSelector() {
    
    const dispatch = useDispatch()

    const golfCourseList = useSelector(state => state.golfCourseList)
    const {error, loading, golfCourses} = golfCourseList

    const teeColorList = useSelector(state => state.teeColorList)
    const { error: teeColorError, loading: teeColorLoading, teeColors} = teeColorList

    useEffect(() => {
        dispatch(listGolfCourses())
        dispatch(listTeeColors())

    }, [dispatch])


    return (
        <div className='my-container'>
            <Title props={'Select a Golf Course'} />
            {loading 
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className='my-second-container'>
                            {golfCourses.map(golfCourse => (                            
                                    <CourseBooker
                                        golfCourse={golfCourse}
                                        teeColors={teeColors}
                                        key={golfCourse.course_id}
                                    />
                                                 
                            ))}
                        
                        </div>
                    )
            }
            
        </div>
    )
}

export default CourseSelector