import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeMessageOwnership } from '../../../middlewares/authorization.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { messageSchema } from '../../../models/messageModels.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { updateMessage } from '../../../services/messages.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { formatMessage } from '../../../utils/message.mjs';

export const handler = middy(async (event) => {
    const { messageId } = event.pathParameters;
    const result = await updateMessage(messageId, event.body);

    return sendResponse(200, {
        message: 'Message updated',
        updatedMessage: formatMessage(result),
    });
})
    .use(httpJsonBodyParser())
    .use(authenticateUser())
    .use(authorizeMessageOwnership())
    .use(validateBody(messageSchema))
    .use(errorHandler());
