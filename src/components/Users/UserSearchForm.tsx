import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../Redux/user-reducer";

type Props = {
  onFilterChanged: (filter: FilterType) => void;
};

const UserSearchForm: React.FC<Props> = (props) => {
  const submit = (values: FilterType, { setSubmitting }: any) => {
    props.onFilterChanged(values);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik initialValues={{ term: "", friend: null }} onSubmit={submit}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Form onSubmit={handleSubmit}>
            <input
              type="text"
              name="term"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.term}
            />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Followed</option>
              <option value="false">Unfollowed</option>
            </Field>
            {/*   {errors.email && touched.email && errors.email} */}
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserSearchForm;
