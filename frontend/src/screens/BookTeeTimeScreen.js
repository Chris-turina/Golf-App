import React, { useState, useEffect} from 'react'
import { Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios'

function BookTeeTimeScreen({ courseId }) {
    const [golfCourse, setGolfCourse] = useState([])

    const { id } = useParams()
    const { location } = useLocation()

    

    useEffect(() => {

        async function fetchGolfCourse() {
            const { data } = await axios.get(`/api/golfcourses/${id}`)
            setGolfCourse(data)
            
        }

        fetchGolfCourse()
        
        
        
    }, [location])

    return (
        <div>
            {golfCourse.name}
            Book Tee Time
        </div>
    )
}

export default BookTeeTimeScreen