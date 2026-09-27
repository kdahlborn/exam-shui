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
