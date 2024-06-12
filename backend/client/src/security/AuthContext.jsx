import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    const login = () => {
        setIsAuthenticated(true);
        navigate('/verify');
    };
    const register = () => {
        setIsAuthenticated(true);
        navigate('/verify');
    };

    const verify = () => {
        setIsVerified(true);
        navigate('/');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsVerified(false);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isVerified, login, verify, logout , register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
