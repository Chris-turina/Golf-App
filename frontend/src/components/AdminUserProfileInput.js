import React from 'react'

export default function AdminUserProfileInput({label, type, placeholder, value, handleChange, checked}) {
    return (
        <div className='admin-user-profile-input-container'>
            <label>{label}</label>
            <input 
                type={type}
                placeholder={placeholder}
                value={value}
                checked={checked}
                onChange={handleChange}
            />
        </div>
        
    )
}