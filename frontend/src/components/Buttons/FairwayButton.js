import React, {useEffect, useState} from "react"

export default function FairwayButton({ text, itemId, handleClick, selected, value }) {

    const [selectedStyle, setSelectedStyle] = useState('')

    useEffect(() =>{
        if (selected === value) {
            setSelectedStyle('fairway-button-selected-style')
        } else {
            setSelectedStyle('')
        }
    })
    
    const handleClickEvent = (value) => {        
        handleClick(value)
        setSelectedStyle('fairway-button-selected-style')
    }

  return (
    <div key={itemId} onClick={e => handleClickEvent(value)} className={` fairway-button-style ${selectedStyle}`}>
        <p>{text}</p>
    </div>
  )
};
