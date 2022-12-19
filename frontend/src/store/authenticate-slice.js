import {createSlice} from "@reduxjs/toolkit";

const INIT_ERROR = {
    isFailed: false,
    errorText: ''
};

// ToDo update loginFailed to login Error like SingUpError
const authenticateSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuth: false,
        isUserAvailable: false,
        loginError: INIT_ERROR,
        singUpError: INIT_ERROR,
        access_token: null,
        refreshToken: null,
    },
    reducers: {
        login(state, action){
            state.isAuth = true;
            state.singUpError = INIT_ERROR;
            state.access_token = action.payload.access_token;
            state.refreshToken = action.payload.refresh_token;
        },
        logout(state){
            state.isAuth = false;
            state.access_token = null;
            state.refreshToken = null;
        },
        loginFailed(state, action){
            state.loginError.isFailed = true;
            state.loginError.errorText = action.payload.errorText;

        },
        resetLoginFailed(state){
            state.loginError.isFailed = false;
            state.loginError.errorText = '';
        },
        singUpFailed(state, action){
            state.singUpError.isFailed = true;
            state.singUpError.errorText = action.payload.errorText;
        },
        resetSingUpFailed(state){
            state.singUpError.isFailed = false;
            state.singUpError.errorText = "";
        },
        setIsUserAvailable(state, action){
            state.isUserAvailable = action.payload.isUserAvailable;
        }

    }
})

export const authActions = authenticateSlice.actions;

export default authenticateSlice;