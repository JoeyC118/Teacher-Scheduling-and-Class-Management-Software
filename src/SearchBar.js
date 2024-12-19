

import React, {useState} from 'react';
import { Form, FormControl, Button, ListGroup } from "react-bootstrap"

function SearchBar({teacherLogs, onSelectTeacher}) {
    console.log("SearchBar: teacherLogs received:", teacherLogs);
    const[query,setQuery] = useState('')
    const [filteredProfiles, setFilteredProfiles] = useState([])

    const handleInputChange = (event) => {
        const value = event.target.value
        setQuery(value)

        if(value ){
            const matches = teacherLogs.filter((log) => 
                log.name.toLowerCase().includes(value.toLowerCase()))

            setFilteredProfiles(matches)
        }
        else{
            setFilteredProfiles([]);
        }
    }

    const handleOptionClick = (profile) => {
        setQuery(profile.name); // Set the clicked profile name as the query
        setFilteredProfiles([]); // Clear the dropdown after selection
    };


    const handleSearch = (event) => {
        event.preventDefault();
        if (onSelectTeacher) {
            const selectedProfile = (teacherLogs || []).find(
                (log) => log.name.toLowerCase() === query.toLowerCase()
            );

            console.log(selectedProfile)
            onSelectTeacher(selectedProfile || null); // Pass the selected profile or null if not found
        }
        
        setQuery(""); // Reset the search bar text
        setFilteredProfiles([]); // Clear the dropdown

    }

    return(
        <>

    <Form className = "d-flex" onSubmit = {handleSearch}>
        <FormControl type = "search" placeholder="search" value = {query} onChange ={handleInputChange}/>

        <Button variant = "outline-success" type = "submit" onClick={handleSearch}>
            Search
        </Button>
    </Form>

    {filteredProfiles.length > 0 && (
        <ListGroup>
           {filteredProfiles.map((profile) => (
                        <ListGroup.Item
                            key={profile.id}
                            action
                            onClick={() => handleOptionClick(profile)}
                            style={{ cursor: 'pointer' }}
                        >
                            {profile.name}
                        </ListGroup.Item>
                    ))}
        </ListGroup>
    )}
        </>
    )
}

export default SearchBar