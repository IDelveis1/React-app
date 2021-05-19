import React from 'react';
import clas from './Users.module.css'
import '../../assets/images/loader.css'
import Paginator from '../common/Paginator/Paginator';
import User from './User';



const Users = (props) => {
    return (
        <div className={clas.use}>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} onPageChanged={props.onPageChanged} currentPage={props.currentPage} portionSize={10} />
            <User users={props.users} followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>
        </div>
    )
}

export default Users;