import React, {useEffect, useState} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createGolfCourse, getGolfCourseNewAdded } from '../../../actions/golfCourseActions';
import { updateBulkTeeBoxes } from '../../../actions/teeBoxActions';
import Header from '../../../components/Header';
import CourseQuestionnaire from '../../../components/CourseQuestionnaire';
import EditTeeBoxes from '../../../components/EditTeeBoxes';
import EditHoles from '../../../components/EditHoles';
import { updateAllHoles } from '../../../actions/holeActions';

export default function AdminCourseInfoScreen() {

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    
    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
            <div>
                
                
            </div>
            


            
        </div>
    )
}