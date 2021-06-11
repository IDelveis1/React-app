import { AuthAPI, SecurityAPI } from "../../api/api";

const USER_AUTH_DATA = 'USER_AUTH_DATA'
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL'

let initialState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    isAuth: false as boolean,
    captcha: null  as null | number,
}

export type initialStateType = typeof initialState


const authReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {

        case USER_AUTH_DATA:
            return (
                {
                    ...state,
                    ...action.payload,
                }
            );
        case SET_CAPTCHA_URL:
            return (
                {
                    ...state,
                    ...action.payload,
                }
            )
        default:
            return state;
    }
}

type setUserAuthDataActionPayloadType = {
    id: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean 
}

type setUserAuthDataActionType = {
    type: typeof USER_AUTH_DATA
    payload: setUserAuthDataActionPayloadType
}

export const setUserAuthData = (id: number | null, login: string | null, email: string | null, isAuth: boolean): setUserAuthDataActionType => ({ type: USER_AUTH_DATA, payload: { id, login, email, isAuth } });

type setCaptchaUrlSuccessActionType = {
    type: typeof SET_CAPTCHA_URL
    payload: {captcha: string}
}

export const setCaptchaUrlSuccess = (captcha: string): setCaptchaUrlSuccessActionType => ({ type: SET_CAPTCHA_URL, payload: { captcha } })

export const getAuth = () => {
    return async (dispatch: any) => {
        let response = await AuthAPI.me();
        if (response.data.resultCode === 0) {
            let { id, login, email } = response.data.data;
            dispatch(setUserAuthData(id, login, email, true));

        }
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string | null = null) => {
    return async (dispatch: any) => {
        let response = await AuthAPI.login(email, password, rememberMe, captcha);
        if (response.data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
            /* dispatch(stopSubmit('login', { _error: message })) */
        }
    }
}

export const logout = () => {
    return async (dispatch: any) => {
        let response = await AuthAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setUserAuthData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        debugger;
        const response = await SecurityAPI.getCaptcha()
        const captcha = response.data.url
        dispatch(setCaptchaUrlSuccess(captcha));
    }
}


export default authReducer;