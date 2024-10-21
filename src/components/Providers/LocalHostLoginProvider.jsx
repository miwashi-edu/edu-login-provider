import React, { createContext, useContext, useState } from 'react';
import { login, logout, refresh, secureCall } from './authServiceLocalHost.js';

const LocalLoginContext = createContext();
const localConfig = { apiUrl: 'http://localhost:3000/api/auth' };  // Configuration for local development

export const LocalHostLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const result = await authService.login(localConfig, username, password);
            setIsLoggedIn(result.isLoggedIn);
            sessionStorage.setItem('csrfToken', result.csrfToken);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            setIsLoggedIn(false);
        }
    };

    // Similar updates for logout, refresh, secureCall using localConfig

    const contextValue = { isLoggedIn, loading, error, login: handleLogin, logout: authService.logout, secureCall: authService.secureCall };

    return (
        <LocalLoginContext.Provider value={contextValue}>
            {children}
        </LocalLoginContext.Provider>
    );
};

export const useLocalHostLogin = () => useContext(LocalLoginContext);
