import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import DropDown from "./dropdown";
import SearchBar from "./SearchBar";

const FormItem = ({ teacherLogs, onSelectTeacher }) => {
  console.log("returned item in form component");
  return (
    <div>
      <h2 className="mt-3">Search for Teacher </h2>
      <SearchBar teacherLogs={teacherLogs} onSelectTeacher={onSelectTeacher} />
    </div>
  );
};

export default FormItem;
