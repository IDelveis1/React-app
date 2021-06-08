import React from 'react';
import { Redirect } from 'react-router';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css';
import Message from './Messages/Messages';
import { Element } from '../Formcontrols/Formcontrols';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup'


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
                <DialogForm onSubmit={ sendMessage } />
            </div>
        </div>
    )
}

const maxLength50 = maxLengthCreator(50)

const DisplayingErrorMessagesSchema = Yup.object().shape({
    newMessageBody: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

const DialogForm = (props) => {
    return (
       /*  <Formik onSubmit={props.handleSubmit}>
            <Form>
            <div>
                <Field name='newMessageBody' placeholder='Type tour message' component={Textarea} validate={[required, maxLength50]}></Field>
                <button>Send</button>
            </div>
            </Form>
        </Formik> */
        <Formik
        initialValues={{ newMessageBody: '' }}
        onSubmit={props.onSubmit}
        validationSchema={ DisplayingErrorMessagesSchema }
      >
        {({ errors, touched }) => (
         <Form>
             <div className={s.formControl + " " + (touched.newMessageBody && errors.newMessageBody ? s.error : "")}>
           <Field name="newMessageBody" type='text' placeholder="Type here your text"/>
           </div>
           {/* If this field has been touched, and it contains an error, display it
            */}
           {touched.newMessageBody && errors.newMessageBody && <div>{errors.newMessageBody}</div>}
           <button type="submit">Submit</button>
         </Form>
      
    )
        }
        </Formik>
    )
}




export default Dialogs;