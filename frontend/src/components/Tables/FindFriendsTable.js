import React, {useState} from "react"
import { Link } from 'react-router-dom';

export default function FindFriendsTable({ thArray, tdArray, tdArryTwo, tdAttributes, dataPointUrl, topHeader, buttonText, searchBarChange, handleActions, idName, handleButtonClick, handleSearchChange, handleAddFriend }) {

    const testClick = (e, dataId) => {    
        // handleActions(e.target.value, dataId)
    }
   
    const renderMyFriendData = (data) => {
        
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
                    newArry.push(<td key={Math.floor(Math.random() * 100)}>Yes</td>)
                } else if (data[element] === false) {
                    newArry.push(<td key={Math.floor(Math.random() * 100)}>No</td>)
                }
            } else if (element === 'ACTIONS') {

                newArry.push(
                    <td key={Math.floor(Math.random() * 100)}>
                        <button onClick={e => handleAddFriend(data)}>Add Friend</button>
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
        <div className='table-style-one-top-header'>
            <div>
                <form>
                    <input onChange={ e => handleSearchChange(e)} className='table-style-one-search-bar' placeholder= 'Find Friends' />
                </form>
            </div>
            <div>
                <button onClick={handleButtonClick} className='table-style-one-button'>{buttonText}</button>
            </div>
        </div>
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
                            {renderMyFriendData(data)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>    
  )
};
