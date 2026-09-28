import { z } from 'zod';

// create a zod schema for login including email and password
// validate that email contains an "@" symbol
export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(1, 'Password is required'),
});

// create a zod schema for register including name, email and password
// validate that username is at least 2 characters long, email contains an "@" symbol and that the password is at least 8 characters long
export const registerSchema = z.object({
    username: z
        .string()
        .min(2, { message: 'Username must be at least 2 characters long' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' }),
});
