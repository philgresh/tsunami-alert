/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { phoneSchema, onSubmit, confirmPhone } from '../phoneUtils';

window.confirmPhone = confirmPhone;

const AddPhone = () => {
  const formik = useFormik({
    initialValues: {
      number: '',
    },
    validationSchema: phoneSchema,
    onSubmit,
  });
  return (
    <div>
      <h1>Add a Phone Number</h1>
      <form onSubmit={formik.handleSubmit}>
        <InputMask
          mask="(999) 999-9999"
          value={formik.values.number}
          disabled={false}
          maskChar=" "
          onChange={formik.handleChange}
        >
          {(inputProps) => (
            <TextField
              fullWidth
              id="number"
              name="number"
              label="Phone number"
              type="text"
              {...inputProps}
              error={formik.touched.number && Boolean(formik.errors.number)}
              helperText={formik.touched.number && formik.errors.number}
            />
          )}
        </InputMask>
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

AddPhone.propTypes = {};

export default AddPhone;
