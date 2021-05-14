import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { addMessageActionCreator, updateNewMessageActionCreator } from '../Redux/dialog-reducer'
import Dialogs from './Dialogs';




let mapStateToProps = (state) => {
    return ({
        NewMessage: state.DialogPage.NewMessage,
        DataForMessage: state.DialogPage.MessageData,
        DataForDialog: state.DialogPage.DialogData,
    })
}

let mapDispatchToProps = (dispatch) => {
    return ({
        onAddMessage: (text) => {
        dispatch(updateNewMessageActionCreator(text));
        },
        addMessage: (newMessageBody) => {
            dispatch(addMessageActionCreator(newMessageBody))
        }
    }
    )
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

