import React, { useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { 
    listGolfCourseDetails, 
    updateGolfCourseHoles, 
    updateGolfCourseTeeColors, 
    createTeeColor,
    deleteTeeColor
} from '../actions/golfCourseActions';
import { deleteTeeBatch } from '../actions/teeActions';
import Title from '../components/Title';

function AdminCourseInfoScreen() {
    const [showTees, setShowTees] = useState(true)
    const [editTeeArr, setEditTeeArr] = useState( [] )
    const [totalYards, setTotalYards] = useState( [] )
    const [teeColorText, setTeeColorText] = useState( [] )
    const [editHolesArr, setEditHolesArr] = useState ( [] )

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const golfCourseHoleDetails = useSelector(state => state.golfCourseHoleDetails)
    const { loading, error, golfCourse: courseHoles } = golfCourseHoleDetails

    const golfCourseTeeDetails = useSelector(state => state.golfCourseTeeDetails)
    const { loading: loadingTeeColors, error: errorTeeColors, golfCourse: courseTeeColors } = golfCourseTeeDetails

    const teeColorDelete = useSelector(state => state.teeColorDelete)
    const { loading: loadingTeeColorDelete, error: errorTeeColorDelete, success: successTeeColorDelete } = teeColorDelete

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id, successTeeColorDelete])    


    // This Function handles the submit for updating the holes Yards
    const handleSubmit = (e) => {             
        const data = [...courseHoles.holes]        
        dispatch(updateGolfCourseHoles({
            holes: data,
            id: courseHoles.course_id
        }))
    }    

    // This Funtion handles when the user changes the Par of the hole
    const handleFormChangePar = (index, e) => {
        const data = [...courseHoles.holes]
        data[index][e.target.name] = parseInt(e.target.value)
        setEditHolesArr(data)

    }

    // This Function hanldes when the user submits the TeeColor yards , FRONT, BACK, TOTAL
    const handleTeeColorSubmit = (e) => {    
        // e.preventDefault()    
        const data = [...courseTeeColors.teeColors]
        dispatch(updateGolfCourseTeeColors({
            teeColors: data,
            id: courseTeeColors.course_id
        }))
    }

    // This Function hanldes when the user Changes the TeeColor yards , FRONT, BACK, TOTAL
    const handleFormChangeTeeColorYards = (index , e) => {            
        const data = [...courseTeeColors.teeColors]
        data[index][e.target.name] = parseInt(e.target.value)
        setTotalYards(data)
    }

    const handleFormChangeTeeColorText = (index , e) => {            
        const data = [...courseTeeColors.teeColors]
        data[index][e.target.name] = e.target.value
        setTeeColorText(data)
    }

    const createNewTeeColorHandler = () => {
        dispatch(createTeeColor(courseTeeColors))
    }

    const deleteTeeColorHandler = (course_id, teeColor_id ) => {
        if (window.confirm('Delete this TEE COLOR from all the holes in this course?')) {
            dispatch(deleteTeeBatch(teeColor_id))            
        }

        if( window.confirm('Delete this TEE COLOR from the Course')) {
            dispatch(deleteTeeColor(course_id, teeColor_id))
        }
    }


    // This Function Renders the TeesColors on the left hand side and also gets the yards for each hole
    const renderTees = () => {
        const findingYards = (hole, tees, teeColor, index) => {        
            
            const handleFormChangeYards = (tee, index, e) => {                                
                const data = [...hole.tees]                
                data[index][e.target.name] = parseInt(e.target.value)
                setEditTeeArr(data)    
                console.log(data);            
            }

            for (let i = 0; i < tees.length; i++) {
                const tee = tees[i];
                if (teeColor === tee.color) {                    
                    return (
                        <input 
                            style={{border:'none', width:'50px'}} 
                            name='yards'
                            type='number' 
                            value={tee.yards} 
                            onChange={(e) => handleFormChangeYards(tee, index, e)}
                        />
                    )
                }
                
            }
        }       

        return (
            courseTeeColors.teeColors.map((teeColor, index) => (
                <tr key={teeColor.id}>
                    <th>{teeColor.colors}</th>
                    {courseHoles.holes.map((hole) => (                        
                        <td key={hole.id}>
                            {findingYards(hole, hole.tees, teeColor.colors, index)}
                        </td>                        
                    ))}
                </tr>
            ))
        )
    }

    return (
        <div>
            <Link to='/admin/golfcourselist'>
                <Button>
                    <i className="fa fa-arrow-left"></i>
                </Button>
                
            </Link>
            {loading && loadingTeeColors
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <Title props={`Course Info: ${courseHoles.name}`}/>
                            <form onSubmit={handleTeeColorSubmit}>
                                <Table bordered hover responsive >
                                    <tbody>
                                        <tr>
                                            <th>Tee Colors</th>
                                            <th>Front Nine Distance</th>
                                            <th>Back Nine Distance</th>
                                            <th>Total Yards</th>
                                        </tr>
                                        {courseTeeColors.teeColors.map((teeColor, index) => (
                                            <tr key={teeColor.id}>
                                                <th>
                                                    <input
                                                        style={{ border:'none', outline:'0', }}
                                                        name='colors'
                                                        type='text'
                                                        value={teeColor.colors}
                                                        onChange={(e) => handleFormChangeTeeColorText(index, e)}
                                                    />
                                                    <Button variant='danger' className='btn-sm'onClick={() => deleteTeeColorHandler(courseTeeColors.course_id, teeColor.id)} >
                                                        <i className='fas fa-trash'></i>
                                                    </Button>                                                    
                                                </th>
                                                <td>
                                                    <input
                                                        style={{border:'none'}}                                                                                                                                                              
                                                        name='front_nine_yards'
                                                        type='number'
                                                        value={teeColor.front_nine_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(index, e)}
                                                    />
                                                </td>                                                   
                                                <td>
                                                    <input
                                                        style={{border:'none'}}                                                                                              
                                                        name='back_nine_yards'
                                                        type='number'
                                                        value={teeColor.back_nine_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        style={{border:'none'}}                                                        
                                                        name='total_yards'
                                                        type='number'
                                                        value={teeColor.total_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(index, e)}
                                                    />                                                    
                                                </td>
                                            </tr>
                                            
                                        ))}
                                        <tr>
                                            <td>
                                            <Button size='sm' type='submit' onClick={createNewTeeColorHandler}>
                                                <i className='fas fa-plus'></i>
                                            </Button>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <input type='submit'/>
                            </form>

                            <form onSubmit={handleSubmit}>
                                <Table bordered hover responsive>                                
                                    <tbody>
                                        <tr>
                                            <th>Hole</th>
                                            {courseHoles.holes.map(hole => (
                                                <td key={hole.id}>{hole.number}</td>
                                            ))}
                                        </tr>                                                                        
                                        {showTees && renderTees()}
                                        <tr>
                                            <th>Par</th>
                                            {courseHoles.holes.map((hole, index) => (
                                                <td key={hole.id}>
                                                    <input 
                                                        style={{border:'none', width:'50px'}} 
                                                        id='hole.id'
                                                        min='3'
                                                        max='5'
                                                        name='par'
                                                        type='number' 
                                                        value={hole.par} 
                                                        onChange={(e) => handleFormChangePar(index, e)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>                                
                                </Table>
                                <input type='submit'/>
                            </form>

                            
                        </div>
                    )
            }
        </div>
    )
}

export default AdminCourseInfoScreen