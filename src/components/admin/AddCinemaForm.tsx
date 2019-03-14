import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';

const AddCinemaForm = () => {
  const [values, setValues] = useState({
    city: '',
    cinema: ''
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (values.city && values.cinema) {
      setButtonDisabled(false);
    }
  }, [values]);

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('submit add cinema', values);
  };

  return (
    <AdminFormContainer title="Add Cinema">
      <form onSubmit={handleSubmit}>
        <TextField
          name="city"
          label="City"
          value={values.city}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
        <TextField
          name="cinema"
          label="Cinema Name"
          value={values.cinema}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
        <SubmitButton
          text="Add Cinema"
          icon={<AddIcon />}
          disabled={buttonDisabled}
        />
      </form>
    </AdminFormContainer>
  );
};

export default AddCinemaForm;
