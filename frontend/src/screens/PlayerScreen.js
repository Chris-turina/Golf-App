import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import SideHeader from "../components/SideHeader";


export default function PlayerScreen() {


    const [showScreen, setShowScreen] = useState(false)
    
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    
    useEffect(() => {        
        if (!userInfo) {            
            navigate('/login')
        } else {
            setShowScreen(true)
        }        
    }, [navigate, userInfo])


    return (
                    
        <div>            
            <Header userInfo={userInfo} />
            <div className="user-container">
                <SideHeader page='player' />
                <div className="user-content-container">
                    <div className="player-screen-row">
                        <div className='player-screen-box-container player-stats-contanier'>
                            <p>Handicap</p>
                            <p>15</p>
                        </div>

                        <div className='player-screen-box-container player-stats-contanier'>
                            <p>Last Round</p>
                            <p>15</p>
                        </div>

                        <Link to={`/friends`} className="player-screen-link">
                            <div className='player-screen-box-container player-friends-contanier'>
                                <p>Friend Requests</p>
                                <p>0</p>
                            </div>
                        </Link>
                        

                    </div>
                    
                </div>
            </div>            
        </div>
    )
}

