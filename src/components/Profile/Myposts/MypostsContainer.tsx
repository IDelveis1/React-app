import React from "react";
import { connect } from "react-redux";
import { actions } from "../../Redux/profile-reducer";
import { AppStateType } from "../../Redux/redux-store";
import Myposts from "./Myposts";

type mapStateToProps = ReturnType<typeof mapStateToProps>;
type mapDispatchToPropsType = {
  addPost: (Post: string) => void;
};

let mapStateToProps = (state: AppStateType) => {
  return {
    Data: state.ProfilePage.Data,
  };
};

const MypostsContainer = connect<
  mapStateToProps,
  mapDispatchToPropsType,
  {},
  AppStateType
>(mapStateToProps, { addPost: actions.addPostActionCreator })(Myposts);

export default MypostsContainer;
