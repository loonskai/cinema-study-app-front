import React, { useState } from 'react';

import RadioFieldGroup from './RadioFieldGroup';
import TextField from './TextField/TextField';

const AuthForm = ({ type }: any) => {
  const [signInWith, setSignInWith] = useState('email');

  const handleToggleSignInWith = e => {
    setSignInWith(e.target.value);
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
            <TextField withoutSuggestions={true} label="Email" type="email" />
          )}
          {signInWith === 'username' && (
            <TextField withoutSuggestions={true} label="Username" />
          )}
          <TextField
            withoutSuggestions={true}
            label="Password"
            type="password"
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
