import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import {
    getMessages,
    getMessagesByUserId,
} from '../../../services/messages.mjs';
import { formatMessage } from '../../../utils/message.mjs';

export const handler = middy(async (event) => {
    const { userId } = event.queryStringParameters ?? {};

    const messages = userId
        ? await getMessagesByUserId(userId)
        : await getMessages();

    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sendResponse(200, {
        messages: messages.map(formatMessage),
    });
}).use(errorHandler());
