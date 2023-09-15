// TODO
// See how many users there are
// Add a ticket system so a user can report problems-> Way down the road feature
// Add Functionaliyt to create a new user from the admin panel

// Refactored 9/12

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listUsers, deleteUser } from '../../../actions/userActions';
import HeaderAdmin from '../../../components/HeaderAdmin';
import AdminSideHeader from '../../../components/AdminSideHeader';
import CreateUserForm from '../../../components/CreateUserForm';
import TableStyleOne from '../../../components/Tables/TableStyleOne';

export default function AdminUserListScreen() {

    const [mainLoading, setMainLoading] = useState(true)
    const [showCreateUserForm, setShowCreateUserForm] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete
 
    

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            navigate('/login')
        }

    }, [dispatch, navigate, successDelete, userInfo])

    const changingComponents = (screen) => {
        if (screen === 'create-user') {
            setMainLoading(false)
            setShowCreateUserForm(true)
        }

    } 

    const createNewUser = (data) => {
        console.log(data);
        setShowCreateUserForm(false)
        setMainLoading(true)
        
        // Style the Form to create a new user 
        // Hook up to the back end so It can create a new User
        // On sussess of Create New User, Reload the page
    }


    return (
        <div>
            <HeaderAdmin userInfo={userInfo} />
            <div className='admin-container'>
                <AdminSideHeader page='users' />
            
            {loading && mainLoading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div className='admin-content-container'>
                            
                            {mainLoading && 

                                <div className='admin-user-new-row'>
                                    <div className='admin-users-number-of-container admin-users-content-container-style'>
                                        <p># Users: 15</p>
                                    </div>
                                    
                                    <div className='admin-users-number-of-container admin-users-content-container-style'>
                                        <p>Ticket System</p>
                                    </div> 
                                </div>
                            }
                            { mainLoading &&
                                <TableStyleOne 
                                thArray = {['USERNAME','ID', 'FIRST NAME', 'LAST NAME' , 'ADMIN']}
                                tdArray = {users}
                                tdAttributes = {[ 'username', 'id', 'first_name', 'last_name', 'isAdmin']}
                                dataPointUrl ={`/admin/users/`}
                                topHeader = {true}
                                buttonText = {'Add User'}
                                searchBarText = {'Search Users'}
                                handleButtonClick = {(e) => changingComponents('create-user')}
                                idName = {'id'}
                                />
                            }
                            
                            
                            {showCreateUserForm && 
                                <div className='admin-user-new-row'>
                                    <CreateUserForm createNewUser={createNewUser} />
                                </div>                                
                            }
                                                  
                        </div>
                        

                        
                    )}
            </div>
        </div>
    )
}