import React, { useState } from 'react';
import { Link} from 'react-router-dom';

export default function Header ({userInfo, page}) {
    const [inactive, setInactive] = useState('header-inactive')
    const [active, setActive] = useState('header-active')


    let player = ''
    let playGolf = ''
    let rounds = ''
    let leauge = ''
    let admin = ''

    if (page === 'player') {        
        player = active
        playGolf = inactive
        rounds = inactive
        leauge = inactive
        admin = inactive

    } else if (page === 'play-golf') {
        player = inactive
        playGolf = active
        rounds = inactive
        leauge = inactive
        admin = inactive

    } else if (page === 'rounds') {
        player = inactive
        playGolf = inactive
        rounds = active
        leauge = inactive
        admin = inactive

    } else if (page === 'leauge') {
        player = inactive
        playGolf = inactive
        rounds = inactive
        leauge = active
        admin = inactive

    } else if (page === 'admin') {
        player = inactive
        playGolf = inactive
        rounds = inactive
        leauge = inactive
        admin = active
    }

   

    return(
        <header className='header'>
            <div className='header-title-container'>

                <div className='header-filler-box'>                    
                </div>

                <div className='header-title'>
                    <h1>{userInfo.first_name} {userInfo.last_name}</h1>
                    <p>Handicap</p>                
                </div> 

                <div className='header-settings'>
                    <Link to={`/profile/${userInfo.id}`}>
                        <i className="fa-solid fa-gear fa-xl" style={{color: "black"}}></i>
                    </Link>

                </div>  
                                                             
            </div>

            <div className='header-pages-container'>
                
                <Link className='header-link' to='/'>
                    <div className={`${player}`}>
                        <h6>PLAYER</h6>
                    </div>
                </Link>
                
                <Link className='header-link' to='/golfcourses'>
                    <div className={`${playGolf}`}>
                        <h6>PLAY GOLF</h6>
                    </div>
                </Link>
                
                <Link className='header-link' to='/rounds'>
                    <div className={`${rounds}`}>
                        <h6>ROUNDS</h6>
                    </div>
                </Link>
                
                <Link className='header-link' to='/'>
                    <div className={`${leauge}`}>
                        <h6>LEAUGE</h6>
                    </div>
                </Link>                            

                {userInfo && userInfo.isAdmin && (
                    <Link className='header-link' to='/admin'>
                        <div className={`${admin}`}>
                            <h6>ADMIN</h6>
                        </div>
                    </Link>
                )}
                
            </div>
        </header>
    )
}