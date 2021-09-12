import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { ProfileAPI } from "../../api/profile-api"
import { InferActonsTypes, PhotosType, ProfileType } from "../../types/types"
import { AppStateType } from "./redux-store"

let initialState = {
    Data: [
        { id: 0, message: 'Hi, How are you?', likeCount: 20 },
        { id: 1, message: 'Hello i am idelchik', likeCount: 100 },
    ] as Array<DataType>,
    profile: null as null | ProfileType,
    status: '' as string,
}

const profileReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'ADD-POST':
            return (
                {
                    ...state,
                    Data: [...state.Data, {
                        id: 3,
                        message: action.Post,
                        likeCount: 0
                    }],
                }
            );
        case 'SET-USER-PROFILE':
            return (
                {
                    ...state,
                    profile: action.profile
                }
            )
        case 'SET-STATUS':
            return (
                {
                    ...state,
                    status: action.status
                }
            )
        case 'SET_NEW_PHOTO':
            return(
                {
                    ...state,
                    profile: {...state.profile,
                    photos: action.photos} as ProfileType
                }
            )    
        default:
            return state;
    }
}

export const actions = {
    addPostActionCreator: (Post: string) => ({ type: 'ADD-POST', Post } as const),
    setUserProfile: (profile: ProfileType) => ({ type: 'SET-USER-PROFILE', profile } as const),
    setStatus: (status: string) => ({ type: 'SET-STATUS', status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: 'SET_NEW_PHOTO', photos } as const),
}

//=============================================================================================================

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {

        let data = await ProfileAPI.getProfile(userId);
            dispatch(actions.setUserProfile(data));
    }
}
export const getStatus = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let data = await ProfileAPI.getStatus(userId);
        dispatch(actions.setStatus(data));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let data = await ProfileAPI.updateStatus(status);
            if (data.resultCode === 0) {
            dispatch(actions.setStatus(status));
            }
    }
}

export const savePhoto = (file: any): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let data = await ProfileAPI.savePhoto(file);
            if (data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(data.data.photos));
            }
    }
}

export const saveProfileForm = (profileForm: ProfileType): ThunkType => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().Auth.id
        let data = await ProfileAPI.saveProfileForm(profileForm);
            if (data.resultCode === 0) {
            dispatch(getProfile(userId));
            }
    }
}


export default profileReducer;

type ActionsTypes = InferActonsTypes<typeof actions>
type initialStateType = typeof initialState
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export type DataType = {
    id: number
    message: string
    likeCount: number
}