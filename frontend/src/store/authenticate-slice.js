import {createSlice} from "@reduxjs/toolkit";


const INIT_SingUpError = {
    isFailed: false,
    errorText: ''
};
// ToDo update loginFailed to login Error like SingUpError
const authenticateSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuth: false,
        loginFailed: false,
        singUpError: INIT_SingUpError,
        access_token: null,
        refreshToken: null,
    },
    reducers: {
        login(state, action){
            state.isAuth = true
            state.singUpError = INIT_SingUpError
            state.access_token = action.payload.access_token
            state.refreshToken = action.payload.refresh_token
        },
        logout(state){
            state.isAuth = false
            state.access_token = null
            state.refreshToken = null
        },
        loginFailed(state){
            state.loginFailed = true
        },
        singUpFailed(state, action){
            state.singUpError.isFailed = true
            state.singUpError.errorText = action.payload.errorText
        }

    }
})

export const authActions = authenticateSlice.actions;

export default authenticateSlice;