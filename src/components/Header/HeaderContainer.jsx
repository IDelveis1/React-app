import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { setUserAuthData } from '../Redux/auth-reducer';
import { logout } from '../Redux/auth-reducer'

class HeaderContainer extends React.Component {

    render () {
        return(
            <Header { ...this.props }  />
        )
    }
}

const mapStateToProps = (state) => ({
    login: state.Auth.login,
    isAuth: state.Auth.isAuth

})
    

export default connect(mapStateToProps, {setUserAuthData, logout})(HeaderContainer);