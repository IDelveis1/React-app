import { ProfileAPI, UsersAPI } from "../../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'
const SET_NEW_PHOTO = 'SET_NEW_PHOTO'

let initialState = {
    Data: [
        { id: 0, message: 'Hi, How are you?', likeCount: 20 },
        { id: 1, message: 'Hello i am idelchik', likeCount: 100 },
    ],
    newPostText: '',
    profile: null,
    status: '',
}


const profileReducer = (state = initialState, action) => {
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
                    photos: action.photos}
                }
            )    
        default:
            return state;
    }
}


export const addPostActionCreator = (Post) => ({ type: 'ADD-POST', Post });

export const updateNewTextPostActionCreator = (text) => ({ type: 'UPDATE-NEW-TEXT-POST', newText: text });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const savePhotoSuccess = (photos) => ({ type: SET_NEW_PHOTO, photos });

export const getProfile = (userId) => {
    return async (dispatch) => {

        let response = await UsersAPI.getProfile(userId);
            dispatch(setUserProfile(response.data));
    }
}

export const getStatus = (userId) => {
    debugger;
    return async (dispatch) => {

        let response = await ProfileAPI.getStatus(userId);
        dispatch(setStatus(response.data));
    }
}

export const updateStatus = (status) => {
    return async (dispatch) => {
        let response = await ProfileAPI.updateStatus(status);
            if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
            }
    }
}

export const savePhoto = (file) => {
    return async (dispatch) => {
        let response = await ProfileAPI.savePhoto(file);
            if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
            }
    }
}

export const saveProfileForm = (profileForm) => {
    return async (dispatch, getState) => {
        const userId = getState().Auth.id
        let response = await ProfileAPI.saveProfileForm(profileForm);
            if (response.data.resultCode === 0) {
            dispatch(getProfile(userId));
            }
    }
}


export default profileReducer;