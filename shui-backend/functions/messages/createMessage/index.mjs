import { sendResponse } from '../../../responses/index.mjs';

export const handler = async (event) => {
    return sendResponse(200, {
        message: 'Hello',
    });
};
