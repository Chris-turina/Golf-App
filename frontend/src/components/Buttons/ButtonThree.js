import React, {useEffect, useState} from "react"

export default function ButtonThree({ text, itemId, handleClick, selected }) {

    const [selectedStyle, setSelectedStyle] = useState('')

    useEffect(() =>{
        if (selected.id === itemId) {
            setSelectedStyle('button-style-three-selected')
        } else {
            setSelectedStyle('')
        }
    })
    
    const handleButtonClick = (e) => {        
        handleClick(e)
    }

  return (
    <div key={itemId} onClick={e => handleButtonClick(e)} className={` button-style-three ${selectedStyle}`}>
        <p>{text}</p>
    </div>
  )
};
