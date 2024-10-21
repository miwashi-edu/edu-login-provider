import React, { createContext, useContext, useState } from 'react';
import { login, logout, secureCall } from './authService.js';  // Only these imports

export const JWTLoginContext = createContext();

export const JWTLoginProvider = ({ children, config }) => {  // Pass config here
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const result = await login(config, username, password);  // Pass config to service
            setIsLoggedIn(result.isLoggedIn);
            setError(null);
        } catch (e) {
            setIsLoggedIn(false);
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout(config);  // Pass config to service
            setIsLoggedIn(false);
        } catch (e) {
            console.error("Logout failed:", e);
            // Optionally handle logout error (e.g., showing a message)
        }
    };

    const handleSecureCall = async (url, options) => {
        return secureCall(config, url, options);  // Pass config to service
    };

    const contextValue = {
        isLoggedIn,
        loading,
        error,
        login: handleLogin,
        logout: handleLogout,
        secureCall: handleSecureCall
    };

    return (
        <JWTLoginContext.Provider value={contextValue}>
            {children}
        </JWTLoginContext.Provider>
    );
};

export const useJWTLogin = () => useContext(JWTLoginContext);
