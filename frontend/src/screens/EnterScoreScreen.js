import React from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import Header from '../components/Header';
import InputScoreCard from '../components/InputScoreCard';

export default function EnterScoreScreen() {

    const { state } = useLocation()
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    


    console.log(state);
    

    
    

    return (
        <div>
            <Header userInfo={userInfo} page='play-golf' />
            <div className='enter-score-screen-container'>
                <div className='enter-score-screen-title-container'>
                    <div className='enter-score-screen-back-arrow'>
                        <i className="fa-solid fa-arrow-left"></i>
                        <Link className='enter-score-link' to={`/golfcourses/${state.golf_course.course_id}`}>
                            <p>{state.tee_color.colors}</p>
                        </Link>
                        
                    </div>
                    <h3>Enter Score</h3>
                    <div className='empty-container'></div>                    
                </div>
                <div className='content-container'>
                    <InputScoreCard holes={state.golf_course.holes} teeUsed={state.tee_color.id}/>
                </div>
            </div>
        </div>
    )
}