import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function SideHeader({page}) {
    const [inactive, setInactive] = useState('user-side-header-inactive')
    const [active, setActive] = useState('user-side-header-active')

    let player = ''
    let friends = ''
    let enterScore = ''
    let rounds = ''
    let league = ''
    let admin = ''

    if (page === 'player') {        
        player = active
        friends = inactive
        enterScore = inactive
        rounds = inactive
        league = inactive
        admin = inactive

    } else if (page === 'friends') {
        player = inactive
        friends = active
        enterScore = inactive
        rounds = inactive
        league = inactive
        admin = inactive

    } else if (page === 'play-golf') {
        player = inactive
        friends = inactive
        enterScore = active
        rounds = inactive
        league = inactive
        admin = inactive

    } else if (page === 'rounds') {
        player = inactive
        friends = inactive
        enterScore = inactive
        rounds = active
        league = inactive
        admin = inactive

    } else if (page === 'league') {
        player = inactive
        friends = inactive
        enterScore = inactive
        rounds = inactive
        league = active
        admin = inactive

    } else if (page === 'admin') {
        player = inactive
        friends = inactive
        enterScore = inactive
        rounds = inactive
        league = inactive
        admin = active
    }

    return (
        <div className='user-side-header'>                    
            
            <Link to={`/player`} className='user-side-header-link'>
                <div className={`user-side-header-button ${player}`}>
                    <p>Player</p>
                </div>
            </Link>

            <Link to={'/friends'} className='user-side-header-link'>
                <div className={`user-side-header-button ${friends}`} >
                    <p>Friends</p>
                </div>
            
            </Link>

            <Link to={`/golfcourses`} className='user-side-header-link'>
                <div className={`user-side-header-button ${enterScore}`}>
                    <p>Enter Score</p>
                </div>
            </Link>

            <Link to={`/rounds`} className='user-side-header-link'>
                <div className={`user-side-header-button ${rounds}`}>
                    <p>Rounds</p>
                </div>
            </Link>

            <Link to={`/`} className='user-side-header-link'>
                <div className={`user-side-header-button ${league}`}>
                    <p>League</p>
                </div>
            </Link>

            <Link to={`/admin/users/`} className='user-side-header-link'>
                <div className={`user-side-header-button ${admin}`}>
                    <p>Admin</p>
                </div>
            </Link>
        </div>
    )
}