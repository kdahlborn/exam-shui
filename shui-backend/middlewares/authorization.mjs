import createError from 'http-errors';
import { getMessageById } from '../services/messages.mjs';

export const authorizeMessageOwnership = () => ({
    before: async (handler) => {
        const { messageId } = handler.event.pathParameters;
        const { userId } = handler.event.user;

        const message = await getMessageById(messageId);

        if (!message) {
            throw createError(404, 'Message not found');
        }

        if (message.userId !== userId) {
            throw createError(
                403,
                'You are not authorized to modify this message',
            );
        }

        handler.event.message = message;
    },
});
