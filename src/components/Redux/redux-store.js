import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));

window.__store__ = store;


export default store;