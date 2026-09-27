export const createMessage = (message) => {
    const id = crypto.randomUUID().slice(0, 8);
    const date = new Date().toISOString();

    return {
        ...message,

        PK: 'MESSAGE',
        SK: id,

        GSI1PK: `USER#${message.username}`,
        GSI1SK: `${date}#${id}`,

        id,
        createdAt: date,
    };
};

export const formatMessage = (message) => {
    const { PK, SK, GSI1PK, GSI1SK, ...publicMessage } = message;

    return publicMessage;
};
