import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import {
    addUser,
    getUserByEmail,
    getUserByUsername,
} from '../../../services/users.mjs';
import { createUser } from '../../../utils/user.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { registerSchema } from '../../../models/userModels.mjs';

export const handler = middy(async (event) => {
    const usernameExists = await getUserByUsername(event.body.username);
    const emailExists = await getUserByEmail(event.body.email);

    if (usernameExists) {
        return sendResponse(409, { message: 'Username already exists' });
    }

    if (emailExists) {
        return sendResponse(409, { message: 'Email already exists' });
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
