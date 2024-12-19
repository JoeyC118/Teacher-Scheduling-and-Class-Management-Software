import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropDown from "./dropdown";
import MyModal from "./modal";
import SubmissionAlert from "./alert";
import ConfirmationModal from "./confirmationModal";
import { FormSelect } from "react-bootstrap";

const AddPage = () => {
    const [form, setForm] = useState({ name: "", license: "", grade: "", designation: "" });
    const [classObj, setClassObj] = useState({ className: "", timeSlot: "", roomNumber: null, isICT: "" });
    const [classList, setClassList] = useState([]);
    const [teacherLogs, setTeacherLogs] = useState([]);
    const [showClassModal, setShowClassModal] = useState(false);
    const [showTeacherModal, setShowTeacherModal] = useState(false);

    // States for duplicate modals
    const [showDuplicateNameModal, setShowDuplicateNameModal] = useState(false);
    const [showDuplicateRoomModal, setShowDuplicateRoomModal] = useState(false);


    const [modalMessage, setModalMessage] = useState("");
    const [updatedClassName, setUpdatedClassName] = useState("");

    // Alerts
    const [showTeacherAlert, setShowTeacherAlert] = useState(false);
    const [showTeacherAlertColor, setShowTeacherAlertColor] = useState();
    const [showTeacherAlertMessage, setShowTeacherAlertMessage] = useState();
    const [showClassAlert, setShowClassAlert] = useState(false);
    const [showClassAlertColor, setShowClassAlertColor] = useState();
    const [showClassAlertMessage, setShowClassAlertMessage] = useState();

    const handleClassOnClick = () => {
        setShowClassModal(true);
    };
    const handleTeacherOnClick = () => {
        setShowTeacherModal(true);
    };
    const handleCloseTeachers = () => {
        setShowTeacherModal(false);
    };
    const handleCloseClasses = () => {
        setShowClassModal(false);
    };
    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value,
        });
    };
    const setClassField = (field, value) => {
        setClassObj({
            ...classObj,
            [field]: value,
        });
    };
    const handleSubmit = (e) => {
        handleShowTeacherAlert();
        e.preventDefault();
        console.log(form);
        window.electronAPI.sendTeacherData(form);
    };

    const handleClassSubmit = async (e) => {
        e.preventDefault();

        if (!classObj.className || !classObj.timeSlot || !classObj.roomNumber || !classObj.isICT) {
            handleShowClassAlert("danger", "Please enter all fields.");
            return;
        }

        const baseClassName = classObj.className.split(" - ")[0]; // Extract the base name
        const existingClasses = classList.filter((cls) => cls.className.split(" - ")[0] === baseClassName);

        if (existingClasses.length > 0) {
            const nextSection = existingClasses.length + 1;
            const generatedClassName = `${baseClassName} - ${nextSection < 10 ? "0" : ""}${nextSection}`;


            console.log("Im here!")
            setUpdatedClassName(generatedClassName);
            setModalMessage("There is already a section with this name! Do you want to make a new section or cancel?");
            setShowDuplicateNameModal(true);
            return;
        }

        handleRoomConflictCheck({ ...classObj, className: `${baseClassName} - 01` });
    };

    const handleRoomConflictCheck = (updatedClassObj) => {
        const conflictingClassRoom = classList.find(
            (cls) =>
                String(cls.roomNumber) === String(updatedClassObj.roomNumber) &&
                cls.timeSlot === updatedClassObj.timeSlot
        );

        if (conflictingClassRoom) {
            setModalMessage(
                `The room "${updatedClassObj.roomNumber}" is already assigned to "${conflictingClassRoom.className}" at this time "${updatedClassObj.timeSlot}". Do you want to proceed?`
            );
            setShowDuplicateRoomModal(true);
            return;
        }

        submitClassData(updatedClassObj);
    };

    const submitClassData = async (updatedClassObj) => {
        try {
            console.log("Submitting class data: ", updatedClassObj);
            await window.electronAPI.sendClassData(updatedClassObj);
            handleShowClassAlert("success", "Class submitted successfully.");
            setClassObj({ className: "", timeSlot: "", roomNumber: "", isICT: "" });
        } catch (error) {
            console.error("Error submitting class data: ", error);
            handleShowClassAlert("danger", "Error submitting class data.");
        }
    };

    // Duplicate Name Modal Handlers
    const handleDuplicateNameModalConfirm = () => {
        setShowDuplicateNameModal(false);
        handleRoomConflictCheck({ ...classObj, className: updatedClassName });
    };

    const handleDuplicateNameModalCancel = () => {
        setShowDuplicateNameModal(false);
    };

    // Duplicate Room Modal Handlers
    const handleDuplicateRoomModalConfirm = () => {
        setShowDuplicateRoomModal(false);
        submitClassData(classObj);
    };

    const handleDuplicateRoomModalCancel = () => {
        setShowDuplicateRoomModal(false);
    };

    const handleShowTeacherAlert = () => {
        setShowTeacherAlertColor("success");
        setShowTeacherAlertMessage("success!");

        if (!form.name || !form.license || !form.grade || !form.designation) {
            setShowTeacherAlertColor("danger");
            setShowTeacherAlertMessage("Please enter all fields");
        }
        setShowTeacherAlert(true);

        setTimeout(() => {
            setShowTeacherAlert(false);
        }, 3000);
    };

    const handleShowClassAlert = () => {
        setShowClassAlertColor("success");
        setShowClassAlertMessage("success!");

        if (!classObj.className || !classObj.timeSlot || !classObj.roomNumber || !classObj.isICT) {
            setShowClassAlertColor("danger");
            setShowClassAlertMessage("Please enter all fields");
        }

        setShowClassAlert(true);

        setTimeout(() => {
            setShowClassAlert(false);
        }, 3000);
    };

    useEffect(() => {
        window.electronAPI.loadTeachers();
        window.electronAPI.loadClasses();

        window.electronAPI.getTeacherLogs((e, teacherLogsData) => {
            const parsedLogs = JSON.parse(teacherLogsData);
            console.log(parsedLogs);
            setTeacherLogs(JSON.parse(teacherLogsData));
        });

        window.electronAPI.getClassData((e, classListData) => {
            const parsedLogs = JSON.parse(classListData);
            console.log(parsedLogs);
            setClassList(JSON.parse(classListData));
        });
    }, []);

    return (
        <Container>
            <Row>
                <Col sm={4}>
                    {showTeacherAlert && <SubmissionAlert variant={showTeacherAlertColor} displayMessage={showTeacherAlertMessage} />}
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Teacher Name</Form.Label>
                            <Form.Control onChange={(e) => setField("name", e.target.value)} type="email" placeholder="Enter teacher name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>License </Form.Label>
                            <Form.Control onChange={(e) => setField("license", e.target.value)} placeholder="License" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Grade</Form.Label>
                            <Form.Select onChange={(e) => setField("grade", e.target.value)}>
                                <option>All</option>
                                <option>Elementary School</option>
                                <option>Middle School</option>
                                <option>High School</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Select onChange={(e) => setField("designation", e.target.value)}>
                                <option></option>
                                <option>General Education</option>
                                <option>Special Education</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>

                        <Button variant="secondary" onClick={handleTeacherOnClick}>
                            Select Teachers to Delete
                        </Button>
                    </Form>
                </Col>
                <Col sm={4} className="ms-auto">
                    {showClassAlert && <SubmissionAlert variant={showClassAlertColor} displayMessage={showClassAlertMessage} />}
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Class Name</Form.Label>
                            <Form.Control onChange={(e) => setClassField("className", e.target.value)} placeholder="Enter class name" value={classObj.className} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Slot</Form.Label>

                            <FormSelect value={classObj.timeSlot} onChange={(e) => setClassField("timeSlot", e.target.value)}>
                                <option></option>
                                <option>8:00am - 8:48am</option>
                                <option>8:51am - 9:36am</option>
                                <option>9:38am - 10:23am</option>
                                <option>10:25am - 11:10am</option>
                                <option>11:12am - 11:57am</option>
                                <option>11:59am - 12:44pm</option>
                                <option>12:46pm - 1:31pm</option>
                                <option>1:33pm - 2:20pm</option>
                            </FormSelect>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Room</Form.Label>
                            <Form.Control
                                type="text"
                                value={classObj.roomNumber || ""} // Ensure value is a string or empty
                                onChange={(e) => setClassField("roomNumber", e.target.value)}
                                placeholder="Enter room number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Is the class ICT</Form.Label>
                            <Form.Select value={classObj.isICT} onChange={(e) => setClassField("isICT", e.target.value)}>
                                <option></option>
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick={handleClassSubmit}>
                            Submit
                        </Button>
                        <Button variant="secondary" onClick={handleClassOnClick}>
                            Select Classes to Delete
                        </Button>
                    </Form>
                </Col>
            </Row>

            {showClassModal && (
                <MyModal
                    showModal={showClassModal}
                    data={classList}
                    displayProperty={"className"}
                    handleClose={handleCloseClasses}
                    actionType={"delete"}
                    buttonText="Delete"
                    databaseName="classes"
                />
            )}

            {showTeacherModal && (
                <MyModal
                    showModal={showTeacherModal}
                    data={teacherLogs}
                    displayProperty={"name"}
                    handleClose={handleCloseTeachers}
                    actionType={"delete"}
                    buttonText="Delete"
                    databaseName="teachers"
                />
            )}

            {showDuplicateNameModal && (
                <ConfirmationModal
                    showModal={showDuplicateNameModal}
                    message={modalMessage}
                    onConfirm={handleDuplicateNameModalConfirm}
                    onCancel={handleDuplicateNameModalCancel}
                />
            )}

            {showDuplicateRoomModal && (
                <ConfirmationModal
                    showModal={showDuplicateRoomModal}
                    message={modalMessage}
                    onConfirm={handleDuplicateRoomModalConfirm}
                    onCancel={handleDuplicateRoomModalCancel}
                />
            )}
        </Container>
    );
};

export default AddPage;
