import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';

function LoginScreen() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const [showLoader, setShowLoader] = useState(true)

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error} = userLogin

    
    useEffect(() => {
        if (userInfo) {
            navigate('/player')
        } else (
            setShowLogin(true)            
        )
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(username, password))
    }

    return (
        <div className='login-screen-container'>

            
            {showLogin && <div className='login-container'>
                <div className='login-title-container'>
                    <h5 className='login-title'>GRIP IT & RIP IT</h5>
                </div>
                <form className='login-form' onSubmit={submitHandler}>

                    <div className='login-input-container'>
                        <label><b>USERNAME</b></label>
                        <input
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}                    
                        />                
                    </div>       

                    <div className='login-input-container'>
                        <label><b>PASSWORD</b></label>
                        <input
                            placeholder='Enter Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}                    
                        />
                    </div>
                    <button className='login-submit' type='submit'><b>SIGN IN</b></button>
                </form>
                
                <Link className='login-link' to={'/register'}>
                    <button className='login-create-account'><b>CREATE ACCOUNT</b></button>
                </Link>            
            </div>}
        </div>
    )
}

export default LoginScreen