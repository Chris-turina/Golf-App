import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { listGolfCourseDetails, listTeeColors } from '../actions/golfCourseActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ScoreFormInput from '../components/ScoreFormInput';
import { createRound } from '../actions/roundActions';
import Title from '../components/Title';
import { ROUND_CREATE_RESET } from '../constants/roundConstants';
import InputScoreCard from '../components/InputScoreCard';

// TODO Change to Score Input Screen
function PlayRoundScreen() {
    
    const [selectedTee, setSelectedTee] = useState(0)
    const [selectedTeeId, setSelectedTeeId] = useState('')
    const [selectedTeeHoles, setSelectedTeeHoles] = useState([])
    const [showForm, setShowForm] = useState(false) 
    const [createArr, setCreateArr] = useState( [ {hole: '', yards: '', score: '', putts: '' }] )


    const dispatch = useDispatch()
    const { id } = useParams();
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { loading, error, golfCourse} = golfCourseTeeDetails

    const roundCreate = useSelector(state => state.roundCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate} = roundCreate
    

    useEffect(() => {

        if (successCreate) {
            dispatch({ type: ROUND_CREATE_RESET})
            console.log('yes');
            navigate('/rounds')
        } 
        
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))    
        }

    }, [dispatch, id, successCreate])

// console.log(golfCourse);
    // This function handles when you click on a tee color, it takes the tee color ID and Color and sets the local state to determine which holes will be displayed
    const teeColorClickHandler = (teeId, color) => {
        setSelectedTee(color)
        setSelectedTeeId(teeId)
        setSelectedTeeHoles([])
        const teeHoles = [...selectedTeeHoles]           

        if (selectedTeeHoles.length === 0) {
            for (let i = 0; i < golfCourse.holes.length; i++) {
                const hole = golfCourse.holes[i];                 

                for (let i = 0; i < hole.tees.length; i++) {
                    const tee = hole.tees[i];                       
                    if (color === tee.color) {   
                        tee.num = hole.number
                        tee.par = hole.par
                        tee.score = 0
                        tee.putts = 0
                        teeHoles.push(tee)                        
                        setSelectedTeeHoles(teeHoles)                          
                    }
                }
            }

            setShowForm(true)
        } else {
            setShowForm(false)
        }        
    }


    // This Functions Shows the Component InputScoreCard
    const renderScoreCard = () => {
        
        // This function handles the form submition from the data that is passed up from the child Component
        const setStateFromScoreCard = (data, newScoreData) => {
            // console.log(data);
            const newScore = []
            setSelectedTeeHoles(newScore)      
            dispatch(createRound({
                golfCourse: golfCourse.course_id,
                teeColor: selectedTeeId,
                newScore: newScoreData,
                newStats: data

            }))
        }
        
        return (
            <InputScoreCard                 
                holes={golfCourse.holes}
                teeUsed={selectedTee}
                // teeUsedId={selectedTeeId}
                passState={setStateFromScoreCard}
            />
        )
    }


    return (
        <div>        
            {loadingCreate && <Loader />} 
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}   
            {loading 
                ? <Loader />
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                        <div>                            
                            <Row>
                                <Title props={golfCourse.name} />
                            </Row>
                            <Row>
                                <p>Select Tee Color</p>
                            </Row>
                            <Row style={{marginBottom: '2rem'}}>
                                {golfCourse.teeColors.map(teeColor => (
                                    <Col key={teeColor.id}>
                                        <Button onClick={() => teeColorClickHandler(teeColor.id, teeColor.colors)} >{teeColor.colors}</Button>
                                    </Col>
                                ))}                                                                
                            </Row>
                            <div>
                                {showForm && renderScoreCard()}
                            </div>                  
                        </div>                        
                    )
            }            
        </div>
    )
}


export default PlayRoundScreen