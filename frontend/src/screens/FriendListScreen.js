import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { showProfile, findFriendsProfiles } from '../actions/profileActions'
import { updateFriendRequest } from '../actions/friendRequestActions'
import FriendRequest from '../components/FriendRequest';

import Header from '../components/Header';
import SideHeader from '../components/SideHeader';
import FriendListTable from '../components/Tables/FriendListTable';
import { login } from '../actions/userActions';
import FindFriendsTable from '../components/Tables/FindFriendsTable';

export default function FriendListScreen() {    
    const [friendsList, setFriendsList] = useState( [] )    
    const [pendingFriendRequests, setPendingFriendRequests] = useState( [] )
    
    const [showMyFriendsTable, setShowMyFriendsTable] = useState(true)
    const [showFindFriendsTable, setShowFindFriendsTable] = useState(false)
    const [activeTable, setActiveTable] = useState('my-friends')



    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const userDetails = useSelector(state => state.userDetails)
    const {user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const profile = useSelector(state => state.profile)
    const {loading:loadingProfile, error:errorProfile, success:successProfile, profile:myProfile} = profile

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const profileList = useSelector(state => state.profileList)
    const {loading: loadingProfilesList, success:successProfilesList, profiles} = profileList
    
    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {              
            dispatch(showProfile())  
            setFriendsList(myProfile.friends)                   
        }
    }, [success])

    const handleTableChange = () => {
        if (activeTable === 'my-friends') {
            setShowMyFriendsTable(false)
            setShowFindFriendsTable(true)
            setActiveTable('find-friends')
        } else if (activeTable === 'find-friends') {
            setShowMyFriendsTable(true)
            setShowFindFriendsTable(false)
            setActiveTable('my-friends')
        }
    }

    // THIS HANDLES SEARCH BAR AS THE USER LOOKS OF OTHER USERS TO BEFRIEND
    const handleFindFriendsChange = (e) => {
        if (e.target.value !== '') {
            const searchTerm = e.target.value
            dispatch(findFriendsProfiles(searchTerm))  
        }
              
    }

    // THIS FUNCTION HANDLES THE SEND FRIEND REQUEST
    const handleSendFriendRequest = (data,e ) => {                 
        console.log(data);
        const friendRequest = {sender_id: myProfile.id, receiver_id:data.id, status:'send'}
        dispatch(updateFriendRequest(friendRequest))  
        // window.location.reload(false)         
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

        const handleAddFriend = () => {

        }

        dispatch(updateFriendRequest(data))
        window.location.reload(false)
        // WORKING HERE
    }

    // const handleUnfriend = (e) => {
    //     const data = {'status': e.target.value}
    //     console.log(data)
    //     dispatch(updateFriendRequest(data))

    // }
    // console.log(myProfile.friends);

console.log(myProfile);
    return (
        <div>
            {loadingProfile}
                
            {successProfile && 
                <div>
                    <Header userInfo={userInfo} />
                    <div className='user-container'>
                        <SideHeader page='friends' />
                        <div className="user-content-container">
                            <div className='friendlist-screen-row friendlist-screen-row-margin'>
                                <div className='friendlist-screen-box-container friendlist-stats-contanier'>
                                    <p>New Friend Requests</p>
                                </div>

                                <div className='friendlist-screen-box-container friendlist-stats-contanier'>
                                    <p>Awaiting Acceptance</p>
                                    {myProfile.sent_friend_requests.map(request => (
                                        <p>{request.receiver.first_name} {request.receiver.last_name}</p>
                                    )) }
                                </div>
                            </div>

                            <div className='friendlist-screen-row-margin'>
                                {showMyFriendsTable &&
                                    <FriendListTable
                                        thArray={['USERNAME', 'FIRST NAME', 'LAST NAME', 'ACTIONS']}
                                        tdArray={myProfile.friends}
                                        tdAttributes={['username', 'first_name', 'last_name', 'ACTIONS']}
                                        handleButtonClick={handleTableChange}
                                        buttonText={'Add Friend'}
                                        searchBarText={'Search My Friends'}
                                        
                                    
                                    /> 
                                }

                                {showFindFriendsTable &&
                                    <FindFriendsTable 
                                        thArray={['USERNAME', 'FIRST NAME', 'LAST NAME', 'ACTIONS']}
                                        tdArray={profiles}
                                        tdAttributes={['username', 'first_name', 'last_name', 'ACTIONS']}
                                        handleButtonClick={handleTableChange}
                                        handleSearchChange={handleFindFriendsChange}
                                        buttonText={'My Friends'}
                                        searchBarText={'Search'}
                                        handleAddFriend={handleSendFriendRequest}
                                    />

                                }


                                                                        
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
                    
            
        </div>
    )
}



                   
{/* <Col md={3}>
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
</Row> */}