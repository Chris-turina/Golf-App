import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function FriendRequest({ request, type, selection }) {

    const handleSelection = (e) => {
        const data = e.target.value
        selection(data)
    }


    if (type === 'received') {
        return (
            <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{request.sender.first_name} {request.sender.last_name}</p>
                <div>
                    <Button variant='success' className='my-1' value='accept' onClick={(e) => handleSelection(e)}>
                        Accept
                    </Button>

                    <Button variant='danger' className='my-1' value='decline' onClick={(e) => handleSelection(e)}>
                        Decline
                    </Button>
                    
                    
                </div>                
            </div>
        )
    } else if (type ==='sent') {
        return (
            <div style={{display:'flex', justifyContent:'space-between', backgroundColor: 'white'}}>
                <p>{request.receiver.first_name} {request.receiver.last_name}</p>
                <p>Waiting For {request.receiver.first_name}...</p>                         
            </div>
        )        
    }
}

export default FriendRequest