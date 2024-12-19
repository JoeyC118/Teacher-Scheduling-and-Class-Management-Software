import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MyNavBar from './navbar';  // Import your NavBar here
import HomePage from './home';    // Import your HomePage component
import AddPage from './addpage'; // Import your AddPage component
import ClassListPage from './classlist';
import TeacherListPage from './teacherlist';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <HashRouter>  {/* Ensure the whole app is wrapped in HashRouter */}
      <MyNavBar />  {/* NavBar is placed outside of Routes, so it is rendered on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {}
        <Route path="/add-page" element={<AddPage />} />
        <Route path="/classlist-page" element={<ClassListPage />} />
        <Route path="/teacherlist-page" element={<TeacherListPage />} />
      
      </Routes>
    </HashRouter>
  );
};

export default App;
