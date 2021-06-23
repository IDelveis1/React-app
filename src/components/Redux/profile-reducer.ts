import { Dispatch } from "react"
import { ThunkAction } from "redux-thunk"
import { ProfileAPI, UsersAPI } from "../../api/api"
import { InferActonsTypes, PhotosType, ProfileType } from "../../types/types"
import { AppStateType } from "./redux-store"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_NEW_PHOTO = 'SET_NEW_PHOTO'

type DataType = {
    id: number
    message: string
    likeCount: number
}

let initialState = {
    Data: [
        { id: 0, message: 'Hi, How are you?', likeCount: 20 },
        { id: 1, message: 'Hello i am idelchik', likeCount: 100 },
    ] as Array<DataType>,
    newPostText: '' as string,
    profile: null as null | ProfileType,
    status: '' as string,
}

type ActionsTypes = InferActonsTypes<typeof actions>

type initialStateType = typeof initialState

const profileReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {

        case ADD_POST:
            return (
                {
                    ...state,
                    Data: [...state.Data, {
                        id: 3,
                        message: action.Post,
                        likeCount: 0
                    }],
                    newPostText: '',
                }
            );
        case UPDATE_NEW_TEXT_POST:
            return (
                {
                    ...state,
                    newPostText: action.newText,
                }
            )
        case SET_USER_PROFILE:
            return (
                {
                    ...state,
                    profile: action.profile
                }
            )
        case SET_STATUS:
            return (
                {
                    ...state,
                    status: action.status
                }
            )
        case SET_NEW_PHOTO:
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
    addPostActionCreator: (Post: string) => ({ type: ADD_POST, Post } as const),
    updateNewTextPostActionCreator: (text: string) => ({ type: UPDATE_NEW_TEXT_POST, newText: text } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SET_NEW_PHOTO, photos } as const),
}


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getProfile = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {

        let response = await UsersAPI.getProfile(userId);
            dispatch(actions.setUserProfile(response.data));
    }
}

export const getStatus = (userId: number): ThunkType => {
    debugger;
    return async (dispatch: Dispatch<ActionsTypes>) => {

        let response = await ProfileAPI.getStatus(userId);
        dispatch(actions.setStatus(response.data));
    }
}

export const updateStatus = (status: string): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await ProfileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
            dispatch(actions.setStatus(status));
            }
    }
}

export const savePhoto = (file: any): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        let response = await ProfileAPI.savePhoto(file);
            if (response.data.resultCode === 0) {
            dispatch(actions.savePhotoSuccess(response.data.data.photos));
            }
    }
}

export const saveProfileForm = (profileForm: ProfileType): ThunkType => {
    return async (dispatch: any, getState: any) => {
        const userId = getState().Auth.id
        let response = await ProfileAPI.saveProfileForm(profileForm);
            if (response.data.resultCode === 0) {
            dispatch(getProfile(userId));
            }
    }
}


export default profileReducer;