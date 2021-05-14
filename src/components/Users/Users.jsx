import React from 'react';
import clas from './Users.module.css'
import logo from '../../assets/images/man.png'
import '../../assets/images/loader.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../Redux/user-reducer';
import { UsersAPI } from '../../api/api';



const Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div className={clas.use}>
            <div>
                {pages.map(p => {
                    return <span onClick={(e) => { props.onPageChanged(p) }} className={props.currentPage === p && clas.selectedPage}>{p}</span>
                })}
            </div>
            {
                props.users.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={'/profile/' + u.id} >
                                <img src={u.photos.small != null ? u.photos.small : logo} />
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={ props.followingInProgress.some(id => id === u.id) } onClick={() => {
                                    props.unfollow(u.id)
                                }}>Unfollow</button>
                                : <button disabled={ props.followingInProgress.some(id => id === u.id) } onClick={() => {
                                    props.follow(u.id);              
                                }}>Follow</button>}

                        </div>
                    </span>
                    <span>
                        <div>{u.name}</div><div>{u.status}</div>
                    </span>
                    <span>
                        {/*  <div>{'u.location.city'}</div><div>{'u.location.country'}</div> */}
                    </span>
                </div>
                )}
        </div>
    )
}

export default Users;