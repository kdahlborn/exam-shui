import { db } from './db.mjs';
import { GetCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const addUser = async (user) => {
    try {
        const command = new PutCommand({
            TableName: 'shui-db',
            Item: user,
        });

        await db.send(command);

        return true;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const getUserByEmail = async (email) => {
    try {
        const command = new QueryCommand({
            TableName: 'shui-db',
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk AND GSI1SK = :gsi1sk',
            ExpressionAttributeValues: {
                ':gsi1pk': 'USER',
                ':gsi1sk': `EMAIL#${email.toLowerCase()}`,
            },
        });

        const { Items } = await db.send(command);

        return Items[0];
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const command = new GetCommand({
            TableName: 'shui-db',
            Key: {
                PK: `USER#${username}`,
                SK: 'PROFILE',
            },
        });

        const { Item } = await db.send(command);

        return Item;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};
