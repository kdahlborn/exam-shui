import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { createMessage, formatMessage } from '../../../utils/message.mjs';
import { addMessage } from '../../../services/messages.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { messageSchema } from '../../../models/messageModels.mjs';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';

export const handler = middy(async (event) => {
    const { text } = event.body;
    const { userId, username } = event.user;

    const message = createMessage({
        text,
        userId,
        username,
    });

    await addMessage(message);

    return sendResponse(201, {
        message: 'Message created',
        newMessage: formatMessage(message),
    });
})
    .use(httpJsonBodyParser())
    .use(authenticateUser())
    .use(validateBody(messageSchema))
    .use(errorHandler());
