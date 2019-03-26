import React, { useState } from 'react';
import { connect } from 'react-redux';
import PersonIcon from '@material-ui/icons/Person';

import authService from '../../services/Auth';
import actions from '../../redux/actions/index';
import RadioFieldGroup from '../fields/RadioFieldGroup';
import TextField from '../fields/TextField/TextField';
import SubmitButton from '../buttons/SubmitButton';

interface Props {
  signIn: any;
  onSuccess: () => void;
}

interface InputErrors {
  email: string | null;
  username: string | null;
  password: string | null;
}

interface InputValues {
  email: string;
  username: string;
  password: string;
}

const SignInForm: React.FC<Props> = ({ signIn, onSuccess }) => {
  const [signInWith, setSignInWith] = useState<string>('email');
  const [values, setValues] = useState<InputValues>({
    email: 'admin@mail.com',
    username: '',
    password: 'Testing123'
  });
  const [inputErrors, setInputErrors] = useState<InputErrors>({
    email: null,
    username: null,
    password: null
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
    e: React.ChangeEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const data = await authService.signIn(values, setInputErrors);
    if (data) {
      const result = await signIn(data);
      if (result) {
        onSuccess();
      }
    }
  };

  const handleToggleSignInWith = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
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
        />
      )}
      {signInWith === 'username' && (
        <TextField
          name="username"
          label={inputErrors.username || 'Username'}
          error={!!inputErrors.username}
          value={values.username}
          handleChange={handleChange}
        />
      )}
      <TextField
        name="password"
        label={inputErrors.password || 'Password'}
        error={!!inputErrors.password}
        type="password"
        value={values.password}
        handleChange={handleChange}
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
