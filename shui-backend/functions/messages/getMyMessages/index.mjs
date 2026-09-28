import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { getMessagesByUserId } from '../../../services/messages.mjs';
import { formatMessage } from '../../../utils/message.mjs';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';

export const handler = middy(async (event) => {
    const messages = await getMessagesByUserId(event.user.userId);

    messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return sendResponse(200, {
        messages: messages.map(formatMessage),
    });
})
    .use(authenticateUser())
    .use(errorHandler());
