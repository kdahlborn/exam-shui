import { db } from './db.mjs';
import {
    GetCommand,
    QueryCommand,
    PutCommand,
    DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import createError from 'http-errors';

export const addMessage = async (message) => {
    try {
        const command = new PutCommand({
            TableName: 'shui-db',
            Item: message,
        });

        await db.send(command);

        return true;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const getMessages = async () => {
    try {
        const command = new QueryCommand({
            TableName: 'shui-db',
            KeyConditionExpression: 'PK = :pk',
            ExpressionAttributeValues: {
                ':pk': 'MESSAGE',
            },
        });

        const { Items } = await db.send(command);

        return Items;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};
