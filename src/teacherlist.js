import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Offcanvas from 'react-bootstrap/Offcanvas';

const TeacherListPage = () => {
    const [teacherList, setTeacherList] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    useEffect(() => {
        window.electronAPI.loadTeachers();

        window.electronAPI.getTeacherLogs((e, teacherListData) => {
            const parsedLogs = JSON.parse(teacherListData);
            console.log(parsedLogs);
            setTeacherList(parsedLogs);
        });
    }, []);

    const handleTeacherClick = (teacherItem) => {
        setSelectedTeacher(teacherItem);
        setShowSidebar(true); // Open the sidebar
    };

    const handleCloseSidebar = () => {
        setShowSidebar(false); // Close the sidebar
    };

    return (
        <Container className="mt-4">
            {/* Top Left Heading */}
            <Row>
                <Col>
                    <h1>Teacher Database</h1>
                </Col>
            </Row>

            {/* Centered List Group */}
            <Row className="justify-content-center mt-4">
                <Col xs={12} md={6}>
                    <ListGroup>
                        {teacherList.map((teacherItem, index) => (
                            <ListGroup.Item
                                key={index}
                                action
                                active={selectedTeacher?._id === teacherItem._id}
                                onClick={() => handleTeacherClick(teacherItem)}
                            >
                                {teacherItem.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {/* Sidebar for Teacher Details */}
            <Offcanvas show={showSidebar} onHide={handleCloseSidebar} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Teacher Details</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {selectedTeacher ? (
                        <div>
                            <p><strong>Name:</strong> {selectedTeacher.name}</p>
                            <p><strong>License:</strong> {selectedTeacher.license}</p>
                            <p><strong>Grade:</strong> {selectedTeacher.grade}</p>
                            <p><strong>Designation:</strong> {selectedTeacher.designation}</p>
                            <div>
                                <strong>Schedule:</strong>
                                <ul>
                                    {selectedTeacher.schedule.map((slot, index) => (
                                        <li key={index}>
                                            <strong>{slot[0]}</strong>: {slot.slice(1).flat().join(', ')}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <p>No teacher selected.</p>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </Container>
    );
};

export default TeacherListPage;
