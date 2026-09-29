const BASE_URL = 'https://hon3uvp5z2.execute-api.eu-north-1.amazonaws.com';

// GET MESSAGES
export const getMessages = async () => {
    const response = await fetch(`${BASE_URL}/messages`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch messages');
    }

    return data.messages;
};

// GET MESSAGE BY ID
export const getMessageById = async (messageId) => {
    const response = await fetch(`${BASE_URL}/messages/${messageId}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch message');
    }

    return data.message;
};

// GET MESSAGES BY USERNAME
export const getMessagesByUsername = async (username) => {
    const params = new URLSearchParams({
        username,
    });

    const response = await fetch(`${BASE_URL}/messages?${params.toString()}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch user messages');
    }

    return data.messages;
};

// GET MY MESSAGES
export const getMyMessages = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me/messages`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not fetch messages');
    }

    return data.messages;
};

// CREATE MESSAGE
export const createMessage = async (text, token) => {
    const response = await fetch(`${BASE_URL}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not create message');
    }

    return data.newMessage;
};

// UPDATE MESSAGE
export const updateMessage = async (messageId, text, token) => {
    const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Could not update message');
    }

    return data.updatedMessage;
};

// DELETE MESSAGE
export const deleteMessage = async (messageId, token) => {
    const response = await fetch(`${BASE_URL}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Could not delete message');
    }

    return response.json();
};
