import React from 'react';
import { Redirect } from 'react-router';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Messages/Messages';
import {Form, Field, reduxForm} from 'redux-form';
import { Element } from '../Formcontrols/Formcontrols';
import { maxLengthCreator, required } from '../../utils/validators/validators';


const Textarea = Element('textarea')

const Dialogs = (props) => {

    /* let addMessage = () => {
        props.addMessage()
    } */

    let onAddMessage = (e) => {
        let text = e.target.value;
        props.onAddMessage(text);
    }

    let sendMessage = (values) => {
        props.addMessage(values.newMessageBody)


    }

    let DialogElements = props.DataForDialog.map(d => <DialogItem name={d.name} id={d.id} />);

    let MessageElements = props.DataForMessage.map(m => <Message message={m.message} />)


    return (
        <div className={s.DialogsContent}>
            <div className={s.Dialogs}>
                {DialogElements}
            </div>
            <div className={s.Message}>
                {MessageElements}
                <DialogFormRedux onSubmit={ sendMessage } />
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const DialogForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newMessageBody' placeholder='Type tour message' component={Textarea} validate={[required, maxLength50]}></Field>
                <button>Send</button>
            </div>
        </Form>
    )
}

const DialogFormRedux = reduxForm({ form: 'messageAddDialogForm' })(DialogForm)



export default Dialogs;