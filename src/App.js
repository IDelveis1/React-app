import React, { Suspense } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import { Route } from 'react-router-dom';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initialApp } from '../src/components/Redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/preloader';
import { compose } from 'redux';
import { withRouter } from 'react-router';

//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))



class App extends React.Component {
  componentDidMount() {
    this.props.initialApp()
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Route path='/dialogs' render={() => {
            return <Suspense fallback={<div>Loading...</div>}>
            <DialogsContainer />
            </Suspense>}}></Route>
            <Route path='/profile/:userId?' render={() => <ProfileContainer />}></Route>
            <Route path='/news' component={News}></Route>
            <Route path='/music' component={Music}></Route>
            <Route path='/settings' component={Settings}></Route>
            <Route path='/users' render={() => <UsersContainer />}></Route>
            <Route path='/login' render={() => <Login />}></Route>
          </div>
        </div>
      )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.App.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initialApp }))
  (App);
