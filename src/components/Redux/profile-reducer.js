import { ProfileAPI, UsersAPI } from "../../api/api"

const ADD_POST = 'ADD-POST'
const UPDATE_NEW_TEXT_POST = 'UPDATE-NEW-TEXT-POST'
const SET_USER_PROFILE = 'SET-USER-PROFILE'
const SET_STATUS = 'SET-STATUS'

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
        default:
            return state;
    }
}


export const addPostActionCreator = (Post) => ({ type: 'ADD-POST', Post });

export const updateNewTextPostActionCreator = (text) => ({ type: 'UPDATE-NEW-TEXT-POST', newText: text });

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatus = (status) => ({ type: SET_STATUS, status });

export const getProfile = (userId) => {
    return (dispatch) => {

        UsersAPI.getProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        });
    }
}

export const getStatus = (userId) => {
    debugger;
    return (dispatch) => {

        ProfileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {

        ProfileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
            }
        });
    }
}

export default profileReducer;