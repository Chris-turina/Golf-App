import React, { useEffect, useState } from "react";

export default function ButtonTwo({ item, itemId, handleClick, index, selected}) {
    
    const [selectedStyle, setSelectedStyle] = useState('')

    useEffect(() =>{
        if (selected.id === itemId) {
            setSelectedStyle('button-style-two-selected')
        } else {
            setSelectedStyle('')
        }
    })
    
    const handleButtonClick = (e) => {
        
        handleClick(e)
    }

    return (
        <div key={itemId} onClick={e => handleButtonClick(e)} className={` button-style-two button-margin ${selectedStyle}`}>
            <p>{index + 1}</p>
        </div>
    ) 
}