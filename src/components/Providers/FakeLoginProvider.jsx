import React, { createContext, useContext, useState } from 'react';

export const FakeLoginContext = createContext({
    isLoggedIn: false,
    loading: false,
    error: null,
    login: () => {},
    logout: () => {}
});

export const FakeLoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const fakeCsrfToken = "fake-csrf-token-12345"; // Define a fake CSRF token

    const login = (username, password) => {
        console.log(`Successful Login attempted with username: ${username} and password: ${password}`);
        sessionStorage.setItem('csrfToken', fakeCsrfToken);
        setIsLoggedIn(true);
    };

    const logout = () => {
        console.log("Successful Logout attempted");
        sessionStorage.removeItem('csrfToken');
        setIsLoggedIn(false);
    };

    const secureCall = async (apiUrl, path, options = {}) => {
        console.log(`Faking call to ${apiUrl}${path}`);
        const csrfToken = sessionStorage.getItem('csrfToken');
        return {status: "success", csrfToken: csrfToken};
    };

    const contextValue = {
        isLoggedIn: isLoggedIn,
        loading: false,
        error: null,
        login: login,
        logout: logout,
        secureCall: secureCall
    };

    return (
        <FakeLoginContext.Provider value={contextValue}>
            {children}
        </FakeLoginContext.Provider>
    );
};

export const useFakeLogin = () => useContext(FakeLoginContext);
