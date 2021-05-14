import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import dialogReducer from './dialog-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './user-reducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from './app-reducer';

let reducers = combineReducers({
    ProfilePage: profileReducer,
    DialogPage: dialogReducer,
    SiteBar: navbarReducer,
    UsersPage: usersReducer,
    Auth: authReducer,
    form: formReducer,
    App: appReducer,

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;


export default store;