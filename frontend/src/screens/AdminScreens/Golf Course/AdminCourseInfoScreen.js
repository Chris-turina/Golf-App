import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { 
    listGolfCourseDetails, 
    updateGolfCourseHoles, 
    updateGolfCourseTeeColors, 
    createTeeColor,
    deleteTeeColor
} from '../../../actions/golfCourseActions';
import { deleteTeeBatch } from '../../../actions/teeActions';
import Title from '../../../components/Title';
import Header from '../../../components/Header';


export default function AdminCourseInfoScreen() {

    const [showTees, setShowTees] = useState(true)
    const [editTeeArr, setEditTeeArr] = useState( [] )
    const [totalYards, setTotalYards] = useState( [] )
    const [teeColorText, setTeeColorText] = useState( [] )
    const [editHolesArr, setEditHolesArr] = useState ( [] )

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { loading, error, golfCourse: courseHoles } = golfCourseHoleDetails

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { loading: loadingTeeColors, error: errorTeeColors, golfCourse: courseTeeColors } = golfCourseTeeDetails

    const teeColorDelete = useSelector(state => state.teeColorDelete)
    const { loading: loadingTeeColorDelete, error: errorTeeColorDelete, success: successTeeColorDelete } = teeColorDelete

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id, successTeeColorDelete])    

    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
        </div>
    )
}