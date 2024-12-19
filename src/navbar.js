import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap'; // Import this for react-router-dom integration
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavBar = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">Scheduling Application</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>View Teacher Schedules</Nav.Link>
                        </LinkContainer>
                        
                        <LinkContainer to="/add-page">
                            <Nav.Link>Add/Delete Classes and Teachers</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="teacherlist-page">
                            <Nav.Link>Teacher List</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/classlist-page">
                            <Nav.Link>Class List</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavBar;