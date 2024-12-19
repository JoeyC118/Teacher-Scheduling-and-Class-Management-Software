import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ClassSearchBar from "./ClassSearchBar";

function MyModal({
  showModal,
  data,
  displayProperty,
  setSelectedItem = () => {},
  handleClose,
  selectedItem = null,
  buttonText = "Select",
  actionType,
  row = null,
  col = null,
  databaseName = "",
}) {
  const [localSelectedItem, setLocalSelectedItem] = useState("");
  const [selectedAction, setSelectedAction] = useState("add"); // Default action is "add"
  const [hasExistingClasses, setHasExistingClasses] = useState(false); // Track if the block already has classes

  useEffect(() => {
    // Check if the current cell has existing classes
    if (selectedItem && Array.isArray(selectedItem.schedule)) {
      const existingClasses = selectedItem.schedule[row]?.[col];
      setHasExistingClasses(
        Array.isArray(existingClasses) && existingClasses.length > 0
      );
    }
  }, [selectedItem, row, col]);

  const handleSelect = (selectedItem) => {
    console.log("Selected Item: ", selectedItem); // Debugging
    setLocalSelectedItem(selectedItem);
  };

  const handleSave = () => {
    if (!localSelectedItem) {
      alert("Please select a class before saving.");
      return;
    }

    if (row !== null && col !== null && selectedItem?.schedule) {
      // Pass the selected item and actionType back to the parent
      setSelectedItem(localSelectedItem, selectedAction);
    }

    handleClose();
  };

  const handleRemoveClass = () => {
    if (!hasExistingClasses) {
      alert("No classes to remove.");
      return;
    }

    if (row !== null && col !== null && selectedItem?.schedule) {
      // Inform parent to remove class
      setSelectedItem(null, "remove");
    }

    handleClose();
  };

  const CloseModal = () => {
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={CloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Choose Selection</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Select a class:</p>

        <ClassSearchBar
          classList={data}
          onSelectClass={(selectedClass) => {
            console.log("Selected Class in MyModal:", selectedClass);
            setLocalSelectedItem(selectedClass); // Store selected class in modal state
          }}
        />

        {hasExistingClasses && (
          <>
            <p className="text-danger mt-3">
              This block already contains classes. Choose whether to add to the
              existing schedule, replace it entirely, or remove a class.
            </p>
            <Form className="mt-3">
              <Form.Group>
                <Form.Check
                  type="radio"
                  label="Add to Existing"
                  name="actionType"
                  value="add"
                  checked={selectedAction === "add"}
                  onChange={(e) => setSelectedAction(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Replace Existing"
                  name="actionType"
                  value="replace"
                  checked={selectedAction === "replace"}
                  onChange={(e) => setSelectedAction(e.target.value)}
                />
              </Form.Group>
            </Form>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={CloseModal}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={handleRemoveClass}
        >
          Remove Class
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            if (actionType === "delete") {
              handleDelete();
            } else {
              handleSave();
            }
          }}
        >
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;
