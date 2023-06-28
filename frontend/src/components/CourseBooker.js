import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import DatePicker from 'react-datepicker';

function CourseBooker({ golfCourse, teeColors }) {
    

    

    return (
        <div>
            <Card style={{ width: '18rem', marginBottom: '2rem'}}>            
                <Card.Body>
                    <Link to={`/golfcourses/${golfCourse.course_id}`}>
                        <Card.Title>
                            <strong>{golfCourse.name}</strong>
                        </Card.Title>
                    </Link>                                    
                    <Card.Text>
                        Number of Holes: {golfCourse.numOfHoles}
                    </Card.Text>
                    <Card.Text>
                        Tee Colors{teeColors.color}
                    </Card.Text>
                </Card.Body>                            
            </Card>
        </div>
    )
}

export default CourseBooker