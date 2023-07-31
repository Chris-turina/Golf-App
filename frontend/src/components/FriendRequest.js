import React from 'react'
import { Button } from 'react-bootstrap'


function FriendRequest({ request, profile, friend, type, selection, handleSend }) {
    console.log(profile);
    const handleSelection = (e) => {        
        console.log(request.id);
        const data = {"status":e.target.value, "id":request.id}
        selection(data)
    }

    const handleRequest = (e) => {
        const data = {"status":e.target.value, "id":profile.id}
        handleSend(data)
    }


    if (type === 'received' && request.action ===1) {
        return (
            <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{request.sender.first_name} {request.sender.last_name}</p>
                <div>
                    <Button variant='success' className='my-1' value='accepted' onClick={(e) => handleSelection(e)}>
                        Accept
                    </Button>

                    <Button variant='danger' className='my-1' value='rejected' onClick={(e) => handleSelection(e)}>
                        Decline
                    </Button>
                    
                    
                </div>                
            </div>
        )

    } else if (type ==='sent'&& request.action ===1) {
        console.log(request);
        return (
            <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{request.receiver.first_name} {request.receiver.last_name}</p>
                <p>Waiting For {request.receiver.first_name}...</p>                         
            </div>
        )     

    } else if (type === 'send'){
        return (
            <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{profile.first_name} {profile.last_name}</p>
                <div>
                    <Button variant='success' className='my-1' value='send' onClick={(e) => handleRequest(e)}>
                        Send
                    </Button>                                    
                </div>                
            </div>
        )
    } else if (type === 'unfriend') {
        <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{friend.first_name} {friend.last_name}</p>
                <div>                    
                    <Button variant='danger' className='my-1' value='unfriend' onClick={(e) => handleRequest(e)}>
                        Unfriend
                    </Button>
                </div>                
            </div>
    }
}

export default FriendRequest