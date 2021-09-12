import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { actions } from "../Redux/dialog-reducer";
import { AppStateType } from "../Redux/redux-store";
import Dialogs from "./Dialogs";

let mapStateToProps = (state: AppStateType) => {
  return {
    DataForMessage: state.DialogPage.MessageData,
    DataForDialog: state.DialogPage.DialogData,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    addMessage: actions.addMessageActionCreator,
  }),
  withAuthRedirect
)(Dialogs);
