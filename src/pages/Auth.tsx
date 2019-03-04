import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import PageTitle from './../components/PageTitle';
import SignUpForm from './../components/SignUpForm';
import SignInForm from './../components/SignInForm';
import {
  whiteColor,
  containerGreyColor,
  greyColor,
  mainDarkColor
} from './../constants';

const Container = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 1rem auto;
  border-radius: 5px;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  overflow: hidden;
`;

const FormTabs = styled.div`
  width: 100%;
  display: flex;
`;

const FormContainer = styled.div`
  padding: 1rem;
`;

const StyledTab = styled.div<any>`
  background: ${({ isActive }) => (isActive ? whiteColor : containerGreyColor)};
  color: ${({ isActive }) => (isActive ? mainDarkColor : greyColor)};
  cursor: ${({ isActive }) => !isActive && 'pointer'};
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Auth = ({ isAuth }: any) => {
  const [tabSelected, setTab] = useState('signup');

  const toggleTab = (value: string) => () => {
    setTab(value);
  };

  const getForm = () => {
    switch (tabSelected) {
      case 'signup':
        return <SignUpForm />;
      case 'signin':
        return <SignInForm />;
      default:
        return null;
    }
  };

  if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <PageTitle text="Join us" />
      <Container>
        <FormTabs>
          <StyledTab
            isActive={tabSelected === 'signup'}
            onClick={toggleTab('signup')}
          >
            Sign Up
          </StyledTab>
          <StyledTab
            isActive={tabSelected === 'signin'}
            onClick={toggleTab('signin')}
          >
            Sign In
          </StyledTab>
        </FormTabs>
        <FormContainer>{getForm()}</FormContainer>
      </Container>
    </React.Fragment>
  );
};

export default connect(({ auth }: any) => ({ isAuth: auth.isAuth }))(Auth);
