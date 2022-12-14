import {createSlice} from "@reduxjs/toolkit";


const authenticateSlice = createSlice({
    name: 'authentication',
    initialState: {
        isAuth: false,
        loginFailed: false,
        access_token: null,
        refreshToken: null,
    },
    reducers: {
        login(state, action){
            state.isAuth = true
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
        }

    }
})

export const authActions = authenticateSlice.actions;

export default authenticateSlice;