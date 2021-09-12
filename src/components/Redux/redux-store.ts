import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './auth-reducer';
import dialogReducer from './dialog-reducer';
import navbarReducer from './navbar-reducer';
import profileReducer from './profile-reducer';
import usersReducer from './user-reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './app-reducer';

let rootReducer = combineReducers({
    ProfilePage: profileReducer,
    DialogPage: dialogReducer,
    SiteBar: navbarReducer,
    UsersPage: usersReducer,
    Auth: authReducer,
    App: appReducer,

})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type BaseThunkType<AT extends Action = Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, AT>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore


window.__store__ = store;


export default store;