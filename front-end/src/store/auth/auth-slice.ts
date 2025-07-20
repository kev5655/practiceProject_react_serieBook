import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define TypeScript interfaces for the auth state
export interface AuthError {
    isFailed: boolean;
    errorText: string;
}

export interface AuthState {
    isAuth: boolean;
    isUserAvailable: boolean;
    loginError: AuthError;
    signUpError: AuthError;
    access_token: string | null;
    refresh_token: string | null;
}

export interface LoginPayload {
    access_token: string;
    refresh_token: string;
}

export interface ErrorPayload {
    errorText: string;
}

export interface UserAvailablePayload {
    isUserAvailable: boolean;
}

const INIT_ERROR: AuthError = {
    isFailed: false,
    errorText: ''
};

// Create the initial state with type safety
const initialState: AuthState = {
    isAuth: false,
    isUserAvailable: false,
    loginError: INIT_ERROR,
    signUpError: INIT_ERROR,
    access_token: null,
    refresh_token: null,
};

// Create the slice with typed reducers
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.isAuth = true;
            state.signUpError = INIT_ERROR;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
        logout(state) {
            state.isAuth = false;
            state.access_token = null;
            state.refresh_token = null;
        },
        loginFailed(state, action: PayloadAction<ErrorPayload>) {
            state.loginError.isFailed = true;
            state.loginError.errorText = action.payload.errorText;
        },
        resetLoginFailed(state) {
            state.loginError.isFailed = false;
            state.loginError.errorText = '';
        },
        signUpFailed(state, action: PayloadAction<ErrorPayload>) {
            state.signUpError.isFailed = true;
            state.signUpError.errorText = action.payload.errorText;
        },
        resetSignUpFailed(state) {
            state.signUpError.isFailed = false;
            state.signUpError.errorText = '';
        },
        setIsUserAvailable(state, action: PayloadAction<UserAvailablePayload>) {
            state.isUserAvailable = action.payload.isUserAvailable;
        }
    }
});

// Export actions and reducer
export const authActions = authSlice.actions;
export default authSlice.reducer;
