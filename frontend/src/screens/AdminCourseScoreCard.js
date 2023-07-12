import React, { useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { listGolfCourseDetails, createTeeColor, deleteTeeColor, updateTeeColor } from '../actions/golfCourseActions';
import { createTees, deleteTeeBatch, addedToHole} from '../actions/teeActions';
import { TEE_COLOR_CREATE_RESET } from '../constants/golfCourseConstants';

function AdminCourseScoreCard() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { loading, error, golfCourse } = golfCourseHoleDetails

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id])

    return (
        <div>
            <Link to='/admin/golfcourselist'>
                    Go Back
            </Link>
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            Yup
                        </div>
                    )
            }
        </div>
    )
}

export default AdminCourseScoreCard