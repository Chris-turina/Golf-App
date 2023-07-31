import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { logout } from '../actions/userActions';

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