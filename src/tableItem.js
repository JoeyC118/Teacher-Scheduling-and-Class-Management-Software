import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import MyModal from "./modal";

const TableItem = ({
  teacherLogs,
  selectedTeacher,
  classList,
  setSelectedClass,
  selectedClass,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [row, setRowIndex] = useState(0);
  const [col, setColIndex] = useState(0);
  const [timeMatchingClassList, setTimeMatchingClassList] = useState([]);

  const handleOnClick = (rowIndex, colIndex) => {
    console.log(`Clicked on row ${rowIndex}, column ${colIndex}:`);
    setColIndex(colIndex);
    setRowIndex(rowIndex);
    setShowModal(true);
    setTimeMatchingClassList(
      classList.filter(
        (classObject) =>
          classObject.timeSlot == selectedTeacher.schedule[rowIndex][0]
      )
    );
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleRemoveClass = () => {
    if (!hasExistingClasses) {
      alert("No classes to remove.");
      return;
    }
  
    if (row !== null && col !== null && selectedItem?.schedule) {
      setSelectedItem(null, "remove");
    }
  
    handleClose();
  };

  const handleSaveClass = (newClass, actionType) => {
    const updatedSchedule = [...selectedTeacher.schedule];
  
    if (actionType === "remove") {
      updatedSchedule[row][col] = []; 
    } else {
      if (!Array.isArray(updatedSchedule[row][col])) {
        updatedSchedule[row][col] = [];
      }
  
      const classObject = {
        className: typeof newClass === "string" ? newClass : newClass.className,
        roomNumber: newClass?.roomNumber || "N/A", // Use "N/A" if roomNumber is missing
      };
  
      if (actionType === "add") {
        // Add the new class object to the cell array
        updatedSchedule[row][col].push(classObject);
      } else if (actionType === "replace") {
        // Replace the existing classes with the new class object
        updatedSchedule[row][col] = [classObject];
      }
    }
  
    // Update the teacher's schedule
    setSelectedClass({
      ...selectedTeacher,
      schedule: updatedSchedule,
    });
  
    console.log("Updated Schedule:", updatedSchedule); // Debug log
    setShowModal(false);
  };

  if (!selectedTeacher || !Array.isArray(selectedTeacher.schedule)) {
    return (
      <p className="m-5"> Please select a teacher to view the schedule </p>
    ); // Show a message if no teacher is selected
  }

  return (
    <>
      <Container>

      <div className="teacher-info my-4 text-center">
          <h2>{selectedTeacher.name}</h2>
          <p><strong>Designation:</strong> {selectedTeacher.designation}</p>
          <p><strong>License:</strong> {selectedTeacher.license}</p>
          <p><strong>Grade:</strong> {selectedTeacher.grade}</p>
        </div>

        <Table className="mt-5" variant="info" bordered hover size="sm">
          <thead
            style={{
              width: "150px",
              height: "80px",
              textAlign: "center",
              verticalAlign: "middle",
              fontFamily: "Courier New",
            }}
          >
            <tr>
              <th>Time</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>

          <tbody>
  {selectedTeacher.schedule.map((row, rowIndex) => (
          <tr
            style={{
              width: "150px",
              height: "80px",
              textAlign: "center",
              verticalAlign: "middle",
              fontFamily: "Courier New",
            }}
            key={rowIndex}
          >
            {row.map((cellData, colIndex) => (
              <td
                key={colIndex}
                onClick={() =>
                  colIndex !== 0 && handleOnClick(rowIndex, colIndex, cellData)
                } // Only clickable for non-header cells
              >
                {colIndex === 0
                  ? cellData // Display normally for the first cell in each row
                  : Array.isArray(cellData)
                  ? cellData
                      .map(
                        (classObj) =>
                          `${classObj.className || "Unknown Class"} (#${classObj.roomNumber || "N/A"})`
                      )
                      .join(", ") // Join multiple classes with commas
                  : cellData}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
        </Table>

        {showModal && (
          <MyModal
            showModal={showModal}
            data={timeMatchingClassList}
            displayProperty={"className"}
            setSelectedItem={(newClass, actionType) =>
              handleSaveClass(newClass, actionType)
            }
            handleClose={handleClose}
            selectedItem={selectedTeacher}
            actionType={"save"}
            row={row}
            col={col}
          />
        )}
      </Container>
    </>
  );
};

export default TableItem;
