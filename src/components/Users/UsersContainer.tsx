import React from "react";
import { connect } from "react-redux";
import {
  getUser,
  follow,
  unfollow,
  UsersType,
  FilterType,
} from "../Redux/user-reducer";
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import {
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFatching,
  getFollowingInProgress,
  getUsera,
  getUsersFilter,
} from "../Redux/users-selectors";
import { AppStateType } from "../Redux/redux-store";

type mapStateToPropsType = {
  isFatching: boolean;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  users: Array<UsersType>;
  followingInProgress: Array<number>;
  filter: FilterType;
};

type mapDispatchToPropsType = {
  getUser: (currentPage: number, pageSize: number, filter: FilterType) => void;
  unfollow: (id: number) => void;
  follow: (id: number) => void;
};

type OwnPropsType = {};

type Props = mapStateToPropsType & mapDispatchToPropsType & OwnPropsType;

class UsersAPI extends React.Component<Props> {
  componentDidMount = () => {
    this.props.getUser(
      this.props.currentPage,
      this.props.pageSize,
      this.props.filter
    );
  };

  onPageChanged = (pageNumber: number) => {
    this.props.getUser(pageNumber, this.props.pageSize, this.props.filter);
  };

  onFilterChanged = (values: FilterType) => {
    let { pageSize } = this.props;
    this.props.getUser(1, pageSize, values);
    console.log("fafa");
  };

  render = () => {
    return (
      <div>
        <div>{this.props.isFatching ? <Preloader /> : null}</div>

        <Users
          onFilterChanged={this.onFilterChanged}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </div>
    );
  };
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
  return {
    users: getUsera(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFatching: getIsFatching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state),
  };
};

const UsersContainer = connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  OwnPropsType,
  AppStateType
>(mapStateToProps, {
  getUser,
  follow,
  unfollow,
})(UsersAPI);

export default UsersContainer;
