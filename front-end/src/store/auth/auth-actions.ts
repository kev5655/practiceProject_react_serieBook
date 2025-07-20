import { convert_JSObject_To_x_www_form_urlencoded, sendRequest } from "../../utils/api.ts";
import { authActions } from './auth-slice.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define a temporary AppDispatch type until we can properly import it
type AppDispatch = any;

// Define TypeScript interfaces for the data types
export interface LoginData {
    username: string;
    password: string;
}

export interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    lifetime: string;
}

let refreshTokenTimer: ReturnType<typeof setTimeout>;

// Use Redux Toolkit's createAsyncThunk for handling async operations
export const login = createAsyncThunk(
    'auth/login',
    async (loginData: LoginData, { dispatch }) => {
        try {
            const requestConfig = {
                url: '/api/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: loginData,
            };

            try {
                const token = await sendRequest(requestConfig) as TokenResponse;

                // Handle successful login
                refreshTokenScheduler(token.lifetime, dispatch, token.refresh_token);
                dispatch(authActions.login({
                    access_token: token.access_token,
                    refresh_token: token.refresh_token
                }));
                dispatch(authActions.resetLoginFailed());
                sessionStorage.setItem("access_token", token.access_token);
                sessionStorage.setItem("refresh_token", token.refresh_token);

                return token;
            } catch (err) {
                dispatch(authActions.loginFailed({ errorText: err instanceof Error ? err.message : 'Login failed' }));
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }
);

const refreshTokenScheduler = (lifetime: string, dispatch: AppDispatch, refresh_token: string) => {
    const remainingTime = parseInt(lifetime) - 2000;
    clearTimeout(refreshTokenTimer);
    refreshTokenTimer = setTimeout(() => refreshAccessToken(dispatch, refresh_token), remainingTime);
};

export const signUp = createAsyncThunk(
    'auth/signup',
    async (signUpData: SignUpData, { dispatch }) => {
        try {
            const requestConfig = {
                url: '/api/user/save',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: signUpData
            };

            try {
                await sendRequest(requestConfig);

                // After successful signup, log the user in
                return dispatch(login({
                    username: signUpData.username,
                    password: signUpData.password
                }));
            } catch (err) {
                dispatch(authActions.signUpFailed({ errorText: err instanceof Error ? err.message : 'Signup failed' }));
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const checkUsernameAvailability = createAsyncThunk(
    'auth/usernameAvailability',
    async (username: string, { dispatch }) => {
        try {
            const requestConfig = {
                url: '/api/user/available',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { username }
            };

            try {
                const isUserAvailable = await sendRequest(requestConfig) as { isUserAvailable: boolean };
                dispatch(authActions.setIsUserAvailable(isUserAvailable));
                return isUserAvailable;
            } catch (err) {
                dispatch(authActions.signUpFailed({ errorText: err instanceof Error ? err.message : 'Check username availability failed' }));
                throw err;
            }
        } catch (error) {
            throw error;
        }
    }
);

export const loadAuth = createAsyncThunk(
    'auth/loadAuth',
    async (_, { dispatch }) => {
        const refresh_token = sessionStorage.getItem("refresh_token");
        if (!refresh_token) return null;

        try {
            return await refreshAccessToken(dispatch, refresh_token);
        } catch (error) {
            throw error;
        }
    }
);

const refreshAccessToken = async (dispatch: AppDispatch, refresh_token: string): Promise<TokenResponse | null> => {
    try {
        const requestConfig = {
            url: '/api/token/refresh',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + refresh_token
            },
        };

        try {
            const token = await sendRequest(requestConfig) as TokenResponse;

            clearTimeout(refreshTokenTimer);
            refreshTokenScheduler(token.lifetime, dispatch, token.refresh_token);
            dispatch(authActions.login({
                access_token: token.access_token,
                refresh_token: token.refresh_token
            }));

            sessionStorage.setItem("access_token", token.access_token);
            sessionStorage.setItem("refresh_token", token.refresh_token);

            return token;
        } catch (err) {
            dispatch(authActions.logout());
            return null;
        }
    } catch (error) {
        throw error;
    }
};

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { dispatch }) => {
        clearTimeout(refreshTokenTimer);
        sessionStorage.removeItem("refresh_token");
        sessionStorage.removeItem("access_token");
        dispatch(authActions.logout());
        return true;
    }
);
