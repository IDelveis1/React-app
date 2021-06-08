import React from 'react';
import clas from './ProfileInfo.module.css';
import {Contact} from './ProfileInfo'
import {createField, Element} from '../../Formcontrols/Formcontrols'
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup'


const Input = Element("input");
const Textarea = Element("textarea");

const DisplayingErrorMessagesSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    lookingForAJobDescription: Yup.string().required('Required'),
    aboutMe: Yup.string().required('Required'),
});

const ProfileDataForm = (props) => {
    return (
      <Formik
        onSubmit={props.onSubmit}
        initialValues={props.profile}
        validationSchema={ DisplayingErrorMessagesSchema }
      >
        {({ errors, touched, handleSubmit }) => (
         <Form onSubmit={handleSubmit}>
             <div className={clas.formControl + " " + (touched.newMessageBody && errors.newMessageBody ? clas.error : "")}>
             <button type="submit">Save</button>
               <div>
             <b>Fullname:</b><Field name="fullName" type='text' placeholder="Full name"/>
           {touched.fullName && errors.fullName && <div>{errors.fullName}</div>}
           </div>
           <div>
           <b>lookingForAJob:</b><Field name="lookingForAJob" type='checkbox' />
           </div>
           <div>
           <b>lookingForAJobDescription:</b><Field name="lookingForAJobDescription" type='textarea' placeholder="lookingForAJobDescription"/>
           {touched.lookingForAJobDescription && errors.lookingForAJobDescription && <div>{errors.lookingForAJobDescription}</div>}
           </div>
           <div>
           <b>aboutMe:</b><Field name="aboutMe" type='textarea' placeholder="aboutMe"/>
           {touched.aboutMe && errors.aboutMe && <div>{errors.aboutMe}</div>}
           </div>
           <div className={clas.contact}>
          <b>Contacts:</b> {Object.keys(props.profile.contacts).map(key => {
            return <div><Field placeholder={key} name={'contacts.' + key}   ></Field></div>
          })}
        </div>

           </div>
         </Form>
      
    )
        }
        </Formik>

    )
  }


  export default ProfileDataForm

  {/* <Form onSubmit={props.handleSubmit}> 
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
        </Form> */}