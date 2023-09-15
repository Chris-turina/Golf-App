import React, { useState } from 'react'

export default function CourseInfoEditTee({ teeBox, editCourseInfo}) {
    // const [newTeebox, setNewTeebox] = useState({teeBox})

    // console.log(newTeebox);
    // const handleChange = (name, value) => {        
    //     let data = [...teeBox]
    //     console.log(data);
    // }
    return (
        <div>
            <div>
                <h3>Edit Tee Box</h3>
                <form>
                    <div>
                        <label>Name</label>
                        <input 
                            type='name'
                            name='color'
                            placeholder='Tee Box Name'
                            value={teeBox.color}
                            // onChange={e => handleChange(e.target.name, e.target.value)}
                            readOnly
                        />
                    </div>
                    
                </form>
            </div>
        </div>
    )
}