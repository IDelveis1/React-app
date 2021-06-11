import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'



export const getUsera = (state: AppStateType) => {
    return state.UsersPage.users
}

export const getUsersSuper = createSelector(getUsera, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.UsersPage.pageSize
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.UsersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.UsersPage.currentPage
}

export const getIsFatching = (state: AppStateType) => {
    return state.UsersPage.isFatching
}


export const getFollowingInProgress = (state: AppStateType) => {
    return state.UsersPage.followingInProgress
}