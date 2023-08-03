import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Header from '../../components/Header'
import AdminListItem from '../../components/AdminListItem';

export default function AdminScreen() {

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
            <Header userInfo={userInfo} page='admin' />            
            <div className='admin-screen-container'>
                <div className='admin-content-container'>
                    <AdminListItem link='users' title='Users' />
                    <AdminListItem link='golf_courses' title='Golf Courses'/>
                </div>
            </div>
        </div>
    )
}