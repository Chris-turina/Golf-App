import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listGolfCourseDetails } from '../actions/golfCourseActions';
// import { ROUND_CREATE_RESET, ROUND_CREATE_SUCCESS } from '../constants/roundConstants';
import { createRound } from '../actions/roundActions';
import { listCourseTees } from '../actions/teeActions';
import Header from '../components/Header';
import SideHeader from '../components/SideHeader';
import ScoreCardInputTable from '../components/ScoreCardInputTable';
import FormStyleOneInput from '../components/FormStyleOneInput';

export default function QuickEnterScreen() {
    
    const [courseInfoLoaded, setCourseInfoLoaded] = useState(false)
    const [showScoreCard, setShowScoreCard] = useState(false)
    const [showButton, setShowButton] = useState(true)

    const [courseName, setCourseName] = useState('')
    const [teeBoxName, setTeeBoxName] = useState('')
    const [numOfHoles, setNumOfHoles] = useState(0)
    const [holesArr, setHolesArr] = useState( [] )
    
    const [selectTeeTitle, setSelectTeeTitle] = useState('SELECT TEE')
    const [selectedTeeBox, setSelectedTeeBox] = useState({})
    const [showTeeOptions, setShowTeeOptions] = useState(false)
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseDetails = useSelector(state => state.golfCourseDetails)
    const {loading, success, golfCourse} = golfCourseDetails

    const courseTeeList = useSelector(state => state.courseTeeList)
    const {success: teeListSuccess, courseTees} = courseTeeList

    const roundCreate = useSelector(state => state.roundCreate)
    const {success: roundCreateSuccess} = roundCreate
    
    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {
        
        if (!userInfo) {
            navigate('/login')
        } 

    }, )
    

    // const handleTeeClick = (teeBox) => {
    //     setSelectedTeeBox(teeBox)
    //     setSelectTeeTitle(teeBox.tee_color)
    //     setShowTeeOptions(false)
    //     setShowScoreCard(true)

    // }

    const handleScoreSubmit = (data) => {
        const round = {'tees': data, 'teeColor':selectedTeeBox.tee_id, 'golfCourse': golfCourse.course_id }
        console.log(selectedTeeBox);
        dispatch(createRound(round))
        

    }

    const handleShowScoreCard = (e) => {
        e.preventDefault()
        console.log(courseName, teeBoxName, numOfHoles);
        let holes = []
        for (let i = 0; i < numOfHoles; i++) {
            holes.push({'hole_number':i+1, 'strokes':0 })            
        }
        setHolesArr(holes)
        setShowButton(false)
        setShowScoreCard(true)

    }
    console.log(holesArr);
    

    return (
        <div>
            <Header userInfo={userInfo} page='play-golf' />
            <div className='user-container'>
                <SideHeader page='play-golf'/>
                <div className='user-content-container'>
                <div>
                    Go Back
                </div>
                
                <div className='admin-content-item-container-style form-style-one-container'>
                    <form onSubmit={e => handleShowScoreCard(e)} className='form-style-one'>
                        <div>
                            <FormStyleOneInput 
                                label={'Course Name'}
                                type={'text'}
                                name={'course-name'}
                                placeholder={'Highlands Golf Club'}
                                value={courseName || ''}
                                handleChange={e => setCourseName(e.target.value)}
                            />

                            <FormStyleOneInput 
                                label={'Tee Box Name'}
                                type={'text'}
                                name={'tee_box_name'}
                                placeholder={'Black'}
                                value={teeBoxName || ''}
                                handleChange={e => setTeeBoxName(e.target.value)}
                            />

                            <FormStyleOneInput 
                                label={'# of Holes'}
                                type={'holes'}
                                name={'num_of_holes'}
                                placeholder={'18'}
                                value={numOfHoles || ''}
                                handleChange={e => setNumOfHoles(parseInt(e.target.value))}
                            />
                        </div>
                        {showButton && 
                            <button type='submit' className='button-one-style'>Show Score Card</button>
                        }
                    </form>
                    
                </div>

                {showScoreCard && 
                    <div>
                        <ScoreCardInputTable teeBox={selectedTeeBox} holes={holesArr} handleScoreSubmit={handleScoreSubmit} />
                    </div>
                }
                
                </div>
            </div>
            
        </div>
    )
}