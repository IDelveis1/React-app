import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { boolean } from "yup/lib/locale";
import { AppStateType } from "../Redux/redux-store";

const mapStateToPropsForRedirect = (state: AppStateType) =>
  ({
    isAuth: state.Auth.isAuth,
  } as PropsType);

type PropsType = {
  isAuth: boolean;
};

export function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>
) {
  const RedirectComponent: React.FC<PropsType> = (props) => {
    let { isAuth, ...restProps } = props;
    if (!isAuth) return <Redirect to="/login" />;
    return <WrappedComponent {...(restProps as WCP)} />;
  };

  let ConnectedAuthRedirectComponent = connect<
    PropsType,
    {},
    WCP,
    AppStateType
  >(mapStateToPropsForRedirect)(RedirectComponent);
  return ConnectedAuthRedirectComponent;
}
