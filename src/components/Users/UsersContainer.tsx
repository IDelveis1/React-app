import React from 'react'
import { connect } from 'react-redux';
import { followSuccess, setPreloader, setUserCurrentPage, setUsers, setUserTotalCount, unfollowSuccess, setFollowingInProgress, getUser, follow, unfollow, UsersType } from '../Redux/user-reducer';
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


/* let mapStateToProps = (state) => {
    return (
        {
            users: state.UsersPage.users,
            pageSize: state.UsersPage.pageSize,
            totalUsersCount: state.UsersPage.totalUsersCount,
            currentPage: state.UsersPage.currentPage,
            isFatching: state.UsersPage.isFatching,
            followingInProgress: state.UsersPage.followingInProgress,

        }
    )
} */

let mapStateToProps = (state: AppStateType) => {
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


/* let mapDispatchToProps = (dispatch) => {
    return (
        {
            follow: (userId) => {
                dispatch(followAC(userId))
            },
            unfollow: (userId) => {
                dispatch(unfollowAC(userId))
            },
            setUsers: (users) => {
                dispatch(setUsersAC(users))
            },
            setUserCurrentPage: (currentPage) => {
                dispatch(setUserCurrentPageAC(currentPage))
            },
            setUserTotalCount: (totalCount) => {
                dispatch(setUserTotalCountAC(totalCount))
            },
            setPreloader: (isFatching) => {
                dispatch(setPreloaderAC(isFatching))
            }
        }
    )

}
 */

const UsersContainer = connect<mapStateToPropsType, mapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUser, follow, unfollow
    })(UsersAPI);


export default UsersContainer;