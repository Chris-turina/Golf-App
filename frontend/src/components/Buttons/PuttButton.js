import React, { useEffect, useState } from "react"

export default function PuttButton({ text, value, handleClick, selected }) {

    
    const [selectedStyle, setSelectedStyle] = useState(' ')
    const [buttonStyle, setButtonStyle] = useState(' ')

    useEffect(() => {
        if (selected === value) {
            console.log('yes');
            setSelectedStyle('putt-button-selected-style')
        } else {
            console.log('no');
            setSelectedStyle(' ')
        }
    })

    const handleClickEvent = () => {
        handleClick(value)
        setSelectedStyle('putt-button-selected-style')
    }


  return (
    <div onClick={e => handleClickEvent(value)} className={`putt-button-style ${buttonStyle} ${selectedStyle}`}>
        <p>{text}</p>
    </div>
  )
};
