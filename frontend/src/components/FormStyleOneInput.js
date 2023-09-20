// Refactord 9/12

import React, { useState } from 'react'

export default function FormStyleOneInput({ label, name, type, placeholder, value, checked, handleChange, readOnly}) {
    if (type === 'text') {        
        return (
            <div className="has-float-label">
                <input 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                    
                <label>{label}</label>
            </div>
        )
    } else if (type === 'email') {
        return (
            <div className="has-float-label">
                <input 
                    type={type} 
                    name={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                    
                <label>{label}</label>
            </div>
        )
    } else if (type === 'checkbox') {        
        return (
            <div className="has-float-label">
                <input 
                    type={type}
                    name={name} 
                    placeholder={placeholder}
                    checked ={checked}
                    onChange={handleChange}
                />
                    
                <label>{label}</label>
            </div>
        )
    } else if (type === 'number') {        
        return (
            <div className='has-float-label'>
                <input 
                    type={type}
                    name={name} 
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
                    
                <label>{label}</label>
            </div>
        )
    } else if (type === 'holes') {        
        return (
            <div className='has-float-label'>
                <input 
                    type='number'
                    name={name} 
                    placeholder={placeholder}
                    onChange={handleChange}
                    value={value}
                    min={9}
                    max={18}
                    step={9}
                />
                    
                <label>{label}</label>
            </div>
        )
    } else if (readOnly === true) {
        console.log('here');
        return (
            <div className='has-float-label'>
                <input 
                    type='text'
                    name={name} 
                    placeholder={placeholder}                    
                    value={value}
                    readOnly        
                />
                    
                <label>{label}</label>
            </div>)
    }
    
    
    
    
    

    
}