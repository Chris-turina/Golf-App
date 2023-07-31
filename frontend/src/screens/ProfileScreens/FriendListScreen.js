import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { showProfile, findFriendsProfiles } from '../../actions/profileActions'
import { updateFriendRequest } from '../../actions/friendRequestActions'
import FriendRequest from '../../components/FriendRequest';
import ProfileSideHeader from '../../components/ProfileSideHeader';

export default function FriendListScreen() {    
    const [friendsList, setFriendsList] = useState( [] )
    const [newFriendRequests, setNewFriendRequests] = useState( [] )
    const [pendingFriendRequests, setPendingFriendRequests] = useState( [] )
    const [userId, setUserId] = useState(0)


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profile = useSelector(state => state.profile)
    const {loading:loadingProfile, error:errorProfile, success:successProfile, profile:myProfile} = profile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const friendRequest = useSelector(state => state.freindRequest)
    const {loading: loadingFriendRequest, success: successFriendRequest, f_r_notification} = friendRequest

    const profileList = useSelector(state => state.profileList)
    const {loading: loadingProfilesList, success:successProfilesList, profiles} = profileList
    
    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {              
            dispatch(showProfile())                         
            setFriendsList(myProfile.friends)            
            setPendingFriendRequests(myProfile.sent_friend_requests)  
            setUserId(userInfo.id)                    
        }
    }, [dispatch, id, user, success, userInfo])

    // THIS HANDLES SEARCH BAR AS THE USER LOOKS OF OTHER USERS TO BEFRIEND
    const handleOnChange = (e) => {
        if (e.target.value !== '') {
            const searchTerm = e.target.value
            dispatch(findFriendsProfiles(searchTerm))  
        }
              
    }

    // THIS FUNCTION HANDLES THE SEND FRIEND REQUEST
    const handleSend = (data) => {                       
        dispatch(updateFriendRequest(data))  
        window.location.reload(false)         
    }

    // THIS FUNCTION HANDLES ACCEPTING OR DECLINING THE FRIEND REQUEST
    const handleFriendRequestOnClick = (data) => {
        // if (data.status === 'accepted') {               
        //     dispatch(updateFriendRequest(data))
        //     window.location.reload(false)

        // } else if (data.status === 'rejected') {
        //     dispatch(updateFriendRequest(data))
        //     window.location.reload(false)
        // }

        dispatch(updateFriendRequest(data))
        window.location.reload(false)
        // WORKING HERE
    }

    const handleUnfriend = (e) => {
        const data = {'status': e.target.value}
        console.log(data)
        dispatch(updateFriendRequest(data))

    }
    // console.log(myProfile.friends);
    return (
        <Row>
            {loadingProfile && loadingProfilesList && loadingProfile
                ? <Loader />
                : errorProfile
                    ? <Message>{errorProfile}</Message>
                    : (
                        <Row>
                            <ProfileSideHeader userId={userId} />

                            <Col md={3}>
                                <h2>Friends</h2>
                                <div style={{ backgroundColor:'white'}}>
                                    {successProfile && myProfile.friends.map(friend => (                                                                                
                                        <FriendRequest                                        
                                            key={friend.profile_id}
                                            selection={handleFriendRequestOnClick}
                                            friend={friend}
                                            type={'unfriend'}
                                        />                                                         
                                    ))}
                                </div>
                            </Col>

                            <Col md={4}>
                                <Row>
                                    <h2>New Friend Requests</h2>
                                    <div>                        
                                        {successProfile && myProfile.received_friend_requests.map(request => (
                                            <FriendRequest
                                                key={request.id}
                                                selection={handleFriendRequestOnClick}
                                                request={request}
                                                type={'received'}
                                            />
                                        ))}
                                        
                                    </div>
                                </Row>
                                <Row>
                                    <h2>Pending Requests</h2>
                                    <div>
                                        {successProfile && myProfile.sent_friend_requests.map(request => (
                                            <FriendRequest
                                                key={request.id}
                                                request={request}
                                                type={'sent'}
                                            />
                                        ))}
                                    </div>
                                    
                                </Row>            
                            </Col>

                            <Col>
                                <Row>
                                    <p>Find Friends</p>
                                    <input onChange={e => handleOnChange(e)} type='search'></input>
                                </Row>
                                <Row>
                                    {successProfilesList && profiles.map(profile => (
                                        <FriendRequest
                                            key={profile.id}
                                            type={'send'}
                                            profile={profile}
                                            handleSend={handleSend}
                                        />
                                    ))}
                                </Row>

                            </Col>
                        </Row>
            )
        }


        </Row>
    )
}

