const BASE_URL = 'https://hon3uvp5z2.execute-api.eu-north-1.amazonaws.com';

export const register = async (userData) => {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error('Could not register user');
    }

    return response.json();
};

export const login = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Could not log in');
    }

    const data = await response.json();

    return data;
};
