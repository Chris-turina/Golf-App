// IN USE
// -Refactored 9/12

import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../components/Loader'
import Message from '../../../components/Message'
import { getUserDetails, updateUser } from '../../../actions/userActions'
import { USER_UPDATE_RESET } from '../../../constants/userConstants'
import FormStyleOneInput from '../../../components/FormStyleOneInput'
import ButtonOne from '../../../components/Buttons/ButtonOne'

import HeaderAdmin from '../../../components/HeaderAdmin'
import AdminSideHeader from '../../../components/AdminSideHeader'

export default function AdminUserProfileScreen() {

    const { id } = useParams()

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [showForm, setShowForm] = useState(false)

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
                dispatch(getUserDetails(id))
            } else {                
                setFirstName(user.first_name)
                setLastName(user.last_name)   
                setUsername(user.username)             
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
                setShowForm(true)
            }
        }

    }, [user, id, successUpdate, dispatch, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ id: user.id, firstName, lastName, username, email, isAdmin }))
    }

    console.log('We Are Here');
    console.log(isAdmin);

    return (
        <div>
            <HeaderAdmin userInfo={userInfo} />
            <div className='admin-container'>
                <AdminSideHeader page='users' />
                <div className='admin-content-container'>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                    { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                        : (
                            <div className='admin-users-content-container'>
                                <div className='admin-users-content-container-style'>

                                    {showForm && <form onSubmit={submitHandler} className='form-one-style'>
                                        <FormStyleOneInput
                                            label={'First Name'}
                                            type={'text'}
                                            name={'first_name'}
                                            placeholder={'Johnny'}
                                            value={firstName}
                                            handleChange={(e) => setFirstName(e.target.value)}

                                        />
                                        <FormStyleOneInput
                                            label={'Last Name'}
                                            type={'text'}
                                            name={'last_name'}
                                            placeholder={'Holt'}
                                            value={lastName}
                                            handleChange={(e) => setLastName(e.target.value)}
                                        />

                                        <FormStyleOneInput
                                            label={'email'}
                                            type={'email'}
                                            name={'email'}
                                            placeholder={'johnnyboy23'}
                                            value={email}
                                            handleChange={(e) => setEmail(e.target.value)}
                                        />

                                        <FormStyleOneInput
                                            label={'username'}
                                            type={'text'}
                                            name={'username'}
                                            placeholder={'johnnyBoy23'}
                                            value={username}
                                            handleChange={(e) => setUsername(e.target.value)}
                                        />

                                        <FormStyleOneInput
                                            label={'Is Admin User'}
                                            type={'checkbox'}
                                            name={'isAdmin'}
                                            checked={isAdmin}
                                            handleChange={(e) => setIsAdmin(e.target.checked)}
                                        />
                                        

                                        <ButtonOne type={'submit'} text='Update User' />
                                        
                                    </form>}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}