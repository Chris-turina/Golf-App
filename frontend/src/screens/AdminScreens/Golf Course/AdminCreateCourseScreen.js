import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createGolfCourse, getGolfCourseNewAdded } from '../../../actions/golfCourseActions';
import { updateBulkTeeBoxes } from '../../../actions/teeBoxActions';
import Header from '../../../components/Header';
import CourseQuestionnaire from '../../../components/CourseQuestionnaire';
import EditTeeBoxes from '../../../components/EditTeeBoxes';
import EditHoles from '../../../components/EditHoles';
import { updateAllHoles } from '../../../actions/holeActions';


export default function AdminCreateCourseScreen() {

    const [showCourseQuestions, setShowCourseQuestions] = useState(true)
    const [showTeeBoxes, setShowTeeBoxes] = useState(false)
    const [showHoles, setShowHoles] = useState(false)
    const [showBackArrow, setShowBackArrow] = useState(true)


    
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const golfCourseCreate = useSelector(state => state.golfCourseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, golfCourse: createdGolfCourse } = golfCourseCreate

    const golfCourseNewAdded = useSelector(state => state.golfCourseNewAdded)
    const { loading: loadingNewCourse, error: errorNewCourse, success: successNewCourse, golfCourse: newCourse } = golfCourseNewAdded

    const teeBoxBulkUpdate = useSelector(state => state.teeBoxBulkUpdate)
    const {success: successTeeBoxUpdate, } = teeBoxBulkUpdate

    const holesBatchUpdate = useSelector(state => state.holesBatchUpdate)
    const {success: sucessHolesBatchUpdate} = holesBatchUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (successCreate) {
            dispatch(getGolfCourseNewAdded())
            setShowTeeBoxes(true)
            setShowCourseQuestions(false)
            setShowBackArrow(false)
            
        }

        if (successTeeBoxUpdate) {
            dispatch(getGolfCourseNewAdded())
            setShowTeeBoxes(false)
            setShowHoles(true)
        }

        if (sucessHolesBatchUpdate) {
            console.log('yes');
            navigate(`/admin/golf_courses/course/${newCourse.course_id}`)
        }


    }, [successCreate, setShowCourseQuestions, setShowTeeBoxes, successTeeBoxUpdate, sucessHolesBatchUpdate])

    

    // This Function calls an Action to send the data to the backend to create the Golf Course
    const recieveCourseData = (data) => {
        console.log(data);
        dispatch(createGolfCourse(data))
    }

    // This function calls an action that updates the created default tee box data
    const teeBoxContentUpdate = (data) => {        
        dispatch(updateBulkTeeBoxes(data, newCourse.course_id))
    }

    // THis Funtion updates the created holes and tees
    const holeContentUpdate = (data) => {
        console.log(data);
        
        dispatch(updateAllHoles(data, newCourse.course_id))
    }

   console.log(newCourse);


   

    return (
        <div className='admin-create-course-screen'>
             <Header userInfo={userInfo} page='admin' />
            {showBackArrow && <div>
                <div className='admin-user-list-screen-back-arrow-container'>
                    <i className="fa-solid fa-arrow-left"></i>
                    <Link className='select-tee-link' to='/admin/golf_courses'>
                        <p>Courses</p>
                    </Link>                    
                </div>               
            </div> }           
            {showCourseQuestions && <CourseQuestionnaire getCourseData={recieveCourseData} />} 
            {successNewCourse && showTeeBoxes && <EditTeeBoxes teeBoxes={newCourse.tee_boxes} teeBoxContentUpdate={teeBoxContentUpdate} />}
            {successNewCourse && showHoles && <EditHoles holes={newCourse.holes}  holeContentUpdate={holeContentUpdate} /> }


            {/* <form>
                <table className='form-table-one'>

                    <tbody>
                        
                        <tr className='hole-rows'>
                            <tr>
                                <td><h3># 1</h3></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Handicap: </label>
                                    <input 
                                        placeholder='0'
                                    />
                                </td>
                            </tr>
                            
                            
                            <td className='spacer'>
                                <table>
                                    <thead>
                                        <th>Tees</th>
                                        <th>Par</th>
                                        <th>Yards</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Black</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Blue</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>White</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                            </td>
                        </tr>



                        <tr className='hole-rows'>
                            <tr>
                                <td><h3># 2</h3></td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Handicap: </label>
                                    <input 
                                        placeholder='0'
                                    />
                                </td>
                            </tr>
                            
                            
                            <td className='spacer'>
                                <table>
                                    <thead>
                                        <th>Tees</th>
                                        <th>Par</th>
                                        <th>Yards</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Black</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>Blue</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>White</td>
                                            <td>
                                                <input
                                                    placeholder='0'
                                                />
                                            </td>
                                            <td>
                                                <input 
                                                    placeholder='0'
                                                />
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                            </td>
                        </tr>
                         

                    </tbody>
                </table>
                <button className='next-button' type='submit'>Next</button>
            </form> */}

            
        </div>
    )
}