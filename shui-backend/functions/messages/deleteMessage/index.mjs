import middy from '@middy/core';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeMessageOwnership } from '../../../middlewares/authorization.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { formatMessage } from '../../../utils/message.mjs';
import { deleteMessage } from '../../../services/messages.mjs';

export const handler = middy(async (event) => {
    const { messageId } = event.pathParameters;

    await deleteMessage(messageId);

    return sendResponse(200, {
        message: 'Message deleted',
    });
})
    .use(authenticateUser())
    .use(authorizeMessageOwnership())
    .use(errorHandler());
