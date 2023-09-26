import React, {useEffect, useState} from "react"

export default function ScoreButton({ text, value, handleClick, selected }) {
    const [selectedStyle, setSelectedStyle] = useState(' ')
    const [buttonStyle, setButtonStyle] = useState(' ')

    useEffect(() =>{
        if (selected === value) {
            setSelectedStyle('score-button-selected-style')
        } else {
            setSelectedStyle(' ')
        }


        if (text === 1) {
            setButtonStyle('score-button-style-one')
        } else if (text === 2) {
            setButtonStyle('score-button-style-one')
        } else if (text === 3) {
            setButtonStyle('score-button-style-three')
        } else if (text === 4) {
            setButtonStyle('score-button-style-four')
        } else if (text === 5) {
            setButtonStyle('score-button-style-five')
        } else if (text === 6) {
            setButtonStyle('score-button-style-six')
        } else if (text === 7) {
            setButtonStyle('score-button-style-six')
        } else if (text === 8) {
            setButtonStyle('score-button-style-six')
        } else if (text === 9) {
            setButtonStyle('score-button-style-six')
        } else if (text === 10) {
            setButtonStyle('score-button-style-six')
        }

        
    })

    const handleClickEvent = () => {
        handleClick(value)
        setSelectedStyle('score-button-selected-style')
    }


  return (
    <div onClick={ e => handleClickEvent(value)} className={`score-button-style ${buttonStyle} ${selectedStyle}`}>
      <p>{text}</p>
    </div>
  )
};
