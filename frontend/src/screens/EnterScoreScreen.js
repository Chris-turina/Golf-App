import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listGolfCourseDetails } from '../actions/golfCourseActions';
import { ROUND_CREATE_RESET } from '../constants/roundConstants';
import { listCourseTees } from '../actions/teeActions';
import Header from '../components/Header';
import SideHeader from '../components/SideHeader';
import ScoreCardInputTable from '../components/ScoreCardInputTable';

export default function EnterScoreScreen() {

    const [courseInfoLoaded, setCourseInfoLoaded] = useState(false)
    const [showScoreCard, setShowScoreCard] = useState(false)
    
    const [selectTeeTitle, setSelectTeeTitle] = useState('SELECT TEE')
    const [selectedTeeBox, setSelectedTeeBox] = useState({})
    const [showTeeOptions, setShowTeeOptions] = useState(false)
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseDetails = useSelector(state => state.golfCourseDetails)
    const {loading, success, golfCourse} = golfCourseDetails

    const courseTeeList = useSelector(state => state.courseTeeList)
    const {success: teeListSuccess, courseTees} = courseTeeList

    
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))    
            dispatch(listCourseTees(id))             
        }

        if (success) {
            setCourseInfoLoaded(true)            
        }

    }, [dispatch, id, success])
    

    const handleTeeClick = (teeBox) => {
        console.log(teeBox);
        setSelectedTeeBox(teeBox)
        setSelectTeeTitle(teeBox.tee_color)
        setShowTeeOptions(false)
        setShowScoreCard(true)

    }
    
    console.log(golfCourse);

    return (
        <div>
            <Header userInfo={userInfo} page='play-golf' />
            <div className='user-container'>
                <SideHeader page='play-golf'/>
                <div className='user-content-container'>
                <div>
                    Go Back
                </div>

                {courseInfoLoaded && 
                    <div className='select-tee-box-card'>
                        <p onClick={e => setShowTeeOptions(true)}>{selectTeeTitle}</p>
                        {showTeeOptions && courseTees.map((teeBox, i) => (
                            <div onClick={e => handleTeeClick(teeBox)} key={i} className='tee-box-select-item'>
                                <p>{teeBox.tee_color}</p>
                            </div>
                        ))}
                    </div>
                }

                {showScoreCard && 
                    <div>
                        <ScoreCardInputTable teeBox={selectedTeeBox} holes={golfCourse.holes} />
                    </div>
                }
                
                </div>
            </div>
            
        </div>
    )
}