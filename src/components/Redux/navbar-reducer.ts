type FriendDataType = {
    id: number
    name: string
}

let initialState = {
    FriendData: [
    {id: 1, name: 'Masha'},
    {id: 2, name: 'Tanya'},
    {id: 3, name: 'Sasha'},
] as Array<FriendDataType>,
}

type initialStateType = typeof initialState

const navbarReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    return state;
}

export default navbarReducer;