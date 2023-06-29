import React, {useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Card, ListGroup, FormGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { listGolfCourseDetails } from '../actions/golfCourseActions';
import { createHole, updateHole } from '../actions/holeActions';


function AdminCourseHoleDetailsScreen() {
    const [showForm, setShowForm] = useState(false)
    const [showTees, setShowTees] = useState(false)
    const [editTeeArr, setEditTeeArr] = useState( [] )
    const [editHolesArr, setEditHolesArr] = useState( [] )


    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { error, loading, golfCourse } = golfCourseHoleDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id])

    // This Functions sets the state for the page to make the edits
    const handleClick = () => {
        const data = [...golfCourse.holes]
        console.log(data);
        setEditHolesArr(data)
        setShowForm(true)
        setShowTees(true)
    }

    // This function submits the form and calls an action to update the database
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = editHolesArr
        console.log(data);
        
    }
    
    // This function hanldes the changes to the par atribute
    const handleFormChangePar = (index, e) => {        
        const data = [...golfCourse.holes]
        data[index][e.target.name] = parseInt(e.target.value)
        setEditHolesArr(data)
        
    }

     
    // This function renders the tee inputs into the form to change the yards on each tee, per hole
    const renderTeeInputs = (hole) => {

        // This funciton handles the changes to the yards on each tee per hole
        const handleFormChangeYards = (tee, index, e) => {            
            const data = [...hole.tees]                      
            data[index][e.target.name] = parseInt(e.target.value)            
            setEditTeeArr(data)  
        } 
        
        return (
            <div>
                {hole.tees.map((tee, index) => (
                    <div key={tee.id}>
                        <label>
                            {tee.color}: 
                            <input 
                                name='yards' 
                                type='number' 
                                placeholder='Enter Yards' 
                                value={tee.yards} 
                                onChange={(e) => handleFormChangeYards(tee, index, e)} 
                            />                                    
                             
                        
                        </label>
                    </div>
                ))}
            </div>
        )
        
    }

    return (
        <div>
            <Row>
                <Link to='/admin/golfcourselist'>
                    Go Back
                </Link>
                <Col>
                    <h1>{golfCourse.name}</h1>
                </Col>                                

            </Row>
            {loading
                ?(<Loader />)
                :error
                    ? (<Message variant='danger'>{error}</Message>)
                    :(  <div> 
                        <button onClick={handleClick}>Edit Holes</button>
                        
                        { showForm && <form onSubmit={handleSubmit}>
                            {golfCourse.holes.map((hole, index) => (
                            <div key={hole.id} style={{marginBottom: '40px'}}>
                                <h3>{hole.number}</h3>
                                <label>Par: <input name='par' type='number' placeholder='Enter Par' value={hole.par} onChange={(e) => handleFormChangePar(index, e)} /> </label>
                                <p>Tee Colors:</p>
                                
                                {showTees && renderTeeInputs(hole)}
                            </div>
                            ))}
                            <input type='submit' />
                        </form>}
                          
                        </div>
                    )

            }
        </div>
    )
}

export default AdminCourseHoleDetailsScreen;