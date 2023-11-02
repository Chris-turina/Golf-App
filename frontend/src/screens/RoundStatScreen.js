import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { listRoundStats } from '../actions/roundStatsActions'
import { listRound } from '../actions/roundActions';
import Loader from '../components/Loader';
import Header from "../components/Header";
import SideHeader from "../components/SideHeader";

export default function RoundStatScreen() {

    const [showLoader, setShowLoader] = useState(true)
    const [showContent, setShowContent] = useState(false)

    const dispatch = useDispatch()
    const { id } = useParams()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const roundDetails = useSelector(state => state.roundDetails)
    const { loading, error, success, round } = roundDetails

    const roundStats = useSelector(state => state.roundStats)
    const { loading: LoadingStats, error: errorStats, stats} = roundStats

    console.log(stats);
    console.log(round);

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listRound(id))
            dispatch(listRoundStats(id))
            setShowLoader(false)
            setShowContent(true)
        }
    }, [dispatch, userInfo])

  return (
    <div>
        <Header userInfo={userInfo} />
        <div className='user-container'>
            <SideHeader page='rounds' />
            <div className='user-content-container'>
                {showLoader && <Loader />}
                {showContent && 
                    <div>
                        <div>
                            <p>Total Strokes</p>
                            <p>{stats.totalStrokes}</p>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
