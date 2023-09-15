import React, {useEffect, useState} from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import Message from '../../../components/Message';
import { listTeeBoxDetails, updateTeeBox } from '../../../actions/teeBoxActions';

export default function AdminCourseInfoEditTeeBoxScreen() {

    const [teeBoxName, setTeeBoxName] = useState('')
    // const [teeBoxHandicap, setTeeBoxHandicap] = useState(0)
    // const [teeBoxSlope, setTeeBoxSlope] = useState(0)
    // const [teeBoxPar, setTeeBoxPar] = useState(0)
    // const [teeBoxFrontDistance, setTeeBoxFrontDistance] = useState(0)
    // const [teeBoxBackDistance, setTeeBoxBackDistance] = useState(0)
    // const [teeBoxTotalDistance, setTeeBoxTotalDistance] = useState(0)

    const [teeBoxData, setTeeBoxData] = useState({})
    const [showForm, setShowForm] = useState(false)


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const teeBoxDetails = useSelector(state => state.teeBoxDetails)
    const {loading, success, teeBox} = teeBoxDetails

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    useEffect(() => {
        if(!userInfo.isAdmin) {
            navigate('/login')
        } else {
            dispatch(listTeeBoxDetails(id))            
        }
        
    }, [])  

    useEffect(() => {
        if (success) {
            setTeeBoxData(teeBox)
            setShowForm(true)
        }
    }, [success])


    const handleChange = (e) => {
        let data = {...teeBoxData}
        
        if (e.target.type === 'number') {
            data[e.target.name] = parseInt(e.target.value)            
        } else {
            data[e.target.name] = e.target.value
        }
        setTeeBoxData(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log();
        dispatch(updateTeeBox(teeBoxData))
        navigate(`/admin/golf_courses/course/${teeBox.course}`)
    }
    
    return (

        <div>
            <Header userInfo={userInfo} page='admin' />
            {success && showForm && <div>
                <h3>Edit Tee Box</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name</label>
                        <input 
                            type='text'
                            name='color'
                            placeholder='Tee Box Name'
                            value={teeBoxData.color}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Handicap</label>
                        <input 
                            type='number'
                            name='handicap'
                            placeholder='Tee Box Handicap'
                            value={teeBoxData.handicap}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Slope</label>
                        <input 
                            type='number'
                            name='slope'
                            placeholder='Tee Box Slope'
                            value={teeBoxData.slope}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Par</label>
                        <input 
                            type='number'
                            name='par'
                            placeholder='Tee Box Par'
                            value={teeBoxData.par}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Front Nine Distance</label>
                        <input 
                            type='number'
                            name='front_nine_yards'
                            placeholder='Front Nine Distance'
                            value={teeBoxData.front_nine_yards}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Back Nine Distance</label>
                        <input 
                            type='number'
                            name='back_nine_yards'
                            placeholder='Back Nine Distance'
                            value={teeBoxData.back_nine_yards}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <div>
                        <label>Total Distance</label>
                        <input 
                            type='number'
                            name='total_yards'
                            placeholder='Total Yards'
                            value={teeBoxData.total_yards}
                            onChange = {(e) => handleChange(e)}
                        />
                    </div>

                    <button>Save</button>
                </form>
            </div>}
        </div>
    )
}