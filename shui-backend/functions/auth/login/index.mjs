import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { getUserByEmail } from '../../../services/users.mjs';
import { validateBody } from '../../../middlewares/validation.mjs';
import { loginSchema } from '../../../models/userModels.mjs';
import { comparePassword } from '../../../utils/bcrypt.mjs';
import { signToken } from '../../../utils/jwt.mjs';

export const handler = middy(async (event) => {
    const { email, password } = event.body;

    const user = await getUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
        return sendResponse(400, {
            message: 'Invalid username and/or password',
        });
    }

    return sendResponse(200, {
        message: 'User logged in!',
        token: signToken({
            id: user.id,
            username: user.username,
            email: user.email,
        }),
    });
})
    .use(httpJsonBodyParser())
    .use(validateBody(loginSchema))
    .use(errorHandler());
