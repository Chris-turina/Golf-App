// Depricate this Component

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Button, Col } from 'react-bootstrap';

export default function ProfileSideHeader({ userId}) {

    return (
            <Col md={1}>                
                <LinkContainer to={`/profile/${userId}`} >
                    <Button size='sm'>Profile</Button>
                </LinkContainer>
                <hr />
                <LinkContainer to={`/profile/${userId}/friends`} >
                    <Button size='sm'>Friends</Button>
                </LinkContainer>
                <hr />
                <LinkContainer to={`/profile/${userId}`}>
                    <Button>Golf Bag</Button>
                </LinkContainer>
            </Col>        
    )
}