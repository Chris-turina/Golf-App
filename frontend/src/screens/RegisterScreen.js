import React, { useState, useEffect} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

function RegisterScreen() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo } = userRegister

    useEffect(() => {
        if( userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            console.log(firstName, lastName);
            dispatch(register(firstName, lastName, username, email, password))
        }
    }

    return (
        <div className='register-screen-container'>
            <div className='register-container'>
                <div className='register-title-container'>
                    <h5 className='register-title'>GRIP IT & RIP IT</h5>
                    <Link to='/login'>
                        <p>Login</p>
                    </Link>
                    
                </div>
                <form className='register-form' onSubmit={submitHandler}>
                    <div className='register-input-container'>
                        <label><b>FIRST NAME</b></label>
                        <input 
                            required
                            placeholder='First Name'
                            type='name'
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div className='register-input-container'>
                        <label><b>LAST NAME</b></label>
                        <input 
                            required
                            placeholder='Last Name'
                            type='name'
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div className='register-input-container'>
                        <label><b>USERNAME</b></label>
                        <input 
                            required
                            placeholder='User Name'
                            type='name'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className='register-input-container'>
                        <label><b>EMAIL</b></label>
                        <input 
                            required
                            placeholder='sample@email.com'
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='register-input-container'>
                        <label><b>PASSWORD</b></label>
                        <input 
                            required
                            placeholder='Enter Password'
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className='register-input-container'>
                        <label><b>CONFIRM PASSWORD</b></label>
                        <input 
                            required
                            placeholder='Confirm Password'
                            type='password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button className='register-create-account' type='submit'><b>CREATE ACCOUNT</b></button>
                </form>

            </div>
        </div>
    )
}

export default RegisterScreen