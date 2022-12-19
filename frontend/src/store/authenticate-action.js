import {convert_JSObject_To_x_www_form_urlencoded} from "../utils/api";
import {authActions} from './authenticate-slice'
import {api} from '../utils/api'
import {UnauthorizedError} from "../utils/Error";


export const authRequest = (loggingData) => {
    return async (dispatch) => {
        const body = convert_JSObject_To_x_www_form_urlencoded(loggingData)

        const {sendRequestFN: sendAuthRequest} = api();

        const requestConfig = {
            url: 'http://localhost:8081/api/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body
        }

        const extractor = (token) => {
            dispatch(authActions.login({
                access_token: token.access_token,
                refresh_token: token.refresh_token
            }))
            sessionStorage.setItem("access_token", token.access_token)
            sessionStorage.setItem("refreshToken", token.refresh_token)
        }

        const catchError = (err) => {
            dispatch(authActions.loginFailed({errorText: err.message}))
            alert(err.message)
        }


        await sendAuthRequest(requestConfig, extractor, catchError)

    }
}

export const singUpRequest = (singUpDate) => {
    return async (dispatch) => {

        const {sendRequestFN: sendAuthRequest} = api();

        const requestConfig = {
            url: 'http://localhost:8081/api/user/save',
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
            alert(err.message)
            console.log(err)
        }


        await sendAuthRequest(requestConfig, extractor, catchError)

    }
}

export const isUsernameAvailable = (username) => {
    return async (dispatch) => {
        const {sendRequestFN: sendIsUserAvailableRequest} = api();

        const requestConfig = {
            url: 'http://localhost:8081/api/user/available',
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
            alert(err.message)
            console.log(err)
        }


        await sendIsUserAvailableRequest(requestConfig, extractor, catchError)
    }
}

export const loadAuth = () => {
    return (dispatch) => {
        const refresh_token = sessionStorage.getItem("refreshToken")
        if(!refresh_token) return

        refreshAccessToken(dispatch, refresh_token).then()
    }
}

const refreshAccessToken = async (dispatch, refresh_token) => {
        const {sendRequestFN: sendTokenRefreshRequest} = api();

        const requestConfig = {
            url: 'http://localhost:8081/api/token/refresh',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'Authorization': 'Bearer ' + refresh_token
            },
        }

        const extractor = (token) => {
            dispatch(authActions.login({
                access_token: token.access_token,
                refresh_token: token.refresh_token
            }))
            sessionStorage.setItem("access_token", token.access_token)
            sessionStorage.setItem("refreshToken", token.refresh_token)
        }

        const catchError = (err) => {
            dispatch(authActions.logout())
        }

        await sendTokenRefreshRequest(requestConfig, extractor, catchError)

}

