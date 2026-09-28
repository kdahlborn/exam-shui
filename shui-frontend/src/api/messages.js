const BASE_URL = 'https://hon3uvp5z2.execute-api.eu-north-1.amazonaws.com';

export const getMessages = async () => {
    const response = await fetch(`${BASE_URL}/messages`);

    if (!response.ok) {
        throw new Error('Could not fetch messages');
    }

    const data = await response.json();

    return data.messages;
};

export const getMessagesByUserId = async (userId) => {
    const params = new URLSearchParams({
        userId,
    });

    const response = await fetch(`${BASE_URL}/messages?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Could not fetch user messages');
    }

    const data = await response.json();

    return data.messages;
};

export const getMyMessages = async (token) => {
    const response = await fetch(`${BASE_URL}/users/me/messages`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Could not fetch your messages');
    }

    const data = await response.json();

    return data.messages;
};

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

    if (!response.ok) {
        throw new Error('Could not update message');
    }

    const data = await response.json();

    return data.updatedMessage;
};

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
