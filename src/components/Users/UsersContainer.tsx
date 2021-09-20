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
import { compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

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

type PathParamsType = {
  userId: string;
};

type Props = mapStateToPropsType &
  mapDispatchToPropsType &
  OwnPropsType &
  RouteComponentProps<PathParamsType>;

class UsersAPI extends React.Component<Props> {
  componentDidMount = () => {
    const queryString = require("query-string");
    const parsed = queryString.parse(this.props.location.search);
    console.log(parsed);

    let actualPage = this.props.currentPage;
    let actualFilter = this.props.filter;
    if (!!parsed.page) actualPage = +parsed.page;
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term };
    if (!!parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          parsed.friend === "null"
            ? null
            : parsed.friend === "false"
            ? false
            : true,
      };

    this.props.getUser(actualPage, this.props.pageSize, actualFilter);

    this.props.history.push({
      pathname: "/users",
      search: `?term=${this.props.filter.term}&friend=${this.props.filter.friend}&page=${this.props.currentPage}`,
    });
  };

  onPageChanged = (pageNumber: number) => {
    this.props.getUser(pageNumber, this.props.pageSize, this.props.filter);
  };

  onFilterChanged = (values: FilterType) => {
    let { pageSize } = this.props;
    this.props.getUser(1, pageSize, values);
  };

  componentDidUpdate = (prevProps: Props) => {
    if (
      this.props.filter !== prevProps.filter ||
      this.props.currentPage !== prevProps.currentPage
    ) {
      this.props.history.push({
        pathname: "/users",
        search: `?term=${this.props.filter.term}&friend=${this.props.filter.friend}&page=${this.props.currentPage}`,
      });
    }
  };

  render = () => {
    return (
      <div>
        <div>{this.props.isFatching ? <Preloader /> : null}</div>
        <Users
          filter={this.props.filter}
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

const UsersContainer = compose<React.ComponentType>(
  connect<
    mapStateToPropsType,
    mapDispatchToPropsType,
    OwnPropsType,
    AppStateType
  >(mapStateToProps, {
    getUser,
    follow,
    unfollow,
  }),
  withRouter
)(UsersAPI);

export default UsersContainer;
