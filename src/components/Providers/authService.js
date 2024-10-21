/**
 * Asynchronously logs in a user using given credentials.
 * @param {Object} config - Configuration object containing API URL.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise that resolves with the login status and CSRF token.
 * @throws {Error} Throws an error if the login request fails.
 */
export async function login(config, username, password) {
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
}

/**
 * Refreshes the authentication token.
 * @param {Object} config - Configuration object containing API URL.
 * @returns {Promise<Object>} A promise that resolves with the success status and new CSRF token.
 * @throws {Error} Throws an error if the token refresh fails.
 */
export async function refresh(config) {
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
}

/**
 * Makes a secure API call to a specified URL.
 * @param {Object} config - Configuration object containing API URL.
 * @param {string} url - The endpoint URL to which the API call is made.
 * @param {Object} [options={}] - Additional fetch options.
 * @returns {Promise<Object>} A promise that resolves with the JSON response.
 * @throws {Error} Throws an error if the API call fails.
 */
export async function secureCall(config, url, options = {}) {
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
}

/**
 * Logs out the current user and clears session data.
 * @param {Object} config - Configuration object containing API URL.
 * @returns {Promise<Object>} A promise that resolves indicating the user is logged out.
 * @throws {Error} Throws an error if the logout process fails.
 */
export async function logout(config) {
    const { apiUrl } = config;
    try {
        const response = await fetch(`${apiUrl}/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Logout failed: ${response.statusText}`);
        }
    } catch (err) {
        console.error('Logout error:', err.message);
        throw err;  // Optionally re-throw if you need to handle this higher up
    } finally {
        sessionStorage.removeItem('csrfToken');
    }
    return { isLoggedIn: false };
}
