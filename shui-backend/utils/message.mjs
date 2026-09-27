export const createMessage = (messageData) => {
    const messageId = crypto.randomUUID().slice(0, 8);
    const date = new Date().toISOString();

    return {
        ...messageData,

        PK: 'MESSAGE',
        SK: messageId,

        GSI1PK: `USER#${messageData.userId}`,
        GSI1SK: `${messageId}`,

        messageId,
        createdAt: date,
    };
};

export const formatMessage = (message) => {
    const { PK, SK, GSI1PK, GSI1SK, ...publicMessage } = message;

    return publicMessage;
};
