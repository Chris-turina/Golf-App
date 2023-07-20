import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { showProfile } from '../actions/profileActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profile = useSelector(state => state.profile)
    const {loading:loadingProfile, profile:myProfile} = profile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user || success || userInfo._id !== user._id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))                
                dispatch(showProfile())
            } else {                
                setEmail(user.email)
                setFirstName(user.first_name)
                setLastName(user.last_name)
            }
        }
    }, [dispatch, navigate, userInfo, user, success,loadingProfile])

    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id':user._id,
                'firstName': firstName,
                'lastName': lastName,
                'email': email,
                'password': password            
            }))
        }
    }
    console.log(myProfile);

    return (
        <Row>
            <Col md={3}>
                <h2>User Info</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && loadingProfile && <Loader />}

                <Form onSubmit={submitHandler}>

                    <Form.Group controlId='firstName'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Control 
                            type='name'                            
                            placeholder='First Name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='lastName'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            type='name'                            
                            placeholder='Last Name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>                    
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type='password'                        
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='confirm password'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type='password'                            
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>

                </Form>
            </Col>

            <Col md={3}>
                
            </Col>
            <Col md={6}>
                <Row>
                    <h2>New Friend Requests</h2>
                    <div>
                        {/* {myProfile.friend_requests.received_requests.map(request => (
                            <h2>{request.id}</h2>
                        ))} */}
                    </div>
                </Row>
                <Row>
                    <h2>Pending Requests</h2>
                    {/* {myProfile.friend_requests.sent_requests.map(request => (
                            <h2>{request.id}</h2>
                        ))} */}
                </Row>
                
            </Col>
        </Row>
    )
}

export default ProfileScreen