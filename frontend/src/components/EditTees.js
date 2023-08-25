import React, { useState } from 'react'

export default function EditTees({tees}) {

    const [teesData, setTeesData] = useState([])

    const handleChange = (i,e) => {
        let data = [...tees]
        console.log(data);
        data[i][e.target.name] = parseInt(e.target.value)
        setTeesData(data)
    }

    return (
        <div>
            {tees.map((tee, i) => (
                <div key={tee.id}>
                    <p>{tee.color}</p>

                    <label>Par</label>
                    <input 
                        type='number'
                        name='par'
                        placeholder='Par'
                        value={tee.par}
                        onChange={e => handleChange(i,e)}
                    />

                    <label>Yards</label>
                    <input 
                        type='number'
                        name='yards'
                        placeholder='Yards'
                        value={tee.yards}
                        onChange={e => handleChange(i,e)}
                    />
                </div>

            ))}
        </div>
    )
}