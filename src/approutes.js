import React from 'react';
import { Routes, Route } from 'react-router-dom';
import testPage from './addpage'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<testPage />} />
        </Routes>
    );
};

export default AppRoutes;