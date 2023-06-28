import React from 'react';


function ScoreFormInput({props}) {     
    console.log(props);  
    return (
        <div className='formScoreInput'>
            <label>
                Hole: {props.num} <input hidden disabled value={props.props} />
            </label>
            <hr />
            <label>
                Yards: {props.yards} <input hidden disabled value={props.yards} />
            </label>
            <hr />
            <label>
                Score: <input name='score' type='number' placeholder='Enter Score' value={props.score} onChange={handleChange} />
            </label>
            <hr />
            <label>
                Putts: <input name='putts' type='nubmer' placeholder='Enter Putts' value={props.putts} onChange={handleChange}/>
            </label>
            <hr />
        </div>
    )
}

export default ScoreFormInput