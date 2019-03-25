import React, { Fragment, useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import authService from '../../services/Auth';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';

const SignUpForm = ({ onSuccess }: any) => {
  const [values, setValues] = useState({
    email: 'client@mail.com',
    username: 'client',
    password: 'Testing123',
    confirmPassword: 'Testing123'
  });
  const [inputErrors, setInputErrors]: [any, any] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: null
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const successMessage = await authService.signUp(values, setInputErrors);
    if (successMessage) {
      onSuccess();
    }
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label={inputErrors.email || 'Email'}
          error={!!inputErrors.email}
          type="email"
          value={values.email}
          handleChange={handleChange}
        />
        <TextField
          name="username"
          label={inputErrors.username || 'Username'}
          error={!!inputErrors.username}
          value={values.username}
          handleChange={handleChange}
        />
        <TextField
          name="password"
          label={inputErrors.password || 'Password'}
          error={!!inputErrors.password}
          type="password"
          value={values.password}
          handleChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          label={inputErrors.confirmPassword || 'Confirm Password'}
          error={!!inputErrors.confirmPassword}
          type="password"
          value={values.confirmPassword}
          handleChange={handleChange}
        />
        <SubmitButton
          text="Sign up"
          icon={<PersonAddIcon />}
          disabled={
            values.email === '' ||
            values.username === '' ||
            values.password === '' ||
            values.confirmPassword === ''
          }
        />
      </form>
    </Fragment>
  );
};

export default SignUpForm;
