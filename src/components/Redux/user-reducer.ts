import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk"
import { UsersAPI } from "../../api/api"
import { Dispatch } from 'react';
import { PhotosType } from '../../types/types';

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_USER_CURRENT_PAGE = 'SET_USER_CURRENT_PAGE'
const SET_USER_TOTAL_COUNT = 'SET_USER_TOTAL_COUNT'
const SET_PRE_LOADER = 'SET_PRE_LOADER'
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS'

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    isFatching: false as boolean,
    followingInProgress: [] as number[]
};

type InitialStateType = typeof initialState


const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return (
                {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return { ...u, followed: true }
                        }
                        return u;
                    }
                    )
                })
        case UNFOLLOW:
            return (
                {
                    ...state,
                    users: state.users.map(u => {
                        if (u.id === action.userId) {
                            return { ...u, followed: false }
                        }
                        return u;
                    })
                }
            )

        case SET_USERS:
            return (
                {
                    ...state,
                    users: action.users,
                }
            )
        case SET_USER_CURRENT_PAGE:
            return (
                {
                    ...state,
                    currentPage: action.currentPage
                }
            )
        case SET_USER_TOTAL_COUNT:
            return (
                {
                    ...state,
                    totalUsersCount: action.count
                }
            )
        case SET_PRE_LOADER:
            return (
                {
                    ...state,
                    isFatching: action.isFatching
                }
            )
        case SET_FOLLOWING_IN_PROGRESS:
            return (
                {
                    ...state,
                    followingInProgress: action.isFatching ?
                        [...state.followingInProgress, action.userId]
                        : state.followingInProgress.filter(id => id != action.userId)
                }
            )
        default:
            return state;
    }
}

type FollowSuccessType = {
    type: typeof FOLLOW
    userId: number
}

export const followSuccess = (userId: number): FollowSuccessType => ({ type: FOLLOW, userId });

type UnfollowSuccessType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({ type: UNFOLLOW, userId });

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UsersType>
}

export const setUsers = (users: Array<UsersType>): SetUsersType => ({ type: SET_USERS, users })

type SetUserCurrentPageType = {
    type: typeof SET_USER_CURRENT_PAGE
    currentPage: number
}

export const setUserCurrentPage = (currentPage: number): SetUserCurrentPageType => ({ type: SET_USER_CURRENT_PAGE, currentPage })

type setUserTotalCountType = {
    type: typeof SET_USER_TOTAL_COUNT
    count: number
}

export const setUserTotalCount = (totalCount: number): setUserTotalCountType => ({ type: SET_USER_TOTAL_COUNT, count: totalCount })

type SetPreloaderType = {
    type: typeof SET_PRE_LOADER
    isFatching: boolean
}

export const setPreloader = (isFatching: boolean): SetPreloaderType => ({ type: SET_PRE_LOADER, isFatching })

type setFollowingInProgressType = {
    type: typeof SET_FOLLOWING_IN_PROGRESS
    isFatching: boolean
    userId: number
}

export const setFollowingInProgress = (isFatching: boolean, userId: number): setFollowingInProgressType => ({ type: SET_FOLLOWING_IN_PROGRESS, isFatching, userId })

type ActionsTypes = FollowSuccessType | setFollowingInProgressType | SetPreloaderType | setUserTotalCountType | SetUserCurrentPageType |
SetUsersType | UnfollowSuccessType 

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUser = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setPreloader(true));
        dispatch(setUserCurrentPage(currentPage))
        let data = await UsersAPI.getUser(currentPage, pageSize);
            dispatch(setPreloader(false));
            dispatch(setUsers(data.items))
            dispatch(setUserTotalCount(data.totalCount))
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setFollowingInProgress(true, userId));
        let response = await UsersAPI.follow(userId);
            if (response.data.resultCode === 0) {
                dispatch(setFollowingInProgress(false, userId));
                dispatch(followSuccess(userId))

            }
}
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(setFollowingInProgress(true, userId));
        let response = await UsersAPI.unfollow(userId)
            if (response.data.resultCode === 0) {
                dispatch(setFollowingInProgress(false, userId));
                dispatch(unfollowSuccess(userId))
            }
    }
}




export default usersReducer;