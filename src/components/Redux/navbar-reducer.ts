export type FriendDataType = {
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



const navbarReducer = (state: initialStateType = initialState, action: any): initialStateType => {
    return state;
}

export default navbarReducer;

type initialStateType = typeof initialState