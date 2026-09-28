import { db } from './db.mjs';
import {
    GetCommand,
    QueryCommand,
    PutCommand,
    UpdateCommand,
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
            ScanIndexForward: false,
        });

        const { Items } = await db.send(command);

        return Items;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const getMessagesByUserId = async (userId) => {
    try {
        const command = new QueryCommand({
            TableName: 'shui-db',
            IndexName: 'GSI1',
            KeyConditionExpression: 'GSI1PK = :gsi1pk',
            ExpressionAttributeValues: {
                ':gsi1pk': `USER#${userId}`,
            },
        });

        const { Items } = await db.send(command);

        return Items;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const getMessageById = async (messageId) => {
    try {
        const command = new GetCommand({
            TableName: 'shui-db',
            Key: {
                PK: 'MESSAGE',
                SK: messageId,
            },
        });

        const { Item } = await db.send(command);

        return Item;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const updateMessage = async (messageId, updatedData) => {
    try {
        const command = new UpdateCommand({
            TableName: 'shui-db',
            Key: {
                PK: 'MESSAGE',
                SK: messageId,
            },
            UpdateExpression: 'SET #text = :text',
            ExpressionAttributeNames: {
                '#text': 'text',
            },
            ExpressionAttributeValues: {
                ':text': updatedData.text,
            },
            ReturnValues: 'ALL_NEW',
        });

        const { Attributes } = await db.send(command);

        return Attributes;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};

export const deleteMessage = async (messageId) => {
    try {
        const command = new DeleteCommand({
            TableName: 'shui-db',
            Key: {
                PK: 'MESSAGE',
                SK: messageId,
            },
        });

        await db.send(command);

        return true;
    } catch (error) {
        console.error('ERROR:', error);
        throw createError(500, error.message);
    }
};
