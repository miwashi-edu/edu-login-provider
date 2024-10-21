// src/authService.js
export const login = async (config, username, password) => {
    const { apiUrl } = config;
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(`Login failed: ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { isLoggedIn: true, csrfToken: data.csrfToken };
};

export const refresh = async (config) => {
    const { apiUrl } = config;
    const response = await fetch(`${apiUrl}/refresh`, {
        method: 'POST',
        credentials: 'include'
    });
    if (!response.ok) {
        throw new Error(`Token refresh failed: ${response.statusText}`);
    }
    const data = await response.json();
    sessionStorage.setItem('csrfToken', data.csrfToken);
    return { success: true, csrfToken: data.csrfToken };
};

export const secureCall = async (config, url, options = {}) => {
    const { apiUrl } = config;
    const csrfToken = sessionStorage.getItem('csrfToken');
    let response = await fetch(`${apiUrl}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            'X-CSRF-Token': csrfToken,
            'Content-Type': 'Content-Type' in options.headers ? options.headers['Content-Type'] : 'application/json'
        },
        credentials: 'include'
    });
    if (response.status === 403) {
        await refresh(config);
        response = await fetch(`${apiUrl}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                'X-CSRF-Token': sessionStorage.getItem('csrfToken')
            },
            credentials: 'include'
        });
    }
    if (!response.ok) {
        throw new Error(`API call to ${url} failed: ${response.statusText}`);
    }
    return await response.json();
};

// src/authService.js

export const logout = async (config) => {
    const { apiUrl } = config;
    try {
        // Optional: Inform the server to invalidate the session/token
        const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        // Check if you need to handle any response for logout
        if (!response.ok) {
            throw new Error(`Logout failed: ${response.statusText}`);
        }
    } catch (err) {
        console.error('Logout error:', err.message);
        throw err;  // Optionally re-throw if you need to handle this higher up
    } finally {
        // Clear any session-related data regardless of the server's response
        sessionStorage.removeItem('csrfToken');
    }
    return { isLoggedIn: false };
};

