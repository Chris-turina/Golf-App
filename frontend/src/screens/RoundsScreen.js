import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
// import CourseInfo from '../components/CourseInfo';
import { listRounds } from '../actions/roundActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listGolfCourses } from '../actions/golfCourseActions';
import { deleteRound } from '../actions/roundActions';

function RoundsScreen() {
    const [showRounds, setShowRounds] = useState(true)
    const [roundsPlayed, setRoundsPlayed] = useState( [] )
    const [courses, setCourses] = useState( [] )    

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const roundList = useSelector(state => state.roundList)
    const { loading, error, rounds } = roundList

    const golfCourseList = useSelector(state => state.golfCourseList)
    const { loading: loadingCourse, error: errorCourse, golfCourses } = golfCourseList

    const roundStats = useSelector(state => state.roundStats)
    const { loading: loadingStats, error: errorStats, stats } = roundStats

    const roundDelete = useSelector(state => state.roundDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = roundDelete

    useEffect(() => {
        if (!userInfo) {
            navigate('login')
        } else {            
            dispatch(listGolfCourses())
            dispatch(listRounds())
            
            
        }
    }, [dispatch, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this round?')) {
            dispatch(deleteRound(id))
        }
    }
    

    const renderRounds = () => {
        if (rounds.length === 0) {
            return (
                <div>
                    <p>You Have not played any rounds!!!</p>
                </div>
            )
        } else {
            
            return (
                <div>                    
                    {rounds.map(round => (
                        <div key={round.id} className='round-card'>   
                            <Link className='round-card-title' to={`/rounds/${round.id}/stats`}>
                                <h3 className='round-card-title-text'>{round.course}</h3>
                            </Link>                                                
                            <p> Tee: <strong>{round.teeColorUsed}</strong></p>
                            <hr/>
                            <p><strong>{round.roundStats[0].totalStrokes}</strong> strokes</p>
                            <hr/>
                            <Button variant='danger' className='btn-sm'onClick={() => deleteHandler(round.id)} >
                                <i className='fas fa-trash'></i>
                            </Button>
                            
                        </div>
                    ))
                    
                    }
                </div>
            )
        }
    }
// console.log(stats);

    return (
        <div>

            {loading && loadingStats
                ? <Loader />
                : error
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>
                            {showRounds && renderRounds()}
                        </div>
                    )
            }
        </div>
    )
}

export default RoundsScreen