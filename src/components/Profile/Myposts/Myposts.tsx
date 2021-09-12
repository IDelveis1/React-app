import React from "react";
import clas from "./Myposts.module.css";
import Post from "./Posts/Post";
import { Formik, Field, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { DataType } from "../../Redux/profile-reducer";

type PropsType = {
  Data: Array<DataType>;
  addPost: (newPost: string) => void;
};

const Myposts: React.FC<PropsType> = (props) => {
  let DataElements = props.Data.map((d) => (
    <Post message={d.message} like={d.likeCount} />
  ));

  let addPost = (values: { newPost: string }) => {
    props.addPost(values.newPost);
  };

  return (
    <div>
      <div className={clas.item}>
        My posts
        <NewMyPostForm onSubmit={addPost} />
      </div>
      {DataElements}
    </div>
  );
};

type Props = {
  onSubmit: (values: { newPost: string }) => void;

  //handleSubmit: (event: React.FormEvent<HTMLInputElement>) => void;
};

const NewMyPostForm: React.FC<Props> = (props) => {
  const DisplayingErrorMessagesSchema = Yup.object().shape({
    newPost: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  return (
    <Formik
      initialValues={{ newPost: "" }}
      onSubmit={(values) => props.onSubmit(values)}
      validationSchema={DisplayingErrorMessagesSchema}
    >
      {({ errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className={touched.newPost && errors.newPost ? clas.error : ""}>
            <Field name="newPost" type="textarea" placeholder="Post here" />
          </div>
          {touched.newPost && errors.newPost && <div>{errors.newPost}</div>}
          <button type="submit">ADD POST</button>
        </Form>
      )}
    </Formik>
  );
};

export default Myposts;
