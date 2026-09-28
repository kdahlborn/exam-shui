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
