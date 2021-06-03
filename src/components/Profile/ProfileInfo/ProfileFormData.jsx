import React from 'react';
import clas from './ProfileInfo.module.css';
import {Contact} from './ProfileInfo'
import { Form, Field, reduxForm } from 'redux-form'
import {createField, Element} from '../../Formcontrols/Formcontrols'

const Input = Element("input");
const Textarea = Element("textarea");

const ProfileDataForm = (props) => {
    return (
      <Form onSubmit={props.handleSubmit}> 
          <div><button>Save</button></div>
        <div>
          <b>Fullname:</b> <Field placeholder='Fullname' name='fullName' component={Input}></Field>    
        </div>
        <div>
          <b>Looking for a job:</b> <Field placeholder='LookingForAJob' name='lookingForAJob' component={Input} type='checkbox'></Field>   
        </div>
          <div>
            <b>My professional skills:</b> <Field placeholder='LookingForAJobDescription' name='lookingForAJobDescription' component={Textarea} ></Field>
          </div>
        <div>
          <b>About me:</b> <Field placeholder='AboutMe' name='aboutMe' component={Textarea} ></Field>
        </div>
        <div className={clas.contact}>
          <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
            return <Field placeholder={key} name={'contacts.' + key}  component={Input} ></Field>
          })}
        </div>
      </Form>
    )
  }

  const ProfileDataFormRedux = reduxForm({form: 'profile-form'})(ProfileDataForm)

  export default ProfileDataFormRedux