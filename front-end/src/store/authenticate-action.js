import {convert_JSObject_To_x_www_form_urlencoded} from "../utils/api";
import {authActions} from './authenticate-slice'
import {api} from '../utils/api'

let refreshTokenTimer;

export const authRequest = (loggingData) => {
    return async (dispatch) => {
        const body = convert_JSObject_To_x_www_form_urlencoded(loggingData)

        const {sendRequestFN: sendAuthRequest} = api();

        const requestConfig = {
            url: '/api/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        }

        const extractor = (token) => {
            refreshTokenScheduler(token.lifetime, dispatch, token.refresh_token);
            dispatch(authActions.login({
                access_token: token.access_token,
                refresh_token: token.refresh_token
            }))
            dispatch(authActions.resetLoginFailed());
            sessionStorage.setItem("access_token", token.access_token)
            sessionStorage.setItem("refresh_token", token.refresh_token)
        }

        const catchError = (err) => {
            dispatch(authActions.loginFailed({errorText: err.message}))
        }


        await sendAuthRequest(requestConfig, extractor, catchError)

    }
}

const refreshTokenScheduler = (lifetime, dispatch, refresh_token) => {

    const remainingTime = parseInt(lifetime) - 2000;

    refreshTokenTimer = setTimeout(refreshAccessToken, remainingTime, dispatch, refresh_token);

}

export const singUpRequest = (singUpDate) => {
    return async (dispatch) => {

        const {sendRequestFN: sendAuthRequest} = api();

        const requestConfig = {
            url: '/api/user/save',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: singUpDate
        }

        const extractor = () => {
            authRequest({
                username: singUpDate.username,
                password: singUpDate.password})
        }

        const catchError = (err) => {
            dispatch(authActions.singUpFailed({errorText: err.message}))
        }

        await sendAuthRequest(requestConfig, extractor, catchError)

    }
}

export const isUsernameAvailable = (username) => {
    return async (dispatch) => {
        const {sendRequestFN: sendIsUserAvailableRequest} = api();

        const requestConfig = {
            url: '/api/user/available',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: username
        }

        const extractor = (isUserAvailable) => {
            dispatch(authActions.setIsUserAvailable(isUserAvailable))
        }

        const catchError = (err) => {
            dispatch(authActions.singUpFailed({errorText: err.message}))
        }


        await sendIsUserAvailableRequest(requestConfig, extractor, catchError)
    }
}

export const loadAuth = () => {
    return (dispatch) => {
        const refresh_token = sessionStorage.getItem("refresh_token")
        if(!refresh_token) return

        refreshAccessToken(dispatch, refresh_token).then()
    }
}

const refreshAccessToken = async (dispatch, refresh_token) => {
        const {sendRequestFN: sendTokenRefreshRequest} = api();

        const requestConfig = {
            url: '/api/token/refresh',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + refresh_token
            },
        }

        const extractor = (token) => {
            clearTimeout(refreshTokenTimer);
            refreshTokenScheduler(token.lifetime, dispatch, token.refresh_token);
            dispatch(authActions.login({
                access_token: token.access_token,
                refresh_token: token.refresh_token
            }));

            sessionStorage.setItem("access_token", token.access_token);
            sessionStorage.setItem("refresh_token", token.refresh_token);
        }

        const catchError = () => {
            dispatch(authActions.logout())
        }

        await sendTokenRefreshRequest(requestConfig, extractor, catchError)

}

export const logout = () => {
    clearTimeout(refreshTokenTimer);
    return (dispatch) => {
        sessionStorage.removeItem("refresh_token")
        sessionStorage.removeItem("access_token")
        dispatch(authActions.logout())
    }
}