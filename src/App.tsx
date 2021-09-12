import React, { Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import { Route } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { initialApp } from "./components/Redux/app-reducer";
import { connect } from "react-redux";
import Preloader from "./components/common/preloader/preloader";
import { compose } from "redux";
import { withRouter, Redirect } from "react-router";
import { AppStateType } from "./components/Redux/redux-store";
import { withSuspense } from "./components/hoc/withSuspense";

//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);

type Props = {
  initialApp: () => void;
  initialized: boolean;
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends React.Component<Props> {
  componentDidMount() {
    this.props.initialApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Route path="/dialogs" render={() => <SuspendedDialogs />}></Route>
          <Redirect exact from="/" to="/profile" />
          <Route
            path="/profile/:userId?"
            render={() => <SuspendedProfile />}
          ></Route>
          <Route path="/news" component={News}></Route>
          <Route path="/music" component={Music}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/users" render={() => <UsersContainer />}></Route>
          <Route path="/login" render={() => <Login />}></Route>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.App.initialized,
});

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initialApp })
)(App);
