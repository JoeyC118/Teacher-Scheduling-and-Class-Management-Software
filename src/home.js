import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableItem from "./tableItem";
import FormItem from "./form";


const HomePage = () => {
  const [teacherLogs, setTeacherLogs] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');


  useEffect(() => {
    window.electronAPI.loadTeachers();
    window.electronAPI.loadClasses();

    window.electronAPI.getTeacherLogs((e, teacherLogsData) => {
      const parsedLogs = JSON.parse(teacherLogsData);

      setTeacherLogs(JSON.parse(teacherLogsData));
      
    });


    window.electronAPI.getClassData((e,classListData) => {
      const parsedLogs = JSON.parse(classListData)
      console.log(parsedLogs)
      setClassList(JSON.parse(classListData))
     })


  }, []);


  const handleSelectTeacher = (teacher) => {
    setSelectedTeacher(teacher);
    

  };

  return (
    <Container>
      <Row>
        <Col sm={8}>
          <TableItem
            teacherLogs={teacherLogs}
            selectedTeacher={selectedTeacher}
            classList = {classList}
            setSelectedClass = {setSelectedClass}
            selectedClass = {selectedClass}
          />
        </Col>
        <Col sm={4}>
          <FormItem
            teacherLogs={teacherLogs}
            onSelectTeacher={handleSelectTeacher}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
