import React, { useState } from 'react';
import PersonIcon from '@material-ui/icons/Person';

import RadioFieldGroup from './RadioFieldGroup';
import TextField from './TextField/TextField';
import SubmitButton from './../components/buttons/SubmitButton';

const SignInForm = () => {
  const [signInWith, setSignInWith] = useState('email');

  const handleSubmit = () => {
    console.log('sign in');
  };

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
        disabled={true}
      />
    </div>
  );
};

export default SignInForm;
