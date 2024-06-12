import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children, redirectTo }) => {
    const { isAuthenticated, isVerified } = useAuth();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (redirectTo === '/' && !isVerified) {
        return <Navigate to="/verify" />;
    }
    return children;
};

export default PrivateRoute;
