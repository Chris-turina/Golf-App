import React, {useEffect, useState} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listGolfCourseDetails } from '../../../actions/golfCourseActions';
import HeaderAdmin from '../../../components/HeaderAdmin';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { updateHole } from '../../../actions/holeActions';
import { listCourseTees, updateTee } from '../../../actions/teeActions';
import { deleteTeeBox, updateTeeBox } from '../../../actions/teeBoxActions';
import { TEE_BOX_DELETE_SUCCESS } from '../../../constants/teeBoxConstants';
import AdminSideHeader from '../../../components/AdminSideHeader';
import FormStyleOneInput from '../../../components/FormStyleOneInput';



export default function AdminCourseInfoScreen() {
    
    const [addOpacity, setAddOpacity] = useState('')
    const [editTeeBox, setEditTeeBox] = useState({})
    const [editHole, setEditHole] = useState({})
    const [editTee, setEditTee] = useState({})
    const [showTeeBoxEditModal, setShowTeeBoxEditModal] = useState(false)
    const [showHoleEditModal, setShowHoleEditModal] = useState(false)
    const [showTeeEditModal, setShowTeeEditModal] = useState(false)
    

    const golfCourseDetails = useSelector(state => state.golfCourseDetails)
    const { loading , error, success: successDetails, golfCourse } = golfCourseDetails

    const courseTeeList = useSelector(state => state.courseTeeList)
    const {success: teeListSuccess, courseTees} = courseTeeList

    const teeBoxUpdate = useSelector(state => state.teeBoxUpdate)
    const {loading: loadingTeeBoxUpdate, success: successTeeBoxUpdate} = teeBoxUpdate

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

        if (successTeeBoxUpdate) {
            dispatch(listGolfCourseDetails(id))    
            dispatch(listCourseTees(id))        
        }
        
        
    }, [navigate, dispatch, id, TEE_BOX_DELETE_SUCCESS, successTeeBoxUpdate])    



    // Make it so on delete it updates the screen
    const deleteHandler = (teeBox) => {
        if (window.confirm('Are you sure you want to delete this Tee Box?')) {
            dispatch(deleteTeeBox(teeBox))
        }
        
    }
    
    const handleEditModal = (type, data) => {
        if (type === 'teeBox') {
            setEditTeeBox(data)
            setShowTeeBoxEditModal(true)
            setAddOpacity('add-opacity')
        } else if (type === 'hole') {
            setEditHole(data)
            setShowHoleEditModal(true)
            setAddOpacity('add-opacity')
        } else if (type === 'tee') {
            setEditTee(data)
            setShowTeeEditModal(true)
            setAddOpacity('add-opacity')
        }
        
    }

    const handleEditHoleSubmit = (e) => {
        console.log(editHole);
    }

    const handleEditTeeSubmit = (e) => {
        console.log(editTee);
    }

    const handleEditTeeBoxSubmit = (e) => {
        
        
    }

    return (
        <div>
            <HeaderAdmin userInfo={userInfo} />
            <div className='admin-container'>
                <AdminSideHeader page='golf-courses'/>
                <div className='admin-content-container'>
                    {loading && <Loader /> }
                    {loadingTeeBoxUpdate && <Loader />}
                    {error && <Message variant={'danger'} >{error}</Message>}   

                    {/* TEEBOX & HOLES INFO */}
                    {successDetails && teeListSuccess && 
                        <div>
                            <div className={`admin-new-row ${addOpacity}`}>
                                <div className='admin-scorecard-tee-boxes'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Tee Name</th>
                                                <th>PAR</th>
                                                <th>SLOPE</th>
                                                <th>HANICAP</th>
                                                <th>FRONT 9</th>
                                                <th>BACK 9</th>
                                                <th>TOTAL</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {golfCourse.tee_boxes.map((teeBox, i) => (
                                                <tr key={i}>
                                                    <td onClick={e =>handleEditModal('teeBox',teeBox)} className='table-tee-box-title'>{teeBox.color}</td>
                                                    <td>{teeBox.par}</td>
                                                    <td>{teeBox.slope}</td>
                                                    <td>{teeBox.handicap}</td>
                                                    <td>{teeBox.front_nine_yards}</td>
                                                    <td>{teeBox.back_nine_yards}</td>
                                                    <td>{teeBox.total_yards}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>                                
                            </div>


                            <div className='admin-new-row'>
                                <div className='admin-scorecard'>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>HOLES:</th>
                                                {golfCourse.holes.map((hole, i) => (
                                                    <th key={i}>{hole.number}</th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th>PAR:</th>
                                                {golfCourse.holes.map(hole => (
                                                    <th className='admin-scorecard-click' onClick={e => handleEditModal('hole',hole)} key={hole.id}>{hole.par}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseTees.map((teeColor, i) => (
                                                <tr key={i}>
                                                    <th>{teeColor.tee_color}</th>
                                                    {teeColor.tees.map(tee => (
                                                        <td className='admin-scorecard-click' onClick={e => handleEditModal('tee',tee)} key={tee.id}>{tee.yards}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>                        
                    }     

                    {/* Modal for editing the Tee Boxes */}
                    {showTeeBoxEditModal && <div className='admin-course-info-edit-tees-modal'>
                        <form onSubmit={e => dispatch(updateTeeBox(editTeeBox))} className='form-style-one form-edit-modal'>
                            <FormStyleOneInput 
                                label={'Tee Box Name'}
                                type={'text'}
                                name={'color'}
                                placeholder={'Green'}
                                value={editTeeBox.color}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: e.target.value})}
                            />

                            <FormStyleOneInput 
                                label={'Handicap'}
                                type={'number'}
                                name={'handicap'}
                                placeholder={'76'}
                                value={editTeeBox.handicap || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <FormStyleOneInput 
                                label={'Slope'}
                                type={'number'}
                                name={'slope'}
                                placeholder={'142'}
                                value={editTeeBox.slope || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <FormStyleOneInput 
                                label={'Par'}
                                type={'number'}
                                name={'par'}
                                placeholder={'72'}
                                value={editTeeBox.par || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <FormStyleOneInput 
                                label={'Front 9 Yards'}
                                type={'number'}
                                name={'front_nine_yards'}
                                placeholder={'3303'}
                                value={editTeeBox.front_nine_yards || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <FormStyleOneInput 
                                label={'Back 9 Yards'}
                                type={'number'}
                                name={'back_nine_yards'}
                                placeholder={'3011'}
                                value={editTeeBox.back_nine_yards || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <FormStyleOneInput 
                                label={'Total Yards'}
                                type={'number'}
                                name={'total_yards'}
                                placeholder={'6612'}
                                value={editTeeBox.total_yards || ''}
                                handleChange={e => setEditTeeBox({...editTeeBox, [e.target.name]: parseInt(e.target.value)})}
                            />

                            <button className='button-style-three' type='submit'>Save Tee Boxes</button>
                        </form>
                    </div>}

                    {/* EDIT HOLE MODAL */}
                    {showHoleEditModal && <div className='admin-course-info-edit-tees-modal'>
                        <form onSubmit={e => dispatch(updateHole(editHole))} className='form-style-one form-edit-modal'>
                            <FormStyleOneInput                                
                                label={'HOLE'}                                
                                placeholder={'1'}                                
                                value={editHole.number}                                
                                readOnly={true}                                
                            />

                            <FormStyleOneInput
                                label={'Edit Par'}
                                type={'number'}
                                name={'par'}
                                placeholder={'PAR'}
                                value={editHole.par || ''}
                                handleChange={e => setEditHole({...editHole, [e.target.name]: parseInt(e.target.value)})}
                            />
                            <button className='button-style-three' type='submit'>Save Tee</button>
                        </form>                        
                    </div>}

                    {/* EDIT TEE INFO */}
                    {showTeeEditModal && <div className='admin-course-info-edit-tees-modal'>
                        <form onSubmit={e => dispatch(updateTee(editTee))} className='form-style-one form-edit-modal'>
                            <FormStyleOneInput                                
                                label={'HOLE'}                                
                                placeholder={'1'}
                                value={editTee.hole__number}                                
                                readOnly={true}                                
                            />
                            <FormStyleOneInput                                
                                label={'Tee'}                                
                                placeholder={'Tee Color'}                                
                                value={editTee.color__color}
                                readOnly={true}                                
                            />
                            <FormStyleOneInput
                                label={'Edit Yards'}
                                type={'number'}
                                name={'yards'}
                                placeholder={'345'}
                                value={editTee.yards || ''}
                                handleChange={e => setEditTee({...editTee, [e.target.name]: parseInt(e.target.value)})}
                            />
                            <button className='button-style-three' type='submit'>Save Tee</button>
                        </form>                        
                    </div>}



                </div>
            </div>            
        </div>
    )
}