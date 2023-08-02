import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";


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
            <main>
                <h1>Player Screen</h1>
            </main>            
        </div>
            
    )
}

