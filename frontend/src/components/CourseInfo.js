import React, { useState } from 'react';

function CourseInfo({ teeColor}) {
    const [showHoleInfo, setShowHoleInfo] = useState()
    
    
    const handleClick = () => {
        
        console.log('I was Clicked');
        console.log(teeColor);
        setShowHoleInfo(
            teeColor.hole_info?.map(hole => (
                <div>
                    {hole.hole_number}
                    {hole.hole_distance}
                    {hole.par}
                </div>
            ))
        )
    }
    
    return(
        <div onClick={handleClick}>
            {teeColor.tee_box_color}
            {showHoleInfo}
        </div>
    )
}

export default CourseInfo