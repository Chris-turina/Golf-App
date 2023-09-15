import React, { useState } from 'react'
import FormStyleOneInput from './FormStyleOneInput'
import ButtonOne from './Buttons/ButtonOne'

export default function FormStyleOne() {
    const [formData, setFormData] = useState({})

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={submitHandler} className='form-one-style'>
            <FormStyleOneInput
                label={'First Name'}
                type={'text'}
                name={'first_name'}
                placeholder={'Johnny'}

            />
            <FormStyleOneInput
                label={'Last Name'}
                type={'text'}
                name={'last_name'}
                placeholder={'Holt'}
            />

            <FormStyleOneInput
                label={'email'}
                type={'email'}
                name={'email'}
                placeholder={'johnnyboy23'}
            />

            <FormStyleOneInput
                label={'username'}
                type={'text'}
                name={'username'}
                placeholder={'johnnyBoy23'}
            />

            <FormStyleOneInput
                label={'Is Admin User'}
                type={'checkbox'}
                name={'username'}
                placeholder={'johnnyBoy23'}
            />

            <ButtonOne type={'submit'} text='Create User' />
            
        </form>
    )
}