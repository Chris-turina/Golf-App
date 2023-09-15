import React, {useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from "react-redux";
import Header from '../../components/Header'
import AdminListItem from '../../components/AdminListItem';
import HeaderAdmin from '../../components/HeaderAdmin';
import AdminSideHeader from '../../components/AdminSideHeader';

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
            <HeaderAdmin userInfo={userInfo} />
            <div className='admin-container'>
                <AdminSideHeader />
                <div className='admin-content-container'>                    
                                  
                </div>          
                
            </div>
            
        </div>
    )
}