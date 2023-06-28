import React from 'react'
import { Card, ListGroup, ListGroupItem, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom'




function GolfCourseYardCard({ golfCourse }) {
    return (
        <Card style={{ width: '18rem', marginBottom: '2rem'}}>            
            <Card.Body>
                <Link to={'/course'}>
                    <Card.Title>
                        <strong>{golfCourse.name}</strong>
                    </Card.Title>
                </Link>                
                <Card.Text>
                    Course Info
                </Card.Text>
                <Card.Text>
                    Number of Holes: {golfCourse.course_info.number_of_holes}
                </Card.Text>
                <ListGroup>                    
                    {golfCourse.course_info.tee_colors.map(tee_color => (
                        <ListGroup.Item>
                            <Container>
                                <Row>
                                    <Col>
                                        {tee_color.tee_box_color}
                                    </Col>
                                    <Col>
                                        {tee_color.distance} yrds
                                    </Col>
                                </Row>                                
                            </Container>                                                         
                        </ListGroup.Item>
                    ))}                   
                </ListGroup>

            </Card.Body>
        </Card>
    )
}

export default GolfCourseYardCard