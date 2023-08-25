import React, { useState } from 'react'
import EditTees from './EditTees'

export default function EditHoles({holes, holeContentUpdate}) {


    const [holesData, setHolesData] = useState([])

    const handleChange = (i,e) => {
        let data = [...holes]

        data[i][e.target.name] = parseInt(e.target.value)
        setHolesData(data)
    }

   console.log(holes);

    const handleSubmit = (e) => {
        e.preventDefault()
        holeContentUpdate(holesData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {holes.map((hole, i) => (
                    <div key={hole.id}>
                        <p>Hole {hole.number}</p>
                        <label>Handicap</label>
                        <input 
                            type='number'
                            name='handicap'
                            placeholder='Hole Handicap'
                            value={hole.handicap}
                            onChange={e => handleChange(i,e)}                        
                        />

                        <EditTees tees={hole.tees} />

                        
                    </div>
                ))}

                <button className='next-button' type='submit'>Next</button>
            </form>
        </div>
    )
}