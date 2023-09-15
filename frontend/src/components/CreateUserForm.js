// Updated 9/12

// Add functionallity to create a new user

import React, {useState} from "react";
import FormStyleOneInput from "./FormStyleOneInput";

export default function CreateUserForm({createNewUser}) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)


    const submitHandler = (e) => {
        e.preventDefault()
        const data = {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            email: userEmail
        }

        createNewUser(data)

    }

    return (
        <div className="admin-content-item-container-style form-style-one-container">
            <form className="form-style-one" onSubmit={submitHandler}>
                <FormStyleOneInput 
                    label='First Name'
                    type={'text'}
                    name={'first_name'}
                    placeholder={'Jonny'}
                    value={firstName}
                    handleChange={(e) => setFirstName(e.target.value)}
                />

                <FormStyleOneInput 
                    label='Last Name'
                    type={'text'}
                    name={'last_name'}
                    placeholder={'Holt'}
                    value={lastName}
                    handleChange={(e) => setLastName(e.target.value)}
                />

                <FormStyleOneInput 
                    label='User Name'
                    type={'text'}
                    name={'username'}
                    placeholder={'JonnyBoy23'}
                    value={userName}
                    handleChange={(e) => setUserName(e.target.value)}
                />

                <FormStyleOneInput 
                    label='Email'
                    type={'email'}
                    name={'email'}
                    placeholder={'jonny@mail.com'}
                    value={userEmail}
                    handleChange={(e) => setUserEmail(e.target.value)}
                />

                

                <FormStyleOneInput 
                    label='Admin User'
                    type={'checkbox'}
                    name={'isAdmin'}
                    checked={isAdmin}
                    handleChange={(e) => setIsAdmin(e.target.checked)}
                />

                <button className="button-one-style" type="submit">Create User</button>
                
            </form>
        </div>
    )
}