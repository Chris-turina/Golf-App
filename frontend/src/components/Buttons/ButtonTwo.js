import React from "react";

export default function ButtonTwo({ teeBox, teeBoxId, handleClick, index}) {
    console.log(index);
    return (
        <div key={teeBoxId} onClick={handleClick} className={` button-style-two button-margin`}>
            <p>{index}</p>
        </div>
    ) 
}