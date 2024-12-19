import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';

const ClassListPage = () => {
    const [classList, setClassList] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        window.electronAPI.loadClasses();

        window.electronAPI.getClassData((e, classListData) => {
            const parsedLogs = JSON.parse(classListData);
            console.log(parsedLogs);
            setClassList(parsedLogs);
        });
    }, []);

    const handleClassClick = (classItem) => {
        setSelectedClass(classItem);
        setShowSidebar(true); // Open the sidebar
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false); // Close the sidebar
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Class Database</h1>
                </Col>
            </Row>

       
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6}>
                    <ListGroup>
                        {classList.map((classItem, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                active={selectedClass?._id === classItem._id}
                                onClick={() => handleClassClick(classItem)}
                            >
                                {classItem.className}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

        
            <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Class Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedClass ? (
                        <div>
                            <p><strong>Class Name:</strong> {selectedClass.className}</p>
                            <p><strong>Time Slot:</strong> {selectedClass.timeSlot}</p>
                            <p><strong>Room Number:</strong> {selectedClass.roomNumber}</p>
                            <p><strong>ICT:</strong> {selectedClass.isICT}</p>
                        </div>
                    ) : (
                        <p>No class selected.</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default ClassListPage;
