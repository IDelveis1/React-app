import { AuthAPI } from "../../api/api";
import { getAuth } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let initialState = {
    initialized: false as boolean,
}

export type initialStateType = typeof initialState

const appReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    switch (action.type) {

        case INITIALIZED_SUCCESS:
            return (
                {
                    ...state,
                    initialized: true,      
                }
            );
        default:
            return state;
    }
}


type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

export const initialApp = () => (dispatch: any) => {
        let promise = dispatch(getAuth())
        Promise.all([promise]).then(() => {
            dispatch(initializedSuccess())
        }) 
    }


export default appReducer;