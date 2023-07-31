import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams, redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { showProfile, updateFriendRequestList, findFriendsProfiles } from '../../actions/profileActions'
import { updateFriendRequest } from '../../actions/friendRequestActions'
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import FriendRequest from '../../components/FriendRequest';
import ProfileSideHeader from '../../components/ProfileSideHeader';

export default function ProfileScreen() {
    const [firstName, setFirstName] = useState('')
    const [userId, setUserId] = useState(0)
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [showRequests, setShowRequests] = useState(false)
    const [receivedRequestArr, setReceivedRequestArr] = useState( [] )

    const [renderProfile, setRenderProfile] = useState(true)
    const [showFriends, setShowFriends] = useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profile = useSelector(state => state.profile)
    const {loading:loadingProfile, success:successProfile, profile:myProfile} = profile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const friendRequest = useSelector(state => state.freindRequest)
    const {loading: loadingFriendRequest, success: successFriendRequest, f_r_notification} = friendRequest

    const profileList = useSelector(state => state.profileList)
    const {loading: loadingProfilesList, profiles} = profileList


    useEffect(() => {
        if(!userInfo) {
            console.log('1');
            navigate('/login')            
        } else {
            if (!user || success || userInfo._id !== user._id ) {
                console.log('2');
                dispatch(getUserDetails(id))
                dispatch(showProfile())                 
            } else {
                console.log('3');
                setFirstName(user.first_name)
                setLastName(user.last_name)
                setUsername(user.username)
                setEmail(user.email)
                setUserId(userInfo.id)
                setShowRequests(true)                
            }                        
        }
    }, [dispatch, id, user, success, userInfo, successFriendRequest])
// console.log(!userInfo);
//     console.log(firstName);
//     console.log(myProfile);

    // THIS FUNCTION CALLS THE ACTION TO CHANGE THE USER INFORMATION
    const submitHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id':user._id,
                'firstName': firstName,
                'lastName': lastName,
                'username': username,
                'email': email,
                'password': password            
            }))
        }
    }    

    // THIS FUNCTION SHOWS THE FRIEND LIST
    const renderFriendList = () => {        
        if (myProfile.friends.length === 0) {
            return (
                <Col md={4}>
                <h2>Friends</h2>
                    <p>It looks like you don't have any friends yet</p>
                </Col>
                
            )
        } else {
            return (
                <Col md={3}>
                    <h2>Friends</h2>
                    <div style={{ backgroundColor:'white'}}>
                        {myProfile.friends.map( friend => (
                            <p key={friend.profile_id}>{friend.first_name} {friend.last_name}</p>
                        ))}
                    </div>
                </Col>
            )
        }
    }

    // THIS FUNCTION SHOWS THE FRIEND REQUESTS THAT HAVE BEEN SENT AND REQUESTED
    const renderRequests = () => {
        const allNewFriendRequestArr = myProfile.received_friend_requests
        const allPendingFriendRequestsArr = myProfile.sent_friend_requests
        const newFriendRequests = []
        const pendingFriendRequests = []
        for (let i = 0; i < allNewFriendRequestArr.length; i++) {
            const request = allNewFriendRequestArr[i];            
            if (request.action === 1) {
                newFriendRequests.push(request)
            }
        }

        for (let i = 0; i < allPendingFriendRequestsArr.length; i++) {
            const request = allPendingFriendRequestsArr[i];
            if (request.action === 1) {
                pendingFriendRequests.push(request)
            }
            
        }

        const handleFriendRequestOnClick = (data) => {          
            console.log(data);
            if (data.status === 'accepted') {               
                dispatch(updateFriendRequest(data))
                // dispatch(showProfile())

            } else if (data.status === 'rejected') {
                dispatch(updateFriendRequest(data))
            }
        }
        return(
            <Col md={4}>
                <Row>
                    <h2>New Friend Requests</h2>
                    <div>                        
                        {newFriendRequests.map(request => (
                            <FriendRequest key={request.id} selection={handleFriendRequestOnClick} request={request} type={'received'} />
                        ))}
                    </div>
                </Row>
                <Row>
                    <h2>Pending Requests</h2>
                    <div>
                        {pendingFriendRequests.map(request => (
                            <FriendRequest key={request.id} request={request} type={'sent'} />
                        ))}
                    </div>
                    
                </Row>            
            </Col>
        )
    }

    // THIS FUNCTION SHOWS THE SEARCH BAR TO FIND FRIENDS
    const renderFindFriends = () => {
        const handleOnChange = (e) => {
            if (e.target.value !== '') {
                const searchTerm = e.target.value
                dispatch(findFriendsProfiles(searchTerm))  
            }
                  
        }

        const handleSend = (data) => {                       
            dispatch(updateFriendRequest(data))            
        }

        return (
            <Col>
                <Row>
                    <p>Find Friends</p>
                    <input onChange={e => handleOnChange(e)} type='search'></input>
                </Row>
                <Row>
                    {profiles.map(profile => (
                        <FriendRequest key={profile.id} type={'send'} profile={profile} handleSend={handleSend}  />
                    ))}
                </Row>

            </Col>
        )
    }

    const handleRenderChange = (e) => {
        const page = e.target.value
        if (page === 'profile') {
            setShowFriends(false)
            setRenderProfile(true)
        } else if (page === 'friends') {
            setShowFriends(true)
            setRenderProfile(false)
        }
    }

    return (
        <Row>        
            {loading && <Loader />}
            <ProfileSideHeader userId={userId} />
            {renderProfile && <Col md={4}>
                <h2>User Info</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && loadingProfile && loadingFriendRequest && <Loader />}

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

                    <Form.Group controlId='username'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control 
                            type='email'
                            placeholder='Enter Email'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
            </Col>}

            {showFriends && renderFriendList()}
            {showFriends && renderRequests()}
            {showFriends && renderFindFriends()}
                    
        </Row>
    )
}