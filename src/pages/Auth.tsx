import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';

import PageTitle from '../components/PageTitle';
import SignUpForm from '../components/forms/SignUpForm';
import SignInForm from '../components/forms/SignInForm';
import { SnackbarContext } from '../Layout';

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
  border-radius: 0.3125rem;
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

const snackbarStateDefault = {
  isOpen: false,
  variant: 'info',
  message: ''
};

const Auth = ({ isAuth, location, history }: any) => {
  const redirectTo =
    (location &&
      location.state &&
      location.state.from &&
      location.state.from.pathname) ||
    '/';

  if (isAuth) {
    return <Redirect to={redirectTo} />;
  }

  const [tabSelected, setTab] = useState('signup');

  const toggleTab = (value: string) => () => {
    setTab(value);
  };

  const getForm = (handleSnackbar: any) => {
    switch (tabSelected) {
      case 'signup':
        return (
          <SignUpForm
            onSuccess={() => {
              toggleTab('signin')();
              handleSnackbar('Succesfull signed up', 'success');
            }}
          />
        );
      case 'signin':
        return (
          <SignInForm
            onSuccess={() => {
              history.push(redirectTo);
              handleSnackbar('Succesfull signed in', 'success');
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SnackbarContext.Consumer>
      {({ handleSnackbar }: any) => (
        <Fragment>
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
            <FormContainer>{getForm(handleSnackbar)}</FormContainer>
          </Container>
        </Fragment>
      )}
    </SnackbarContext.Consumer>
  );
};

export default connect(({ auth }: any) => ({
  isAuth: auth.isAuth
}))(Auth);
