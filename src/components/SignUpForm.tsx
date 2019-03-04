import React, { useState } from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import TextField from './TextField/TextField';
import SubmitButton from './../components/buttons/SubmitButton';
import { users } from './../mocks';

const SignUpForm = () => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    const { email, username, password, confirmPassword } = values;
    const user = users.find(
      user => user.email === email || user.username === username
    );
    if (user && user.email === email) {
      console.error('email already in use');
    } else if (user && user.username === username) {
      console.error('username already in use');
    } else if (password.length < 8) {
      console.error('password should have min 8 characters length');
    } else if (password !== confirmPassword) {
      console.error('passwords do not match');
    } else {
      console.log('succesfully signed up');
    }
  };

  return (
    <div>
      <TextField
        name="email"
        label="Email"
        type="email"
        value={values.email}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="username"
        label="Username"
        value={values.username}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={values.password}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <TextField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        value={values.confirmPassword}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <SubmitButton
        text="Sign up"
        icon={<PersonAddIcon />}
        handleClick={handleSubmit}
        disabled={
          values.email === '' ||
          values.username === '' ||
          values.password === '' ||
          values.confirmPassword === ''
        }
      />
    </div>
  );
};

export default SignUpForm;
