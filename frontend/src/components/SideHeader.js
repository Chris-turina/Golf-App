import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function SideHeader({page}) {
    const [inactive, setInactive] = useState('user-side-header-inactive')
    const [active, setActive] = useState('user-side-header-active')

    let player = ''
    let playGolf = ''
    let rounds = ''
    let league = ''
    let admin = ''

    if (page === 'player') {        
        player = active
        playGolf = inactive
        rounds = inactive
        league = inactive
        admin = inactive

    } else if (page === 'play-golf') {
        player = inactive
        playGolf = active
        rounds = inactive
        league = inactive
        admin = inactive

    } else if (page === 'rounds') {
        player = inactive
        playGolf = inactive
        rounds = active
        league = inactive
        admin = inactive

    } else if (page === 'league') {
        player = inactive
        playGolf = inactive
        rounds = inactive
        league = active
        admin = inactive

    } else if (page === 'admin') {
        player = inactive
        playGolf = inactive
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

            <Link to={`/golfcourses`} className='user-side-header-link'>
                <div className={`user-side-header-button ${playGolf}`}>
                    <p>Play Golf</p>
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