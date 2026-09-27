import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { createMessage, formatMessage } from '../../../utils/messages.mjs';
import { addMessage } from '../../../services/messages.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { messageSchema } from '../../../models/messageModel.mjs';

export const handler = middy(async (event) => {
    const { text } = event.body;
    const username = 'konrad'; // Används för test

    const message = createMessage({ text, username });

    await addMessage(message);

    return sendResponse(201, {
        message: 'Message created',
        newMessage: formatMessage(message),
    });
})
    .use(httpJsonBodyParser())
    .use(validateBody(messageSchema))
    .use(errorHandler());
