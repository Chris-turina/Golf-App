import React, {useEffect, useState} from "react"

export default function ButtonThree({ text, itemId, handleClick, selected, item }) {

    const [selectedStyle, setSelectedStyle] = useState('')

    useEffect(() =>{
        if (selected.id === itemId) {
            setSelectedStyle('button-style-three-selected')
        } else if (Object.hasOwn(item, 'completed') === true) {
            setSelectedStyle('button-style-three-completed')
        } else {
            setSelectedStyle('button-style-three-not-completed')
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
