/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Formik, Field, Form } from 'formik';
import phoneSchema from '../phoneSchema';

const AddPhone = () => (
  <div>
    <h1>Add a Phone Number</h1>
    <Formik
      initialValues={{
        number: '',
        country: '1',
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={phoneSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor="number">
            Phone Number (US/+1 country code only)
            <Field
              id="number"
              name="number"
              placeholder="415-555-7865"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            />
            {errors.number && touched.number ? (
              <div className="helper-text error">{errors.number}</div>
            ) : null}
          </label>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

AddPhone.propTypes = {};

export default withAuthenticator(AddPhone);
