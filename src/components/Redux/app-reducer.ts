import { InferActonsTypes } from "../../types/types";
import { getAuth } from "./auth-reducer";
import { BaseThunkType } from "./redux-store";


let initialState = {
    initialized: false as boolean,
}



const appReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {

        case 'INITIALIZED_SUCCESS':
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


export const actions = {
    initializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' } as const)
}



export const initialApp = () => (dispatch: any) => {
        let promise = dispatch(getAuth())
        Promise.all([promise]).then(() => {
            dispatch(actions.initializedSuccess())
        }) 
    }


export default appReducer;

export type initialStateType = typeof initialState
type ActionsTypes = InferActonsTypes<typeof actions>