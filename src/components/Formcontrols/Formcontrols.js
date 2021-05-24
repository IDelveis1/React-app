import React from 'react';
import styles from './Formcontrol.module.css'
import {Field} from 'redux-form'



export const Element = Element => ({ input, meta, ...props }) => {
    const hasError = meta.touched && meta.error;
    return (
      <div className={ styles.formControl + " " + (hasError ? styles.error : "") }>
        <Element {...input} {...props} />
        { hasError && <span> { meta.error } </span> }
      </div>
    );
  };


  export const createField = (placeholder, name, validators, component, props={}, text='') => {
    <div>
      <Field placeholder={placeholder} name={name} validators={validators}
      component={component} {...props} /> {text}
    </div>
  }