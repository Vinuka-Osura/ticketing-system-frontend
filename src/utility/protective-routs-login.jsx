import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    console.log(token);
    return !!token;
};

const PrivateRoute = ({ element }) => {
    // return isAuthenticated() ? element : <Navigate to="/login" />;
    return element;
    
};

export default PrivateRoute;
