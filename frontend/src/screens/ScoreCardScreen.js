// DEPRICATE ON NEXT REFACTOR


// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate, Link } from 'react-router-dom';
// import { listRoundStats } from '../actions/roundStatsActions'
// import { listRound } from '../actions/roundActions';
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import { Button } from 'react-bootstrap';
// import ScoreCardHole from '../components/ScoreCardHole';
// import ScoreCard from '../components/ScoreCard';


// function ScoreCardScreen() {

//     const [showScoreCard, setShoeScoreCard] = useState(true)
    
    
//     const dispatch = useDispatch()
//     const { id } = useParams() 
//     const navigate = useNavigate()

//     const userLogin = useSelector(state => state.userLogin)
//     const { userInfo } = userLogin

//     const roundDetails = useSelector(state => state.roundDetails)
//     const { loading, error, success, round } = roundDetails

//     useEffect(()=> {
//         if (!userInfo) {
//             navigate('/login')
//         } else {
//             dispatch(listRound(id))
//             dispatch(listRoundStats(id))
            
//         }
//     }, [dispatch, id])

//     const renderScoreCard = () => {
//         console.log('Yes');
//         console.log(round);

//         if (loading === false) {
//             return (                
//                 <div>
//                     <ScoreCard round={round} />
//                 </div>  
//             )
//         }
        
//     }

//     return (
//         <div>
//             {loading
//                 ? <Loader />
//                 : error
//                     ? <Message variant='danger'>{error}</Message>
//                     : (
//                         <div className='score-card'>
//                             <div className='score-card-hole'>                                                                                                                 
//                                 {showScoreCard && renderScoreCard() }
//                             </div>                            
//                         </div>
//                     )
//             }
//         </div>
//     )
// }

// export default ScoreCardScreen