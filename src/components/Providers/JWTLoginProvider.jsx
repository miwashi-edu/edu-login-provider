// src/LoginProvider.js
import React, { createContext, useContext, useState } from 'react';
import { login, logout, refresh, secureCall } from './authService.js';

export const LoginContext = createContext();

export const JWTLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        setLoading(true);
        const result = await login(username, password);
        setIsLoggedIn(result.isLoggedIn);
        setLoading(false);
        setError(result.error || null);
    };

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    };

    const contextValue = { isLoggedIn, loading, error, login: handleLogin, logout: handleLogout, secureCall };

    return (
        <LoginContext.Provider value={contextValue}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
