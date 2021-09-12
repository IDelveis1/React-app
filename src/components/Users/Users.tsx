import React from "react";
import clas from "./Users.module.css";
import "../../assets/images/loader.css";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { FilterType, UsersType } from "../Redux/user-reducer";
import UserSearchForm from "./UserSearchForm";

type Props = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  users: Array<UsersType>;
  onPageChanged: (pageNumber: number) => void;
  followingInProgress: Array<number>;
  unfollow: (id: number) => void;
  follow: (id: number) => void;
  onFilterChanged: (filter: FilterType) => void;
};

const Users: React.FC<Props> = (props) => {
  return (
    <div className={clas.use}>
      <UserSearchForm onFilterChanged={props.onFilterChanged} />
      <Paginator
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        onPageChanged={props.onPageChanged}
        currentPage={props.currentPage}
        portionSize={10}
      />
      <User
        users={props.users}
        followingInProgress={props.followingInProgress}
        unfollow={props.unfollow}
        follow={props.follow}
      />
    </div>
  );
};

export default Users;
