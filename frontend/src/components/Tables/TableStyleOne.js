import React from 'react'
import { Link } from 'react-router-dom';

export default function TableStyleOne({ thArray, tdArray, tdAttributes, dataPointUrl, topHeader, buttonText, searchBarText, handleButtonClick, handleActions, idName }) {

    const testClick = (e, dataId) => {    
        handleActions(e.target.value, dataId)
    }


    const renderData = (data) => {
        console.log(data.course_id);
        let newArry = []
        for (let i = 0; i < tdAttributes.length; i++) {
            const element = tdAttributes[i];  
            
            if (element === tdAttributes[0]) {
                
                newArry.push(
                    <td key={Math.floor(Math.random() * 100)}>
                        <div>
                            <Link className='table-style-one-link' to={`${dataPointUrl}${data[idName]}`}>
                                <p>{data[element]}</p>
                            </Link>
                        </div>
                    </td>
                )
            } else if (typeof(data[element]) === 'boolean') {
                
                if (data[element] === true) {
                    console.log(true);
                    newArry.push(<td key={Math.floor(Math.random() * 100)}>Yes</td>)
                } else if (data[element] === false) {
                    newArry.push(<td key={Math.floor(Math.random() * 100)}>No</td>)
                }
            } else if (element === 'ACTIONS') {

                newArry.push(
                    <td key={Math.floor(Math.random() * 100)}>
                        <select onChange={ e => testClick(e, data[idName])} className='table-style-one-dropdown'>
                            <option >ACTIONS</option>
                            <option value={'delete'}>DELETE</option>
                            <option value={'edit'}>EDIT</option>
                        </select>
                    </td>
                )

            } else {
                newArry.push(<td key={Math.floor(Math.random() * 100)}>{data[element]}</td>)
            }

            
        }                    
        return newArry
    }

    return (
        <div className='table-style-one-container'>
            {topHeader && 
                <div className='table-style-one-top-header'>
                    <div>
                        <form>
                            <input className='table-style-one-search-bar' placeholder={searchBarText} />
                        </form>
                    </div>
                    <div>
                        <button onClick={handleButtonClick} className='table-style-one-button'>{buttonText}</button>
                    </div>
                </div>
            }
            <div className='table-style-one'>
                <table>
                    <thead>
                        <tr>
                            {thArray.map((header, i) => (
                                <th key={i}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tdArray.map((data, i) => (
                            <tr key={i}>
                                {renderData(data)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    )
}