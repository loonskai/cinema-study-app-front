import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';

import RadioFieldGroup from './RadioFieldGroup';
import TextField from './TextField/TextField';
import SubmitButton from './../components/buttons/SubmitButton';

const SignInForm = () => {
  const [signInWith, setSignInWith] = useState('email');
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleSubmit = () => {
    console.log('sign in');
  };

  const handleToggleSignInWith = (e: any) => {
    const { value } = e.target;
    let targetToClear;
    switch (value) {
      case 'email':
        targetToClear = 'username';
        break;
      case 'username':
        targetToClear = 'email';
        break;
      default:
        break;
    }
    setSignInWith(value);
    setValues({
      ...values,
      [targetToClear as string]: ''
    });
  };

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <RadioFieldGroup
        groupTitle="Sign in using:"
        handleChange={handleToggleSignInWith}
        fields={[
          {
            value: 'email',
            label: 'Email'
          },
          {
            value: 'username',
            label: 'Username'
          }
        ]}
        value={signInWith}
      />
      {signInWith === 'email' && (
        <TextField
          name="email"
          label="Email"
          type="email"
          value={values.email}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
      )}
      {signInWith === 'username' && (
        <TextField
          name="username"
          label="Username"
          value={values.username}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
      )}
      <TextField
        name="password"
        label="Password"
        type="password"
        value={values.password}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <SubmitButton
        text="Sign in"
        icon={<PersonIcon />}
        handleClick={handleSubmit}
        disabled={
          !(
            (values.email !== '' && values.password !== '') ||
            (values.username !== '' && values.password !== '')
          )
        }
      />
    </div>
  );
};

export default SignInForm;
