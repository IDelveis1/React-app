import React from 'react';
import { connect } from 'react-redux';
import { setUserProfile } from '../Redux/profile-reducer';
import axios from 'axios';
import Profile from './Profile';
import { Redirect, withRouter } from 'react-router';
import { UsersAPI } from '../../api/api';
import { getProfile, getStatus, updateStatus } from '../Redux/profile-reducer'
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';


class ProfileAPI extends React.Component {
  

componentDidMount = () => {

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

  render = () => {
    debugger;

    return (
      <div>
          <Profile { ...this.props } profile={ this.props.profile } status={this.props.status} updateStatus={this.props.updateStatus} />
        </div>
      )

  }

}

const mapStateToProps = (state) => ({
  profile: state.ProfilePage.profile,
  status: state.ProfilePage.status,
  authorizedUserId: state.Auth.id,
  isAuth: state.Auth.isAuth
  
})

export default compose(
  connect(mapStateToProps, {setUserProfile, getProfile, getStatus, updateStatus}),
  withRouter,
  withAuthRedirect
)(ProfileAPI)
