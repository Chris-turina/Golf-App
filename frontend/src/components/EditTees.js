// IN USE
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
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Par</th>
                    <th>Yards</th>
                </tr>
            </thead>
            <tbody>
                {tees.map((tee, i) => (
                    <tr key={tee.id}>
                        <td>{tee.color}</td>
                        <td>
                            <input 
                                type='number'
                                name='par'
                                placeholder='Par'
                                value={tee.par}
                                onChange={e => handleChange(i,e)}
                            />
                        </td> 
                        <td>
                            <input 
                                type='number'
                                name='yards'
                                placeholder='Yards'
                                value={tee.yards}
                                onChange={e => handleChange(i,e)}
                            />
                        </td>                                                       
                    </tr>
                ))}
            </tbody>
            
        </table>
    )
}