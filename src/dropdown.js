import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';



const DropDown = ({data, className, displayProperty, onSelectItem, title = "DropDown"}) => {


    const handleSelect = (selectedItem) => {
      onSelectItem(selectedItem);
    }
    return (
      <DropdownButton className = {className} id="dropdown-basic-button" title={title}>
        {data.map((item, index) => (<Dropdown.Item key ={index} onClick={() => handleSelect(item)}>{item[displayProperty]}</Dropdown.Item>))}
      </DropdownButton>
    );
  }

  export default DropDown; 