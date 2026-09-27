import middy from '@middy/core';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { getMessages } from '../../../services/messages.mjs';
import { formatMessage } from '../../../utils/message.mjs';

export const handler = middy(async (event) => {
    const messages = await getMessages();

    return sendResponse(200, {
        messages: messages.map(formatMessage),
    });
}).use(errorHandler());
