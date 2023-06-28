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

        </Container>
    )
}

export default HomeScreen