const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    DialogData: [
        {id: 1, name: 'Masha'},
        {id: 2, name: 'Tanya'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Oleg'},
        {id: 5, name: 'Anya'},
        {id: 6, name: 'Lesha'},
      ] as Array<DialogType>,
    MessageData: [
        {id: 1, message: 'Hello'},
        {id: 1, message: 'How are you'},
        {id: 1, message: 'What is going on?'}
      ] as Array<MessageType>,
    NewMessage: '' as string,
}

export type initialStateType = typeof initialState

const dialogReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return (
                {
                ...state,
                MessageData: [...state.MessageData, {
                    id: 4,
                    message: action.newMessageBody,
                }],
                NewMessage: '',
                });
        case UPDATE_NEW_MESSAGE:
            return (
                {...state,
                    NewMessage: action.newMessage,
                }
            )
        default: return state;
    }
}

type addMessageActionCreatorType = {
    type: typeof ADD_MESSAGE
    newMessageBody: string
}

export const addMessageActionCreator = (newMessageBody: string): addMessageActionCreatorType => ({type: ADD_MESSAGE, newMessageBody})

type updateNewMessageActionCreatorType = {
    type: typeof UPDATE_NEW_MESSAGE
    newMessage: string
}
 
export const updateNewMessageActionCreator = (text: string): updateNewMessageActionCreatorType => ({type: UPDATE_NEW_MESSAGE, newMessage: text})

type ActionsTypes = addMessageActionCreatorType | updateNewMessageActionCreatorType


export default dialogReducer;