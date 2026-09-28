import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (token) => {
                const decoded = jwtDecode(token);
                set({
                    token,
                    user: {
                        userId: decoded.userId,
                        username: decoded.username,
                        email: decoded.email,
                    },
                });
            },
            logout: () => {
                set({
                    token: null,
                    user: null,
                });
            },
        }),
        {
            name: 'auth',
        },
    ),
);
