import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import News from './components/News/News';
import Settings from './components/Settings/Settings';
import Music from './components/Music/Music';
import { Route } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initialApp } from '../src/components/Redux/app-reducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/preloader';
import { compose } from 'redux';
import { withRouter } from 'react-router';





class App extends React.Component {
  componentDidMount() {
    this.props.initialApp()
  }

  render() {
    debugger;
    if (!this.props.initialized) {
      return <Preloader />
    }

      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <Navbar />
          <div className='app-wrapper-content'>
            <Route path='/dialogs' render={() => <DialogsContainer />}></Route>
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
