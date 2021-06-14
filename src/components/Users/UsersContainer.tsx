import React from 'react'
import { connect } from 'react-redux';
import { getUser, follow, unfollow, UsersType } from '../Redux/user-reducer';
import Users from './Users'
import Preloader from '../common/preloader/preloader';
import { getPageSize, getTotalUsersCount, getCurrentPage, getIsFatching, getFollowingInProgress, getUsersSuper, getUsera } from '../Redux/users-selectors'
import { AppStateType } from '../Redux/redux-store';



type mapStateToPropsType = {
    isFatching: boolean
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type mapDispatchToPropsType = {
    getUser: (currentPage: number, pageSize: number) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
}

type OwnPropsType = {

}

type Props = mapStateToPropsType & mapDispatchToPropsType & OwnPropsType 

class UsersAPI extends React.Component<Props> {

    componentDidMount = () => {
        this.props.getUser(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUser(pageNumber, this.props.pageSize);
    }

    render = () => {
        return <div>
            <div>
                {this.props.isFatching ? <Preloader /> : null}
            </div>


            <Users
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
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return (
        {users: getUsera(state),
            pageSize: getPageSize(state),
                totalUsersCount: getTotalUsersCount(state),
                    currentPage: getCurrentPage(state),
                        isFatching: getIsFatching(state),
                            followingInProgress: getFollowingInProgress(state),
        }
    )
}


const UsersContainer = connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUser, follow, unfollow
    })(UsersAPI);


export default UsersContainer;