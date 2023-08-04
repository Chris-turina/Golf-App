import React, {useEffect, useState} from 'react';
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
import CreateCourseScoreCard from '../../../components/CreateCourseScoreCard';

export default function AdminCreateCourseScreen() {

    const [numberOfTeeBoxes, setNumberOfTeeBoxes] = useState(0)
    const [numberOfHoles, setNumberOfHoles] = useState(0)
    const [showQuestions, setShowQuestions] = useState(true)
    const [showScoreCard, setShowScoreCard] = useState(true)


    const dispatch = useDispatch()
    const navigate = useNavigate()


    const golfCourseCreate = useSelector(state => state.golfCourseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, golfCourse: createdGolfCourse } = golfCourseCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    const handleSubmit = (e) => {
        e.preventDefault()
        setNumberOfHoles(e.target.holes.value)    
        setShowQuestions(false)    
        setShowScoreCard(true)
    }

    return (
        <div>
             <Header userInfo={userInfo} page='admin' />
            <div>
                <div className='admin-user-list-screen-back-arrow-container'>
                    <i className="fa-solid fa-arrow-left"></i>
                    <Link className='select-tee-link' to='/admin/golf_courses'>
                        <p>Admin</p>
                    </Link>                    
                </div>               
            </div>            
            <CreateCourseScoreCard />
        </div>
    )
}