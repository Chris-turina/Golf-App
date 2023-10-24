// Refactor This Screen

import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { listRounds } from '../actions/roundActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listGolfCourses } from '../actions/golfCourseActions';
import { deleteRound } from '../actions/roundActions';
import Header from '../components/Header';
import SideHeader from '../components/SideHeader';
import ListRoundsTable from '../components/Tables/ListRoundsTable';


function RoundsScreen() {

    const [showLoader, setShowLoader] = useState(true)
    const [showRounds, setShowRounds] = useState(false)

    const [roundsPlayed, setRoundsPlayed] = useState( [] )
    const [courses, setCourses] = useState( [] )    

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const roundList = useSelector(state => state.roundList)
    const { loading, error, sucess, rounds } = roundList

    const golfCourseList = useSelector(state => state.golfCourseList)
    const { loading: loadingCourse, error: errorCourse, golfCourses } = golfCourseList

    const roundStats = useSelector(state => state.roundStats)
    const { loading: loadingStats, error: errorStats, stats } = roundStats

    const roundDelete = useSelector(state => state.roundDelete)
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = roundDelete

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {            
            // dispatch(listGolfCourses())
            dispatch(listRounds())       
            setShowLoader(false)   
            setShowRounds(true)              
        }

        if (successDelete) {
            dispatch(listGolfCourses())
            dispatch(listRounds())
        }
    }, [dispatch, userInfo, successDelete])


    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this round?')) {
            dispatch(deleteRound(id))
        }
    }

    const routeChange = () => {
        navigate('/golfcourses')
    }
    

    
console.log(rounds);

    return (
        <div>
            <Header userInfo={userInfo} />
            <div className='user-container'>
                <SideHeader page='rounds' />
                <div className='user-content-container'>
                    <div>
                        {showLoader && <Loader/>}
                        {showRounds && 
                            <div>                                
                               <ListRoundsTable
                                    thArray={['STROKES', 'GOLF COURSE', 'DATE']}
                                    tdArray={rounds}
                                    tdAttributes={['strokes', 'course', 'created_at']}                                    
                                    topHeader={true}
                                    searchBarText={'Search Rounds'}
                                    buttonText={'Enter Score'}
                                    handleButtonClick={routeChange}                                
                               />
                            </div>
                        }
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default RoundsScreen