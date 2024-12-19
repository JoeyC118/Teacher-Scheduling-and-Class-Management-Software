import React, { useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";

function ClassSearchBar({ classList, onSelectClass }) {
  console.log("ClassSearchBar: classList received:", classList);

  const [query, setQuery] = useState(""); //we define a state that stores what text was defined in the search bar
  const [filteredClasses, setFilteredClasses] = useState([]); //the piece of state that has the filtered display


  // this function is called when the text in the search bar changes.
  const handleInputChange = (event) => { 
    const value = event.target.value; //take the target value and store it into a variable
    setQuery(value); //we set the query value 

    if (value) { //we are checkng if value is a valid value and if so we are displaying the matches found 
      const matches = (classList || []).filter((classItem) =>
        classItem.className && classItem.className.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredClasses(matches);
    } else {
      setFilteredClasses([]);
    }
  };

  const handleOptionClick = (classItem) => { //this is called when the user selects something in the dropdown
    setQuery(classItem.className); // to keep the selected name in the search bar for user understanding
    setFilteredClasses([]); // clear drop down
   
    if (onSelectClass) {
      onSelectClass(classItem); 
    }


  };

  return (
    <>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search for a class"
          value={query}
          onChange={handleInputChange}
        />
      </Form>

      {filteredClasses.length > 0 && (
        <ListGroup>
          {filteredClasses.map((classItem) => (
            <ListGroup.Item
              key={classItem._id}
              action
              onClick={() => handleOptionClick(classItem)}
              style={{ cursor: "pointer" }}
            >
              {classItem.className}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default ClassSearchBar;