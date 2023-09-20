import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Button, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { listGolfCourseDetails } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { createRound } from '../actions/roundActions';
import { ROUND_CREATE_RESET } from '../constants/roundConstants';
import InputScoreCard from '../components/InputScoreCard';
import Header from '../components/Header';
import TeeListItem from '../components/TeeListItem';


export default function SelectTeeScreen() {
    
    const [selectedTee, setSelectedTee] = useState(0)
    const [selectedTeeId, setSelectedTeeId] = useState('')
    const [selectedTeeHoles, setSelectedTeeHoles] = useState([])
    const [showForm, setShowForm] = useState(false) 


    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { loading, error, golfCourse} = golfCourseTeeDetails

    const roundCreate = useSelector(state => state.roundCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate} = roundCreate
    

    useEffect(() => {

        if (successCreate) {
            dispatch({ type: ROUND_CREATE_RESET})
            console.log('yes');
            navigate('/rounds')
        } 
        
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))    
        }

    }, [dispatch, id, successCreate])

// console.log(golfCourse);
    // This function handles when you click on a tee color, it takes the tee color ID and Color and sets the local state to determine which holes will be displayed
    
    return (
        <div>        
            <Header userInfo={userInfo} page='play-golf' />
            {loadingCreate && <Loader />} 
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}   
            {loading 
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>                            
                            <div className='select-tee-screen-title-container'>
                                <div className='select-tee-screen-back-arrow-container'>
                                    <i className="fa-solid fa-arrow-left"></i>
                                    <Link className='select-tee-link' to='/golfcourses'>
                                        <p>{golfCourse.name}</p>
                                    </Link>
                                    
                                </div>
                                <h3>Select A Tee</h3>    
                                <div className='empty-container'></div>
                            </div>                            
                            
                            <div className='content-container'>
                                Select Tees
                                
                            </div>
                            
                                        
                        </div>                        
                    )
            }            
        </div>
    )
}


