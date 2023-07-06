import React from "react";
import { Card, ListGroup, ListGroupItem, Col, Container, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HomeScreen() {
    return (
        <Container>
            
                <Link to={'/golfcourses'}>
                    <Card.Title>
                        <Button>Enter Score</Button>
                    </Card.Title>                    
                </Link>    
                <p>Rounds Played</p>
                <p>Total to Par</p>
                <p>Average score</p>
                <p>handicap</p>
                <p>average putts per round</p>
                <p>Course played the most</p>
                <p>Best Score</p>

        </Container>
    )
}

export default HomeScreen