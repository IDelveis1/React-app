import React, { ReactNode } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import { actions } from "../Redux/auth-reducer";
import { logout } from "../Redux/auth-reducer";
import { AppStateType } from "../Redux/redux-store";

type PropsType = {
  login: string | null;
  isAuth: boolean;
  logout: () => void;
  children?: ReactNode;
};

class HeaderContainer extends React.PureComponent<PropsType> {
  render() {
    return <Header {...this.props} />;
  }
}

const mapStateToProps = (state: AppStateType) => ({
  login: state.Auth.login as null | string,
  isAuth: state.Auth.isAuth,
});

type mapStateToPropsType = ReturnType<typeof mapStateToProps>;

type mapDispatchToPropsType = {
  logout: () => void;
};

export default connect<
  mapStateToPropsType,
  mapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { logout })(HeaderContainer);
