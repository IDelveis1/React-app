import { createSelector } from 'reselect'


const getUsera = (state) => {
    return state.UsersPage.users
}

export const getUsersSuper = createSelector(getUsera, (users) => {
    return users.filter(u => true)
})

export const getPageSize = (state) => {
    return state.UsersPage.pageSize
}

export const getTotalUsersCount = (state) => {
    return state.UsersPage.totalUsersCount
}

export const getCurrentPage = (state) => {
    return state.UsersPage.currentPage
}

export const getIsFatching = (state) => {
    return state.UsersPage.isFatching
}


export const getFollowingInProgress = (state) => {
    return state.UsersPage.followingInProgress
}