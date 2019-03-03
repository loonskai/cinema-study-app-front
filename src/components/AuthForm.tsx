import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';

import RadioFieldGroup from './RadioFieldGroup';
import TextField from './TextField/TextField';
import SubmitButton from './../components/buttons/SubmitButton';

const AuthForm = ({ type, handleSubmit, buttonDisabled }: any) => {
  const [signInWith, setSignInWith] = useState('email');

  const handleToggleSignInWith = (e: any) => {
    setSignInWith(e.target.value);
  };

  const handleEmailChange = (e: any) => {
    console.log(e.target.value);
  };

  const handleUsernameChange = (e: any) => {
    console.log(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    console.log(e.target.value);
  };

  switch (type) {
    case 'signin':
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
              withoutSuggestions={true}
              label="Email"
              type="email"
              handleChange={handleEmailChange}
            />
          )}
          {signInWith === 'username' && (
            <TextField
              withoutSuggestions={true}
              label="Username"
              handleChange={handleUsernameChange}
            />
          )}
          <TextField
            withoutSuggestions={true}
            label="Password"
            type="password"
            handleChange={handlePasswordChange}
          />
          <SubmitButton
            text="Sign in"
            icon={<PersonIcon />}
            handleClick={handleSubmit}
            disabled={buttonDisabled}
          />
        </div>
      );
    case 'signup':
      return <div>signup</div>;
    default:
      return null;
  }
};

export default AuthForm;
