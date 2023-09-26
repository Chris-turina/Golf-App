import React, {useEffect, useState} from "react"

export default function ScoreButton({ text }) {
    const [selectedStyle, setSelectedStyle] = useState(' ')

    useEffect(() =>{
        if (text === 1) {
            setSelectedStyle('score-button-style-one')
        } else if (text === 2) {
            setSelectedStyle('score-button-style-one')
        } else if (text === 3) {
            setSelectedStyle('score-button-style-three')
        } else if (text === 4) {
            setSelectedStyle('score-button-style-four')
        } else if (text === 5) {
            setSelectedStyle('score-button-style-five')
        } else if (text === 6) {
            setSelectedStyle('score-button-style-six')
        } else if (text === 7) {
            setSelectedStyle('score-button-style-six')
        } else if (text === 8) {
            setSelectedStyle('score-button-style-six')
        } else if (text === 9) {
            setSelectedStyle('score-button-style-six')
        } else if (text === 10) {
            setSelectedStyle('score-button-style-six')
        }
    })


  return (
    <div className={`score-button-style ${selectedStyle}`}>
      <p>{text}</p>
    </div>
  )
};
