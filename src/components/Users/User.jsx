import React from 'react';
import clas from './Users.module.css'
import logo from '../../assets/images/man.png'
import '../../assets/images/loader.css'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { getUser } from '../Redux/user-reducer';
import { UsersAPI } from '../../api/api';
import Paginator from '../common/Paginator/Paginator';



const User = (props) => {
    return (
        <div className={clas.use}>
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

export default User;