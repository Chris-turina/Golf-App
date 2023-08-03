import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import { getUserDetails, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'
import Header from '../../components/Header'
import AdminUserProfileInput from '../../components/AdminUserProfileInput'

export default function AdminUserProfileScreen() {

    const { id } = useParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/users')
        } else {
            
            if (!user.first_name ||  user.id !== Number(id)  ) {
                console.log(user)    
                console.log(id);        
                dispatch(getUserDetails(id))
            } else {                
                setFirstName(user.first_name)
                setLastName(user.last_name)   
                setUsername(user.username)             
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [user, id, successUpdate, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, firstName, lastName, username, email, isAdmin }))
    }

    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
            <div className='admin-user-list-screen-back-arrow-container'>
                <i className="fa-solid fa-arrow-left"></i>
                <Link className='select-tee-link' to='/admin/users'>
                    <p>Users</p>
                </Link>
                    
            </div>
            <div className='admin-user-profile-content-container'>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                    : (
                        <form onSubmit={submitHandler}>

                            <AdminUserProfileInput
                                label='First Name'
                                type='name'
                                placeholder='First Name'
                                value={firstName}
                                handleChange={(e) => setFirstName(e.target.value)}
                            />

                            <AdminUserProfileInput
                                label='Last Name'
                                type='name'
                                placeholder='Last Name'
                                value={lastName}
                                handleChange={(e) => setLastName(e.target.value)}
                            />
                           

                            <AdminUserProfileInput
                                label='User Name'
                                type='name'
                                placeholder='User Name'
                                value={username}
                                handleChange={(e) => setUsername(e.target.value)}
                            />
                          

                            <AdminUserProfileInput
                                label='Email'
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                handleChange={(e) => setEmail(e.target.value)}
                            />                            

                            <AdminUserProfileInput
                                label='Is Admin'
                                type='checkbox'
                                checked={isAdmin}
                                handleChange={(e) => setIsAdmin(e.target.checked)}
                            />                            

                            <button 
                                type='submit'
                                className='admin-user-profile-screen-submit'
                            >
                                    Update User
                            </button>
                        </form>
                    )
                }
            </div>
        </div>
    )
}