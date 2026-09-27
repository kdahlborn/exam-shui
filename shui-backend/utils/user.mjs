import { hashPassword } from './bcrypt.mjs';

export const createUser = async (body) => {
    const id = crypto.randomUUID().slice(0, 5);

    return {
        PK: `USER#${id}`,
        SK: 'PROFILE',

        GSI1PK: 'USER',
        GSI1SK: `EMAIL#${body.email.toLowerCase()}`,

        id,
        username: body.username.toLowerCase(),
        email: body.email.toLowerCase(),
        password: await hashPassword(body.password),

        createdAt: new Date().toISOString(),
    };
};
