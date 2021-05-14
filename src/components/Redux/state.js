import dialogReducer from "./dialog-reducer"
import profileReducer from "./profile-reducer"
import navbarReducer from './navbar-reducer'


let store = {
  _state: {
  ProfilePage: {
      Data: [
      {id:0, message: 'Hi, How are you?', likeCount: 20},
      {id:1, message: 'Hello i am idelchik', likeCount: 100},
    ],
    newPostText: ''
  },
  DialogPage: {
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
  },
  SiteBar: {
    FriendData: [
          {id: 1, name: 'Masha'},
          {id: 2, name: 'Tanya'},
          {id: 3, name: 'Sasha'},
    ],
    
  },
},
getState() {
  return this._state;
},
_rerenderEntireTree() {
  console.log('State was changed')
},
subscribe(observer) {
this._rerenderEntireTree = observer;
},
dispatch(action) {
  this._state.DialogPage = dialogReducer(action, store._state.DialogPage);
  this._state.ProfilePage = profileReducer(action, store._state.ProfilePage);
  this._state.SiteBar = navbarReducer(action, store._state.SiteBar);

  this._rerenderEntireTree(this._state);
},
}



 
export default store;
