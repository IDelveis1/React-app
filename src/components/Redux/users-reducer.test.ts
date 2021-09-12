import usersReducer, { actions, InitialStateType } from "./user-reducer"

let state: InitialStateType

beforeEach(() => {
    state = {
        users: [{
            id: 1, name: 'Idel 0', followed: false, 
            photos: {small: null, large: null}, status: 'status 0'
        },
        {
            id: 2, name: 'Idel 1', followed: false, 
            photos: {small: null, large: null}, status: 'status 1'
        },
        {
            id: 3, name: 'Idel 2', followed: true, 
            photos: {small: null, large: null}, status: 'status 2'
        },
        {
            id: 4, name: 'Idel 3', followed: true, 
            photos: {small: null, large: null}, status: 'status 3'
        }],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFatching: false, 
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        } 
    }
})


test('follow success', () => {
    const newState = usersReducer(state, actions.followSuccess(1))
    expect(newState.users[0].followed).toBeTruthy()
    expect(newState.users[1].followed).toBeFalsy()
})

test('unfollow success', () => {
    const newState = usersReducer(state, actions.unfollowSuccess(3))
    expect(newState.users[3].followed).toBeTruthy()
    expect(newState.users[2].followed).toBeFalsy()
})