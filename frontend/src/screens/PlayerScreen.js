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
                </div>
            </div>
            
        </div>
            
    )
}

