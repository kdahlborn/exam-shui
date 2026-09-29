import { hashPassword } from './bcrypt.mjs';

export const createUser = async (body) => {
    const userId = crypto.randomUUID().slice(0, 5);

    return {
        PK: `USER#${body.username}`,
        SK: 'PROFILE',

        GSI1PK: 'USER',
        GSI1SK: `EMAIL#${body.email.toLowerCase()}`,

        userId,
        username: body.username.toLowerCase(),
        email: body.email.toLowerCase(),
        password: await hashPassword(body.password),

        createdAt: new Date().toISOString(),
    };
};
