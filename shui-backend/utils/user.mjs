import { hashPassword } from './bcrypt.mjs';

export const createUser = async (body) => {
    const userId = crypto.randomUUID().slice(0, 5);
    const username = body.username.toLowerCase();
    const email = body.email.toLowerCase();

    return {
        PK: `USER#${username}`,
        SK: 'PROFILE',

        GSI1PK: 'USER',
        GSI1SK: `EMAIL#${email}`,

        userId,
        username,
        email,
        password: await hashPassword(body.password),

        createdAt: new Date().toISOString(),
    };
};
