import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector,  } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { listUsers, deleteUser } from '../../actions/userActions';
import Header from '../../components/Header';
import AdminUserListItem from '../../components/AdminUserListItem';

export default function AdminUserListScreen() {
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

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(id))
        }
    }


    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
            {loading
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <div className='admin-user-list-screen-back-arrow-container'>
                                <i className="fa-solid fa-arrow-left"></i>
                                <Link className='select-tee-link' to='/admin'>
                                    <p>Admin</p>
                                </Link>                                    
                            </div>
                            <div className='admin-user-list-screen-container'>
                                <div className='admin-user-list-content-container'>
                                    <AdminUserListItem
                                        headerStyle='admin-user-list-item-header'
                                        id='ID'
                                        username='USERNAME'
                                        firstName='FIRST NAME'
                                        lastName='LAST NAME'
                                        admin='ADMIN'
                                    />
                                    {users.map(user => (
                                        <Link to={`/admin/users/${user.id}`} className='admin-user-list-screen-link' key={user.id}>
                                            <AdminUserListItem                                         
                                            id={user.id}
                                            username={user.username}
                                            firstName={user.first_name}
                                            lastName={user.last_name}
                                            admin={user.isAdmin}
                                        />
                                        </Link>
                                    
                                ))}
                            </div>
                        </div>
                        </div>
                        

                        
                    )}
        </div>
    )
}