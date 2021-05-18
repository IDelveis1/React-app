import React from 'react';
import clas from './Users.module.css'
import '../../assets/images/loader.css'
import Paginator from '../common/Paginator/Paginator';
import User from './User';



const Users = (props) => {
    return (
        <div className={clas.use}>
            <Paginator totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} currentPage={props.currentPage} />
            <User users={props.users} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>
        </div>
    )
}

export default Users;