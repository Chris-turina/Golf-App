// IN USE
import React, { useState } from 'react'
import FormStyleOneInput from './FormStyleOneInput';

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
            <table className='edit-tees-table'>
                <tbody>
                    {tees.map((tee, i) => (
                        <tr key={tee.id} className='edit-tees-row-style'>
                            <td>
                                <p className='edit-tees-tee-title'>{tee.color}</p>
                            </td>
                            <td>
                                <FormStyleOneInput 
                                    label={'PAR'}
                                    type={'number'}
                                    name={'par'}
                                    placeholder={'4'}
                                    value={tee.par || ''}
                                    handleChange={e => handleChange(i,e)}
                                />
                            </td>
                            <td>
                                <FormStyleOneInput 
                                    label={'YARDS'}
                                    type={'number'}
                                    name={'yards'}
                                    placeholder={'314'}
                                    value={tee.yards || ''}
                                    handleChange={e =>handleChange(i,e)}
                                />
                            </td>
                        </tr>    
                    ))}
                                    
                </tbody>
            </table>
        </div>
    )
}