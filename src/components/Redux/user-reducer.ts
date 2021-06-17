import { AppStateType } from './redux-store';
import { ThunkAction } from "redux-thunk"
import { UsersAPI } from "../../api/api"
import { Dispatch } from 'react';
import { InferActonsTypes, PhotosType } from '../../types/types';


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

type ActionsTypes = InferActonsTypes<typeof actions>

const usersReducer = (state: InitialStateType = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
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
        case 'UNFOLLOW':
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

        case 'SET_USERS':
            return (
                {
                    ...state,
                    users: action.users,
                }
            )
        case 'SET_USER_CURRENT_PAGE':
            return (
                {
                    ...state,
                    currentPage: action.currentPage
                }
            )
        case 'SET_USER_TOTAL_COUNT':
            return (
                {
                    ...state,
                    totalUsersCount: action.count
                }
            )
        case 'SET_PRE_LOADER':
            return (
                {
                    ...state,
                    isFatching: action.isFatching
                }
            )
        case 'SET_FOLLOWING_IN_PROGRESS':
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


export const actions = {
    followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<UsersType>) => ({ type: 'SET_USERS', users } as const),
    setUserCurrentPage: (currentPage: number) => ({ type: 'SET_USER_CURRENT_PAGE', currentPage } as const),
    setUserTotalCount: (totalCount: number) => ({ type: 'SET_USER_TOTAL_COUNT', count: totalCount } as const),
    setPreloader: (isFatching: boolean) => ({ type: 'SET_PRE_LOADER', isFatching } as const),
    setFollowingInProgress: (isFatching: boolean, userId: number) => ({ type: 'SET_FOLLOWING_IN_PROGRESS', isFatching, userId } as const)

}









type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUser = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setPreloader(true));
        dispatch(actions.setUserCurrentPage(currentPage))
        let data = await UsersAPI.getUser(currentPage, pageSize);
            dispatch(actions.setPreloader(false));
            dispatch(actions.setUsers(data.items))
            dispatch(actions.setUserTotalCount(data.totalCount))
    }
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setFollowingInProgress(true, userId));
        let response = await UsersAPI.follow(userId);
            if (response.data.resultCode === 0) {
                dispatch(actions.setFollowingInProgress(false, userId));
                dispatch(actions.followSuccess(userId))

            }
}
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setFollowingInProgress(true, userId));
        let response = await UsersAPI.unfollow(userId)
            if (response.data.resultCode === 0) {
                dispatch(actions.setFollowingInProgress(false, userId));
                dispatch(actions.unfollowSuccess(userId))
            }
    }
}




export default usersReducer;