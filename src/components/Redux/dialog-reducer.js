const ADD_MESSAGE = 'ADD-MESSAGE'
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE'

let initialState = {
    DialogData: [
        {id: 1, name: 'Masha'},
        {id: 2, name: 'Tanya'},
        {id: 3, name: 'Sasha'},
        {id: 4, name: 'Oleg'},
        {id: 5, name: 'Anya'},
        {id: 6, name: 'Lesha'},
      ],
    MessageData: [
        {id: 1, message: 'Hello'},
        {id: 1, message: 'How are you'},
        {id: 1, message: 'What is going on?'}
      ],
    NewMessage: '',
}

const dialogReducer = (state = initialState, action) => {
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



export const addMessageActionCreator = (newMessageBody) => ({type: 'ADD-MESSAGE', newMessageBody})
 
export const updateNewMessageActionCreator = (text) => ({type: 'UPDATE-NEW-MESSAGE', newMessage: text})


export default dialogReducer;