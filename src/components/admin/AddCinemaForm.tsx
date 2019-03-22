import React, { useState, useEffect } from 'react';
import AddIcon from '@material-ui/icons/Add';

import api from '../../ApiService';
import AdminFormContainer from './AdminFormContainer';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';

const AddCinemaForm = ({ handleSnackbar }: any) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const result = await api.createCinema(values);
    if (result) {
      setValues({
        city: '',
        cinema: ''
      });
      setButtonDisabled(true);
      handleSnackbar('New cinema added', 'success');
    }
  };

  return (
    <AdminFormContainer title="Add Cinema">
      <form onSubmit={handleSubmit}>
        <TextField
          name="city"
          label="City"
          value={values.city}
          handleChange={handleChange}
        />
        <TextField
          name="cinema"
          label="Cinema Name"
          value={values.cinema}
          handleChange={handleChange}
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
