import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import CourseInfo from '../components/CourseInfo';
import { listRounds } from '../actions/roundActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listGolfCourses } from '../actions/golfCourseActions';

function RoundsScreen() {
    const [renderCourseList, setRenderCoureseList] = useState(true)
    const [roundsPlayed, setRoundsPlayed] = useState( [] )
    const [courses, setCourses] = useState( [] )    

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseList = useSelector(state => state.golfCourseList)
    const { loading, error, golfCourses } = golfCourseList

    const roundList = useSelector(state => state.roundList)
    const { loading: loadingRounds, error: errorRounds, rounds } = roundList

    useEffect(() => {
        if (!userInfo) {
            navigate('login')
        } else {            
            dispatch(listGolfCourses())
            dispatch(listRounds())
            
            
        }
    }, [dispatch, userInfo])

    const renderCoursesPlayed = () => {
       
        const roundsCounter = []
        const newCoursesArr = []
        let count = 0
        for (let i = 0; i < rounds.length; i++) {
            const round = rounds[i].course;            
            roundsCounter.push(round)
        }

        for (let i = 0; i < golfCourses.length; i++) {
            const course = golfCourses[i];      
            course.roundsPlayed = roundsCounter.filter(x => x==course.course_id).length
            newCoursesArr.push(course)
            
        }
        return (
            <Row>            
                {newCoursesArr.map(golfCourse => (
                    <Row key={golfCourse.course_id}>
                        <Card style={{ width: '20rem', marginTop:'3rem', marginBottom: '3rem'}}>
                            <Card.Title>{golfCourse.name}</Card.Title>
                            <Card.Body>Rounds Played: {golfCourse.roundsPlayed}</Card.Body>
                        </Card>                                    
                    </Row>
                ))}          
                
            </Row>
        )
    }

    return (
        <div>
            Rounds Played

            {loading
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            {renderCourseList && renderCoursesPlayed()}
                        </div>
                    )
            }
        </div>
    )
}

export default RoundsScreen