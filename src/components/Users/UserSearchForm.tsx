import { Field, Form, Formik } from "formik";
import React from "react";
import { FileWatcherEventKind } from "typescript";
import { FilterType } from "../Redux/user-reducer";

type Props = {
  onFilterChanged: (filter: FilterType) => void;
  filter: FilterType;
};

type ValuesType = {
  term: string;
  friend: string;
};

const UserSearchForm: React.FC<Props> = (props) => {
  const submit = (values: ValuesType, { setSubmitting }: any) => {
    const filter = {
      term: values.term,
      friend:
        values.friend === null ? null : values.friend === "true" ? true : false,
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{
          term: props.filter.term,
          friend: String(props.filter.friend) as string,
        }}
        onSubmit={submit}
      >
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
