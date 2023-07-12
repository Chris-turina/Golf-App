import React, { useEffect, useState} from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Table, Button, Row, Col, Popover, OverlayTrigger } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer'
import { listGolfCourseDetails, updateGolfCourseHoles } from '../actions/golfCourseActions';
import { createTees, deleteTeeBatch, addedToHole} from '../actions/teeActions';
import { TEE_COLOR_CREATE_RESET } from '../constants/golfCourseConstants';

function AdminCourseScoreCard() {
    const [showTees, setShowTees] = useState(true)
    const [editTeeArr, setEditTeeArr] = useState( [] )
    const [editFrontNineYards, setFrontNineYards] = useState( [] )
    const [editBackNineYards, setBackNineYards] = useState( [] )
    const [editTotalYards, setTotalYards] = useState( [] )
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

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))            
        }
    }, [navigate, dispatch, id])


    console.log(courseTeeColors.teeColors);


    const handleSubmit = (e) => {        
        const data = [...courseHoles.holes]        
        dispatch(updateGolfCourseHoles({
            holes: data,
            id: courseHoles.course_id
        }))
    }    

    const handleFormChangePar = (index, e) => {
        const data = [...courseHoles.holes]
        data[index][e.target.name] = parseInt(e.target.value)
        setEditHolesArr(data)

    }

    const handleTeeColorSubmit = (e) => {
        console.log('Submitted');
    }

    const handleFormChangeTeeColorYards = (id, e) => {
        console.log(id);
        const data = [...courseTeeColors.teeColors]
        data[id][e.target.name] = parseInt(e.target.value)
        setFrontNineYards(data)
    }

    // const handleFormChangeBackNine = (index, e) => {
    //     console.log(index);
    //     const data = [...courseTeeColors.teeColors]
    //     data[index][e.target.name] = parseInt(e.target.value)
    //     setBackNineYards(data)
    // }

    // const handleFormChangeTotalYards = (index, e) => {
    //     console.log(index);
    //     const data = [...courseTeeColors.teeColors]
    //     data[index][e.target.name] = parseInt(e.target.value)
    //     setTotalYards(data)
    // }


    // This Function Renders the TeesColors on the left hand side and also gets the yards for each hole
    const renderTees = () => {
        const findingYards = (hole, tees, teeColor, index) => {        
            // console.log(hole);
            const handleFormChangeYards = (tee, index, e) => {                
                const data = [...hole.tees]                
                data[index][e.target.name] = parseInt(e.target.value)
                setEditTeeArr(data)
                
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
                    Go Back
            </Link>
            {loading && loadingTeeColors
                ? (<Loader />)
                : error
                    ? (<Message variant='danger'>{error}</Message>)
                    : (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <Table bordered responsive>                                
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

                            <form onSubmit={handleTeeColorSubmit}>
                                <Table>
                                    <tbody>
                                        <tr>
                                            <th>Tee Colors</th>
                                            <th>Front Nine Distance</th>
                                            <th>Back Nine Distance</th>
                                            <th>Total Yards</th>
                                        </tr>
                                        {courseTeeColors.teeColors.map((teeColor, index) => (
                                            <tr key={teeColor.id}>
                                                <th>{teeColor.colors}</th>
                                                <td>
                                                    <input    
                                                        id='`${teeColor.id}`'                                                    
                                                        name='front_nine_yards'
                                                        type='number'
                                                        value={teeColor.front_nine_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(id, e)}
                                                    />
                                                </td>                                                   
                                                <td>
                                                    <input                                                    
                                                        name='front_nine_yards'
                                                        type='number'
                                                        value={teeColor.back_nine_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(index, e)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        name='front_nine_yards'
                                                        type='number'
                                                        value={teeColor.total_yards}
                                                        onChange={(e) => handleFormChangeTeeColorYards(index, e)}
                                                    />                                                    
                                                </td>
                                            </tr>
                                            
                                        ))}
                                    </tbody>
                                </Table>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

export default AdminCourseScoreCard