import React from 'react'
import { Link } from 'react-router-dom';

export default function ListRoundsTable({ thArray, tdArray, tdSecondArray, tdAttributes, dataPointUrl, topHeader, buttonText, searchBarText, handleButtonClick, handleActions, idName }) {

    const months = {
        '01': 'January',
        '02': 'Febuary',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'Septemeber',
        '10': 'October',
        '11': 'November',
        '12': 'Decemeber'
    }


    const renderData = (data) => {
        let newArry = []
        for (let i = 0; i < tdAttributes.length; i++) {
            const element = tdAttributes[i];  
            if (element === 'strokes') {
                newArry.push(
                    <td key={Math.floor(Math.random() * 100)}>
                        <div>
                            <Link className='table-style-one-link' to={`${data.id}/stats`}>
                                <p>{data.roundStats[0].totalStrokes}</p>
                            </Link>
                        </div>
                    </td>
                )
            } else if (element === 'created_at') {
                let dateTimeArray = []
                let dateArray = []
                const date = data[element]
                dateTimeArray = date.split('T')
                dateArray = dateTimeArray[0].split('-')
                let year = dateArray[0]
                let monthNum = dateArray[1]
                let day = dateArray[2]
                let month = months[monthNum]
                
                newArry.push(
                    <td key={Math.floor(Math.random() * 100)}>
                        <div>                            
                            <p>{month} {day}</p>                            
                        </div>
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