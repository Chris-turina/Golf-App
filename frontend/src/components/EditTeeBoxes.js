// IN USE

import React, {useState} from 'react'

export default function EditTeeBoxes({ teeBoxes, teeBoxContentUpdate }) {

    const [teeBoxFields, setTeeBoxFields] = useState([])


    const handleChange = (i, e) => {
        let data = [...teeBoxes]

        if (e.target.type === 'text') {
            data[i][e.target.name] = e.target.value    
        } else if (e.target.type === 'number') {
            data[i][e.target.name] = parseInt(e.target.value)
        }
        setTeeBoxFields(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        teeBoxContentUpdate(teeBoxFields)
    }

    return (
        <div className='header-spacer'>
            <form onSubmit={handleSubmit} className='form-style-one'>
                <table className='form-table-one'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name </th>
                            <th>Handicap</th>
                            <th>Slope</th>
                            <th>Par</th>
                            <th>Front - 9 YDS</th>
                            <th>Back - 9 YDS</th>
                            <th>Total YDS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teeBoxes.map((teeBox, i) => (
                        <tr key={teeBox.id}>
                            <td>
                                <p>{teeBox.id}</p>
                            </td>

                            <td>
                                <input
                                    type='text'
                                    name='color'
                                    placeholder='Tee Box Name'
                                    value={teeBox.color}
                                    onChange={e => handleChange(i, e)}
                                />
                            </td>

                            <td>
                                <input 
                                    type='number'
                                    name='handicap'
                                    placeholder='Handicap'
                                    value={teeBox.handicap}
                                    onChange={e => handleChange(i, e)}
                                />
                            </td>

                            <td>
                                <input 
                                    type='number'
                                    name='slope'
                                    placeholder='Slope'
                                    value={teeBox.slope}
                                    onChange={e => handleChange(i,e)}
                                />
                            </td>

                            <td>
                                <input
                                    type='number'
                                    name='par'
                                    placeholder='Par'
                                    value={teeBox.par}
                                    onChange={e => handleChange(i,e)}
                                />
                            </td>

                            <td>
                                <input 
                                    type='number'
                                    name='front_nine_yards'
                                    placeholder='Front 9 Distance'
                                    value={teeBox.front_nine_yards}
                                    onChange={e => handleChange(i,e)}
                                />
                            </td>

                            <td>
                                <input 
                                    type='number'
                                    name='back_nine_yards'
                                    placeholder='Back 9 Distance'
                                    value={teeBox.back_nine_yards}
                                    onChange={e => handleChange(i,e)}
                                />
                            </td>

                            <td>
                                <input 
                                    type='number'
                                    name='total_yards'
                                    placeholder='Total Yards'
                                    value={teeBox.total_yards}
                                    onChange={e => handleChange(i,e)}
                                />
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








