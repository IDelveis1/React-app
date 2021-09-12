import { InferActonsTypes } from "../../types/types";

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
}



const dialogReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            return (
                {
                ...state,
                MessageData: [...state.MessageData, {
                    id: 4,
                    message: action.newMessageBody,
                }],
                });
        default: return state;
    }
}


export const actions = {
    addMessageActionCreator: (newMessageBody: string) => ({type: 'ADD-MESSAGE', newMessageBody} as const ),
}

export default dialogReducer;

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

export type initialStateType = typeof initialState
type ActionsTypes = InferActonsTypes<typeof actions>