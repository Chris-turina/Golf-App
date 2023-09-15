import React, {useEffect} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listGolfCourseDetails } from '../../../actions/golfCourseActions';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listCourseTees } from '../../../actions/teeActions';
import { deleteTeeBox } from '../../../actions/teeBoxActions';
import { TEE_BOX_DELETE_SUCCESS } from '../../../constants/teeBoxConstants';


export default function AdminCourseInfoScreen() {
    


    const golfCourseDetails = useSelector(state => state.golfCourseDetails)
    const { loading , error, success: successDetails, golfCourse } = golfCourseDetails

    const courseTeeList = useSelector(state => state.courseTeeList)
    const {success: teeListSuccess, tees} = courseTeeList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {

        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listGolfCourseDetails(id))    
            dispatch(listCourseTees(id))        
        }

        if (TEE_BOX_DELETE_SUCCESS) {
            dispatch(listGolfCourseDetails(id))    
            dispatch(listCourseTees(id))        
        }
        
    }, [navigate, dispatch, id, TEE_BOX_DELETE_SUCCESS])    

    const navigateToEditScreen = (teeId) => {
        navigate(`edit_tee/${teeId}`)
    }

    // Make it so on delete it updates the screen
    const deleteHandler = (teeBox) => {
        if (window.confirm('Are you sure you want to delete this Tee Box?')) {
            dispatch(deleteTeeBox(teeBox))
        }
        
    }


    return (
        <div>
            <Header userInfo={userInfo} page='admin' />
            <div className='admin-user-list-screen-back-arrow-container'>
                <i className="fa-solid fa-arrow-left"></i>
                <Link className='select-tee-link' to='/admin/golf_courses'>
                    <p>Courses</p>
                </Link>
            </div>
            
            {loading && <Loader /> }
            {error && <Message variant={'danger'} >{error}</Message>}
            
            {successDetails && teeListSuccess && (
                <div>
                    <div>
                        <h1>{golfCourse.name}</h1>                        
                    </div>                    
                     <div className='table-style-one-background'>                        
                        
                        <table className='table-style-one'>
                            <thead>
                                <tr className='table-style-one-tr-header'>
                                    <th>Name</th>
                                    <th>Handicap</th>
                                    <th>Slope</th>
                                    <th>Par</th>
                                    <th>Distance</th>
                                    <th>Delete Tee Box</th>
                                    
                                    
                                </tr>                                
                            </thead>

                            <tbody>
                                {golfCourse.tee_boxes.map(teeBox => (                                    
                                    <tr key={teeBox.id} className='table-style-one-tr-body'>                                        
                                        <td className='table-style-one-td-click' onClick={() => navigateToEditScreen(teeBox.id)}>{teeBox.color}</td>
                                        <td className='table-style-one-td-click' onClick={() => navigateToEditScreen(teeBox.id)}>{teeBox.handicap}</td>
                                        <td className='table-style-one-td-click' onClick={() => navigateToEditScreen(teeBox.id)}>{teeBox.slope}</td>
                                        <td className='table-style-one-td-click' onClick={() => navigateToEditScreen(teeBox.id)}>{teeBox.par}</td>
                                        <td className='table-style-one-td-click' onClick={() => navigateToEditScreen(teeBox.id)}>
                                            <table className='table-style-one-nested-table'>
                                                <tbody>
                                                    <tr>
                                                        <th>Front:</th>
                                                        <td>{teeBox.front_nine_yards}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Back:</th>
                                                        <td>{teeBox.back_nine_yards}</td>  
                                                    </tr>
                                                    <tr>
                                                        <th>Total:</th>
                                                        <td>{teeBox.total_yards}</td>
                                                    </tr>
                                                    

                                                </tbody>
                                            
                                            </table>
                                        </td>    
                                        <td>
                                        
                                            <i className='fas fa-trash' onClick={() => deleteHandler(teeBox)}></i>
                                        
                                        </td>                            
                                    </tr>

                                ))}
                                
                            </tbody>
                            
                        </table>
                    </div>

                    <div>
                        <p>Golf Course Holes</p>
                        <div className='table-style-one-background'>
                            <table className='table-style-one'>
                                <thead>
                                    <tr className='table-style-one-tr-header'>
                                        <th>{golfCourse.name}</th>
                                        <th>HOLES:</th>
                                        {golfCourse.holes.map(hole => (
                                            <th key={hole.id}>{hole.number}</th>
                                        ))}                                                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {tees.map((teeBox, i) => (
                                        <tr key={i} className='table-style-one-tr-body'>
                                            <th>{teeBox.tee_color}</th>  
                                            <th>YARDS <br/> PAR</th>
                                                {teeBox.tees.map((tee, i) => (
                                                    <td key={tee.id}>{tee.yards} <br/>{tee.par} </td>                                                    
                                                ))}                                  
                                            
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            
            


            
        </div>
    )
}