import React, { useState } from 'react';
import { connect } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';

import actions from '../../redux/actions/index';
import RadioFieldGroup from '../fields/RadioFieldGroup';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';
import { users } from '../../mocks';

const SignInForm = ({ signIn, onSuccess }: any) => {
  const [signInWith, setSignInWith] = useState('email');
  const [values, setValues] = useState({
    email: 'client@mail.com',
    username: '',
    password: 'Password123'
  });
  const [inputErrors, setInputErrors]: [any, any] = useState({
    email: null,
    username: null,
    password: null
  });

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
    setInputErrors({
      ...inputErrors,
      [e.target.name]: null
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, username, password } = values;
    const user = users.find(
      user => user.email === email || user.username === username
    );
    if (!user) {
      if (email) {
        setInputErrors({ ...inputErrors, email: 'User not found' });
      }
      if (username) {
        setInputErrors({ ...inputErrors, username: 'User not found' });
      }
    } else if (user.password !== password) {
      setInputErrors({
        ...inputErrors,
        password: 'Wrong password'
      });
    } else {
      const result = await signIn(values);
      if (result) {
        console.log('succesfully signed in');
        onSuccess();
      }
    }
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
    setInputErrors({
      email: null,
      username: null,
      password: null
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
          label={inputErrors.email || 'Email'}
          error={!!inputErrors.email}
          type="email"
          value={values.email}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
      )}
      {signInWith === 'username' && (
        <TextField
          name="username"
          label={inputErrors.username || 'Username'}
          error={!!inputErrors.username}
          value={values.username}
          handleChange={handleChange}
          withoutSuggestions={true}
        />
      )}
      <TextField
        name="password"
        label={inputErrors.password || 'Password'}
        error={!!inputErrors.password}
        type="password"
        value={values.password}
        handleChange={handleChange}
        withoutSuggestions={true}
      />
      <SubmitButton
        text="Sign in"
        icon={<PersonIcon />}
        disabled={
          !(
            (values.email && values.password) ||
            (values.username && values.password)
          )
        }
      />
    </form>
  );
};

export default connect(
  null,
  actions
)(SignInForm);
