import React, {useState} from 'react'

export default function EditTeeBoxes({ teeBoxes, teeBoxContentUpdate }) {

    const [teeBoxFields, setTeeBoxFields] = useState([])


    const handleChange = (i, e) => {
        let data = [...teeBoxes]
        console.log(e.target.type);

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
        <div>
            <form onSubmit={handleSubmit}>
                {teeBoxes.map((teeBox, i) => (
                    <div key={teeBox.id}>
                        <label>Tee Box Color</label>
                        <input
                            type='text'
                            name='color'                        
                            placeholder='Tee Box Color'
                            value = {teeBox.color}
                            onChange={e => handleChange(i, e)}
                        />

                        <label>Tee Box Handicap</label>
                        <input 
                            type='number'
                            name='handicap'
                            placeholder='Course Handicap'
                            value={teeBox.handicap}
                            onChange={e => handleChange(i, e)}
                        />

                        <label>Tee Box Slope</label>
                        <input 
                            type='number'
                            name='slope'
                            placeholder='Course Slope'
                            value={teeBox.slope}
                            onChange={e => handleChange(i,e)}
                        />
                    </div>                        
                ))}

                <button className='next-button' type='submit'>Next</button>
            </form>
            
        </div>
    )
}








