import React from 'react';
import clas from './Myposts.module.css'
import Post from './Posts/Post';
import {Form, Field, reduxForm} from 'redux-form';
import {required, maxLengthCreator} from '../../../utils/validators/validators'
import { Element } from '../../Formcontrols/Formcontrols'

const Textarea = Element('textarea')

const Myposts = (props) => {

  let DataElements = props.Data.map( d => <Post message={d.message} like={d.likeCount} />)

  let newPostElement = React.createRef();

  let addPost = (values) => {
    props.addPost(values.Post);
  }
  



  return (
      <div>
        <div className={clas.item}>
        My posts
      <Forma onSubmit={addPost} />
      </div>
      { DataElements }
      </div>
    )
}

const maxLength10 = maxLengthCreator(10)


const newMyPostForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <div>
        <Field name='Post' component={Textarea} placeholder='Type text' validate={[required, maxLength10]} placeholder='Post here please'></Field>
        <button >Add post</button>
      </div>
      </Form>
  )
}

const Forma = reduxForm({ form: 'myPostsForm' })(newMyPostForm)


export default Myposts;