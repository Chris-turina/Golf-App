import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createGolfCourse, getGolfCourseNewAdded } from '../../../actions/golfCourseActions';
import { updateBulkTeeBoxes } from '../../../actions/teeBoxActions';
import CourseQuestionnaire from '../../../components/CourseQuestionnaire';
import EditTeeBoxes from '../../../components/EditTeeBoxes';
import EditHoles from '../../../components/EditHoles';
import { updateAllHoles } from '../../../actions/holeActions';
import HeaderAdmin from '../../../components/HeaderAdmin';
import AdminSideHeader from '../../../components/AdminSideHeader';


export default function AdminCreateCourseScreen() {

    const [showCourseQuestions, setShowCourseQuestions] = useState(true)
    const [showTeeBoxes, setShowTeeBoxes] = useState(false)
    const [showHoles, setShowHoles] = useState(false)
    const [showBackArrow, setShowBackArrow] = useState(true)


    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const golfCourseCreate = useSelector(state => state.golfCourseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, golfCourse: createdGolfCourse } = golfCourseCreate

    const golfCourseNewAdded = useSelector(state => state.golfCourseNewAdded)
    const { loading: loadingNewCourse, error: errorNewCourse, success: successNewCourse, golfCourse: newCourse } = golfCourseNewAdded

    const teeBoxBulkUpdate = useSelector(state => state.teeBoxBulkUpdate)
    const {success: successTeeBoxUpdate, } = teeBoxBulkUpdate

    const holesBatchUpdate = useSelector(state => state.holesBatchUpdate)
    const {success: sucessHolesBatchUpdate} = holesBatchUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (successCreate) {
            dispatch(getGolfCourseNewAdded())
            setShowTeeBoxes(true)
            setShowCourseQuestions(false)
            setShowBackArrow(false)
            
        }

        if (successTeeBoxUpdate) {
            dispatch(getGolfCourseNewAdded())
            setShowTeeBoxes(false)
            setShowHoles(true)
        }

        if (sucessHolesBatchUpdate) {
            console.log('yes');
            navigate(`/admin/golf_courses/course/${newCourse.course_id}`)
        }


    }, [successCreate, setShowCourseQuestions, setShowTeeBoxes, successTeeBoxUpdate, sucessHolesBatchUpdate])

    

    // This Function calls an Action to send the data to the backend to create the Golf Course
    const recieveCourseData = (data) => {
        dispatch(createGolfCourse(data))
    }

    // This function calls an action that updates the created default tee box data
    const teeBoxContentUpdate = (data) => {        
        dispatch(updateBulkTeeBoxes(data, newCourse.course_id))
    }

    // THis Funtion updates the created holes and tees
    const holeContentUpdate = (data) => {
        
        dispatch(updateAllHoles(data, newCourse.course_id))
    }


   

    return (
        <div>            
            <HeaderAdmin userInfo={userInfo}/>
            <div className='admin-container'>
                <AdminSideHeader page='golf-courses' />
                <div className='admin-content-container'>
                    <div className='admin-new-row'>
                        {showCourseQuestions && <CourseQuestionnaire getCourseData={recieveCourseData} />}     
                    </div>
                    
                    {successNewCourse && showTeeBoxes && <EditTeeBoxes teeBoxes={newCourse.tee_boxes} teeBoxContentUpdate={teeBoxContentUpdate} />}
                    {successNewCourse && showHoles && <EditHoles holes={newCourse.holes}  holeContentUpdate={holeContentUpdate} /> }  
                </div>
                
                
            </div>


            
            
        </div>
    )
}