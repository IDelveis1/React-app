import { UsersAPI } from "../../api/api"

const FOLLOW = 'FOLLOW'
const UNFOLLOW = 'UNFOLLOW'
const SET_USERS = 'SET_USERS'
const SET_USER_CURRENT_PAGE = 'SET_USER_CURRENT_PAGE'
const SET_USER_TOTAL_COUNT = 'SET_USER_TOTAL_COUNT'
const SET_PRE_LOADER = 'SET_PRE_LOADER'
const SET_FOLLOWING_IN_PROGRESS = 'SET_FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFatching: false,
    followingInProgress: [],
};


const usersReducer = (state = initialState, action) => {
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
                        : [state.followingInProgress.filter(id => id != action.userId)]
                }
            )
        default:
            return state;
    }
}


export const followSuccess = (userId) => ({ type: FOLLOW, userId });

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setUserCurrentPage = (currentPage) => ({ type: SET_USER_CURRENT_PAGE, currentPage })

export const setUserTotalCount = (totalCount) => ({ type: SET_USER_TOTAL_COUNT, count: totalCount })

export const setPreloader = (isFatching) => ({ type: SET_PRE_LOADER, isFatching })

export const setFollowingInProgress = (isFatching, userId) => ({ type: SET_FOLLOWING_IN_PROGRESS, isFatching, userId })


export const getUser = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setPreloader(true));
        dispatch(setUserCurrentPage(currentPage))
        UsersAPI.getUser(currentPage, pageSize).then(data => {
            dispatch(setPreloader(false));
            dispatch(setUsers(data.items))
            dispatch(setUserTotalCount(data.totalCount))

        })
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        UsersAPI.follow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setFollowingInProgress(false, userId));
                dispatch(followSuccess(userId))
            }
        });
}
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(setFollowingInProgress(true, userId));
        UsersAPI.unfollow(userId).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setFollowingInProgress(false, userId));
                dispatch(unfollowSuccess(userId))
            }
        });
    }
}




export default usersReducer;