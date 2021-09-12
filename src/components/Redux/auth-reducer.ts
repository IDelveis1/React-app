import { Dispatch } from "react";
import { ThunkAction } from "redux-thunk";
import { AuthAPI } from "../../api/auth-api";
import { SecurityAPI } from "../../api/security-api";
import { InferActonsTypes } from "../../types/types";
import { AppStateType, BaseThunkType } from "./redux-store";

let initialState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    isAuth: false as boolean,
    captcha: null  as null | string,
}

const authReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'USER_AUTH_DATA':
            return (
                {
                    ...state,
                    ...action.payload,
                }
            );
        case 'SET_CAPTCHA_URL':
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

export const actions = {
    setUserAuthData: (id: number | null, login: string | null, email: string | null, isAuth: boolean) => ({ type: 'USER_AUTH_DATA', payload: { id, login, email, isAuth } } as const),
    setCaptchaUrlSuccess: (captcha: string) => ({ type: 'SET_CAPTCHA_URL', payload: { captcha } } as const)
}

//================================================================================================================

export const getAuth = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.me();
        if (data.resultCode === 0) {
            let { id, login, email } = data.data;
            dispatch(actions.setUserAuthData(id, login, email, true));

        }
    }
}

export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string | null = null): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.login(email, password, rememberMe, captcha);
        if (data.resultCode === 0) {
            dispatch(getAuth())
        } else {
            if (data.resultCode === 10) {
                dispatch(getCaptchaUrl())
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'some error'
            /* dispatch(stopSubmit('login', { _error: message })) */
        }
    }
}

export const logout = (): ThunkType => {
    return async (dispatch) => {
        let data = await AuthAPI.logout()
        if (data.resultCode === 0) {
            dispatch(actions.setUserAuthData(null, null, null, false));
        }
    }
}

export const getCaptchaUrl = (): ThunkType => {
    return async (dispatch) => {
        const data = await SecurityAPI.getCaptcha()
        const captcha = data.url
        dispatch(actions.setCaptchaUrlSuccess(captcha));
    }
}

export default authReducer;

export type initialStateType = typeof initialState
type ActionsTypes = InferActonsTypes<typeof actions>
export type ThunkType = BaseThunkType<ActionsTypes>