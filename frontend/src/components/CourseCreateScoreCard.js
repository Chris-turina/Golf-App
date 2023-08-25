import React, {useState} from 'react'

export default function CourseCreateScoreCard({newCourse, addTee}) {
    const [showTees, setShowTees] = useState(true)
    console.log(newCourse);

    const handleClick = () => {
        addTee()
    }

    const renderTees = () => {
        
    }

    return (
        <div>
            <div onClick={handleClick}>Add a Tee</div>
            <div className='score-card'>
                <div className='score-card-row'>
                    <div className='table-head'>
                        <p>{newCourse.name}</p>
                    </div>
                    
                    <div className='score-card-hole-numbers'>
                        {newCourse.holes.map((hole, i) => (
                            <p key={i}>{hole.number}</p>
                        ))}
                    </div>
                </div>

                <div className='score-card-row'>
                    {newCourse.tee_boxes.map((teeBox, i) => (
                        <div key={i} className='table-head'>
                            <div className='tee-box-head'>
                                <p>{teeBox.tee_box_color}</p>
                                <p>{teeBox.front_nine_distance + teeBox.back_nine_distance}</p>
                            </div>
                            <div className='score-card-hole-numbers'>
                                {showTees && renderTees() }
                            </div>

                        </div>    
                    ))}
                </div>
                
            </div>
        </div>
    )
}