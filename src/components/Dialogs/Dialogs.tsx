import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Messages/Messages";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { DialogType, MessageType } from "../Redux/dialog-reducer";

type PropsType = {
  DataForDialog: Array<DialogType>;
  DataForMessage: Array<MessageType>;
  addMessage: (messageText: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
  let sendMessage = (values: { newMessageBody: string }) => {
    props.addMessage(values.newMessageBody);
  };

  let DialogElements = props.DataForDialog.map((d) => (
    <DialogItem name={d.name} id={d.id} />
  ));
  let MessageElements = props.DataForMessage.map((m) => (
    <Message message={m.message} />
  ));

  return (
    <div className={s.DialogsContent}>
      <div className={s.Dialogs}>{DialogElements}</div>
      <div className={s.Message}>
        {MessageElements}
        <DialogForm onSubmit={sendMessage} />
      </div>
    </div>
  );
};

const DisplayingErrorMessagesSchema = Yup.object().shape({
  newMessageBody: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const DialogForm: React.FC<{
  onSubmit: (values: { newMessageBody: string }) => void;
}> = (props) => {
  return (
    <Formik
      initialValues={{ newMessageBody: "" }}
      onSubmit={props.onSubmit}
      validationSchema={DisplayingErrorMessagesSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <div
            className={
              s.formControl +
              " " +
              (touched.newMessageBody && errors.newMessageBody ? s.error : "")
            }
          >
            <Field
              name="newMessageBody"
              type="text"
              placeholder="Type here your text"
            />
          </div>
          {touched.newMessageBody && errors.newMessageBody && (
            <div>{errors.newMessageBody}</div>
          )}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default Dialogs;
