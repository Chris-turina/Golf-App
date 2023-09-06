// IN USE

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
        console.log(holesData);
        holeContentUpdate(holesData)

    }

    return (
        <div className='header-spacer'>
            <form onSubmit={handleSubmit} className='form-style-one'>
                <table className='form-table-one'>                    
                    <tbody>
                        {holes.map((hole, i) => (
                            <tr key={hole.id} className='hole-rows'>
                                <td> <h3># {hole.number}</h3> </td>
                                <td>
                                    <label>Handicap:</label>
                                    <input 
                                        required
                                        type='number'
                                        name='handicap'
                                        placeholder='Hole Handicap'
                                        value={hole.handicap}
                                        onChange={e => handleChange(i,e)}                        
                                    />
                                </td>                            
                                
                                <td className='spacer'>
                                    
                                        <EditTees tees={hole.tees} />
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    
                </table>
                

                <button className='next-button' type='submit'>Next</button>
            </form>
        </div>
    )
}