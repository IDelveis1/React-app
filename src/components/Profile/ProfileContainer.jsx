import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../Redux/profile-reducer';
import axios from 'axios';
import Profile from './Profile';
import { Redirect, withRouter } from 'react-router';
import { UsersAPI } from '../../api/api';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfileForm } from '../Redux/profile-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileAPI extends React.Component {
  
refreshPage = () => {
  let userId = this.props.match.params.userId;

  if (!userId) {
    userId = this.props.authorizedUserId;
    if (!userId) {
      this.props.history.push('/login')
    }
  }

  this.props.getProfile(userId);
  this.props.getStatus(userId);
}

componentDidMount = () => {
  this.refreshPage()
}

componentDidUpdate = (prevProps, prevState, snapshot) => {
  if (this.props.match.params.userId != prevProps.match.params.userId) {
  this.refreshPage()
  }
}

  render = () => {
    debugger;

    return (
      <div>
          <Profile saveProfileForm={this.props.saveProfileForm} savePhoto={this.props.savePhoto} isOwner={!this.props.match.params.userId} { ...this.props } profile={ this.props.profile } status={this.props.status} updateStatus={this.props.updateStatus} />
        </div>
      )

  }

}

const mapStateToProps = (state) => ({
  profile: state.ProfilePage.profile,
  status: state.ProfilePage.status,
  authorizedUserId: state.Auth.id,
  isAuth: state.Auth.isAuth,
  
})

export default compose(
  connect(mapStateToProps, {saveProfileForm, savePhoto, setUserProfile, getProfile, getStatus, updateStatus}),
  withRouter,
  withAuthRedirect
)(ProfileAPI)
