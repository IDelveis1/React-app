import { stopSubmit } from "redux-form";
import { AuthAPI } from "../../api/api";

const USER_AUTH_DATA = 'USER_AUTH_DATA'

let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case USER_AUTH_DATA:
            return (
                {
                    ...state,
                    ...action.payload,      
                }
            );
        default:
            return state;
    }
}



export const setUserAuthData = (id, login, email, isAuth) => ({ type: USER_AUTH_DATA, payload: {id, login, email, isAuth} });

export const getAuth = () => {
    return (dispatch) => {
     return AuthAPI.me().then(response => {
         if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
            dispatch(setUserAuthData(id, login, email, true));
         }
        });
    }
}

export const logIn = (email, password, rememberMe) => {
    return (dispatch) => {
     AuthAPI.login(email, password, rememberMe).then(response => {
         if (response.data.resultCode === 0) {
        dispatch(getAuth())
         } else {
             let message = response.data.messages.length > 0 ? response.data.messages[0] : 'some error'
             dispatch(stopSubmit('login', {_error: message}))
         }
        });
    }
}

export const logout = () => {
    return (dispatch) => {
     AuthAPI.logout().then(response => {
         if (response.data.resultCode === 0) {
        dispatch(setUserAuthData(null, null, null, false));
         }
        });
    }
}


export default authReducer;