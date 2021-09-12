import React from "react";
import { connect } from "react-redux";
import { actions } from "../Redux/profile-reducer";
import Profile from "./Profile";
import { withRouter } from "react-router";
import {
  getProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfileForm,
} from "../Redux/profile-reducer";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../../types/types";
import { AppStateType } from "../Redux/redux-store";
import { RouteComponentProps } from "react-router-dom";

/* type mapStateToPropsType = {
  authorizedUserId: number;
  isAuth: boolean;
  status: string;
  profile: ProfileType | null;
}; */

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

type mapDispatchToPropsType = {
  getProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  savePhoto: (file: File) => void;
  saveProfileForm: (profile: ProfileType) => void;
  updateStatus: (status: string) => void;
};

type ownPropsType = {};

type PathParamsType = {
  userId: string;
};

type Props = mapStateToPropsType &
  mapDispatchToPropsType &
  ownPropsType &
  RouteComponentProps<PathParamsType>;

class ProfileAPI extends React.Component<Props> {
  refreshPage = () => {
    let userId: number | null = +this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }

    if (!userId) {
      console.error("takoi tip ne exists");
    } else {
      this.props.getProfile(userId);
      this.props.getStatus(userId);
    }
  };

  componentDidMount = () => {
    this.refreshPage();
  };

  componentDidUpdate = (prevProps: Props) => {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshPage();
    }
  };

  render = () => {
    return (
      <div>
        <Profile
          isOwner={!this.props.match.params.userId}
          {...this.props}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
          saveProfileForm={this.props.saveProfileForm}
          savePhoto={this.props.savePhoto}
        />
      </div>
    );
  };
}

const mapStateToProps = (state: AppStateType) => ({
  profile: state.ProfilePage.profile,
  status: state.ProfilePage.status,
  authorizedUserId: state.Auth.id,
  isAuth: state.Auth.isAuth,
});

export default compose<React.ComponentType>(
  connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    ownPropsType,
    AppStateType
  >(mapStateToProps, {
    saveProfileForm,
    savePhoto,
    getProfile,
    getStatus,
    updateStatus,
  }),
  withRouter,
  withAuthRedirect
)(ProfileAPI);
