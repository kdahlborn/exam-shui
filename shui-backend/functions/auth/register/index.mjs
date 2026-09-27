import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { addUser, getUserByEmail } from '../../../services/users.mjs';
import { createUser } from '../../../utils/user.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { registerSchema } from '../../../models/userModels.mjs';

export const handler = middy(async (event) => {
    const userExists = await getUserByEmail(event.body.email);

    if (userExists) {
        return sendResponse(409, { message: 'User already exists' });
    }

    const user = await createUser(event.body);

    await addUser(user);

    return sendResponse(201, {
        message: 'User registered successfully!',
    });
})
    .use(httpJsonBodyParser())
    .use(validateBody(registerSchema))
    .use(errorHandler());
