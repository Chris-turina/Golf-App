import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import SideHeader from "../components/SideHeader";


export default function PlayerScreen() {
    
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    
    useEffect(() => {        
        if (!userInfo) {            
            navigate('/login')
        }        
    }, [navigate, userInfo])


    return (
        <div>            
            <Header userInfo={userInfo} page='player' />
            <div className="user-container">
                <SideHeader page='player' />
                <div className="user-content-container">
                    <h1>Player Screen</h1>
                    <p>Number of Rounds Played</p>
                    <p>Handicap</p>
                    <p>Strkes gained </p>
                    <p>Messages</p>
                    <p>Friend Request</p>
                    <p>Play a roubd of golf =</p>
                </div>
            </div>
            
        </div>
            
    )
}

