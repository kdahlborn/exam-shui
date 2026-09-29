import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { getMessageById } from '../../../services/messages.mjs';
import { formatMessage } from '../../../utils/message.mjs';

export const handler = middy(async (event) => {
    const { messageId } = event.pathParameters;

    const message = await getMessageById(messageId);

    if (!message) {
        return sendResponse(404, 'Message not found');
    }

    return sendResponse(200, {
        message: formatMessage(message),
    });
}).use(errorHandler());
