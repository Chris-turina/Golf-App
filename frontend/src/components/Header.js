import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import { useNavigate, redirect } from 'react-router-dom';
import {browserHistory} from 'react-router'

function Header () {
// WORKING ON GETTING THE LOGOUT BUTTON TO NAVIGATE TO THE HOME PAGE ON LOGOUT
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)    
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const logoutHandler = () => {        
        dispatch(logout())

    }



    return (
        <header>
            <Navbar  expand="lg" collapseOnSelect className='header'>
                <Container>

                    <LinkContainer to="/">
                        <Navbar.Brand>GRIP IT & RIP IT</Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <LinkContainer to="/golfcourses">
                                <Nav.Link>Enter Score</Nav.Link>
                            </LinkContainer>                                                    
                            
                            <LinkContainer to="/rounds">
                                <Nav.Link>Rounds</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.username} id='username'>
                                    <LinkContainer to={`/profile/${userInfo.id}`}>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    {/* <LinkContainer to="/"> */}
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    {/* </LinkContainer>                                     */}
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link>Login</Nav.Link>
                                </LinkContainer>    
                            )}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/golfcourselist'>
                                        <NavDropdown.Item>Gof Courses</NavDropdown.Item>
                                    </LinkContainer>                                

                                </NavDropdown>
                            )}
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header