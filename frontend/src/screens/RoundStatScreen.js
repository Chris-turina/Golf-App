import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { listRoundStats } from '../actions/roundStatsActions'
import { listRound } from '../actions/roundActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import StatCard from '../components/StatCard';
import { render } from 'react-dom';
import Title from '../components/Title';

function RoundStatScreen() {
    const [showStats, setShowStats] = useState(true)
    const [plus, setPlus] = useState('+')


    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const roundDetails = useSelector(state => state.roundDetails)
    const { loading, error, round } = roundDetails

    const roundStats = useSelector(state => state.roundStats)
    const { loading: LoadingStats, error: errorStats, stats} = roundStats


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listRound(id))
            dispatch(listRoundStats(id))
            
        }
    }, [dispatch])


    const renderStats = () => {      
        console.log(round);  
        const score = stats.totalStrokes - stats.totalCoursePar
        let overUnderPar ='' 
        if (score > 0) {
            overUnderPar = `${plus}${score}`
        } else if(score < 0) {
            overUnderPar = `${score}`
        } else {
            
        }

        if (round.length === 0) {
            return (
                <p>You have no stats</p>
            )
        } else {
            return (
                <div className='my-second-container'>                    
                    <StatCard title={'Course Played'} value={round.course} />
                    <StatCard title={'Tee Played'} value={round.teeColorUsed} />
                    <StatCard title={'Total Holes'} value={stats.totalHoles} />
                    <StatCard title={'Course Par'} value={stats.totalCoursePar} />
                    <StatCard title={'Course Distance'} value={`${stats.totalDistance} yards`} />
                    <StatCard title={'Strokes'} value={stats.totalStrokes} />
                    <StatCard title={'To Par:'} value={overUnderPar} />
                    <StatCard title={'Total Putts'} value={stats.totalPutts} />                
                </div>
            )
        }
        
        
        

        
    }

    return (
        <div>
            {loading && LoadingStats
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div className='my-container'>      
                            <Title props={'Round Stats'} />
                            {showStats && renderStats()}
                        </div>
                        
                    )

            }
        </div>
    )
}

export default RoundStatScreen;