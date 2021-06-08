import React from 'react';
import clas from './Myposts.module.css'
import Post from './Posts/Post';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup'
import {required, maxLengthCreator} from '../../../utils/validators/validators'
import { Element } from '../../Formcontrols/Formcontrols'

const Textarea = Element('textarea')

const Myposts = (props) => {

  let DataElements = props.Data.map( d => <Post message={d.message} like={d.likeCount} />)

  let newPostElement = React.createRef();

  let addPost = (values) => {
    props.addPost(values.newPost);
  }
  



  return (
      <div>
        <div className={clas.item}>
        My posts
      <NewMyPostForm onSubmit={addPost} />
      </div>
      { DataElements }
      </div>
    )
}

const maxLength10 = maxLengthCreator(10)


const NewMyPostForm = (props) => {

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    newPost: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  return (
    <Formik
        initialValues={{ newPost: '' }}
        onSubmit={(values) => props.onSubmit(values)}
        validationSchema={ DisplayingErrorMessagesSchema }
      >
        {({ errors, touched, handleSubmit }) => (
         <Form onSubmit={handleSubmit}>
             <div className={touched.newMessageBody && errors.newMessageBody ? clas.error : ""}>
           <Field name="newPost" type='textarea' placeholder="Post here"/>
           </div>
           {/* If this field has been touched, and it contains an error, display it
            */}
           {touched.newPost && errors.newPost && <div>{errors.newPost}</div>}
           <button type="submit" onClick={handleSubmit}>ADD POST</button>
         </Form>
      
    )
        }
        </Formik>
        )
      }

    {/* <Form onSubmit={props.handleSubmit}>
      <div>
        <Field name='Post' component={Textarea} placeholder='Type text' validate={[required, maxLength10]} placeholder='Post here please'></Field>
        <button >Add post</button>
      </div>
      </Form> */}
       
       

       
  



export default Myposts;