import React, { useState, useEffect } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';
import { users } from '../../mocks';

const SignUpForm = ({ onSuccess }: any) => {
  const [values, setValues] = useState({
    email: 'register@mail.com',
    username: 'Johnnn',
    password: '12345678',
    confirmPassword: '1234567'
  });

  const [inputErrors, setInputErrors]: [any, any] = useState({
    email: null,
    username: null,
    password: null,
    confirmPassword: null
  });

  useEffect(() => {});

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    /*     const formInputs = Array.from(e.target.elements).filter(
      (el: any) => el.tagName === 'INPUT'
    ); */
    const { email, username, password, confirmPassword } = values;
    const user = users.find(
      user => user.email === email || user.username === username
    );
    if (user && user.email === email) {
      setInputErrors({ ...inputErrors, email: 'Email already in use' });
    } else if (user && user.username === username) {
      setInputErrors({ ...inputErrors, username: 'Username already in use' });
    } else if (password.length < 8) {
      setInputErrors({
        ...inputErrors,
        password: 'Password should have min 8 characters length'
      });
    } else if (password !== confirmPassword) {
      setInputErrors({
        ...inputErrors,
        confirmPassword: 'Passwords do not match'
      });
    } else {
      console.log('succesfully signed up');
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label={inputErrors.email || 'Email'}
        error={!!inputErrors.email}
        type="email"
        value={values.email}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="username"
        label={inputErrors.username || 'Username'}
        error={!!inputErrors.username}
        value={values.username}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="password"
        label={inputErrors.password || 'Password'}
        error={!!inputErrors.password}
        type="password"
        value={values.password}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="confirmPassword"
        label={inputErrors.confirmPassword || 'Confirm Password'}
        error={!!inputErrors.confirmPassword}
        type="password"
        value={values.confirmPassword}
        handleChange={handleChange}
        withoutSuggestions={true}
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
  );
};

export default SignUpForm;
