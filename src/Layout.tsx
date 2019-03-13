import React, { createContext, useState } from 'react';
import styled from 'styled-components';

import Root from './Root';
import Header from './components/Header';
import PopUpSnackbar from './components/PopUpSnackbar';
import { whiteColor, containerGreyColor } from './constants';

const Container = styled.div`
  position: relative;
  height: inherit;
  font-family: 'Bitter', serif;
  background: ${containerGreyColor};
`;

const ContentContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1.25rem;
  margin: 0 auto;
  margin-top: 3rem;
  background: ${whiteColor};
  @media screen and (min-width: 600px) {
    padding-top: 3rem;
  }
  @media screen and (min-width: 1378px) {
    max-width: 1200px;
  }
`;

export const SnackbarContext = React.createContext({});

const snackbarStateDefault = {
  isOpen: false,
  variant: 'info',
  message: ''
};

const Layout = () => {
  const [snackbar, setSnackbarInfo] = useState(snackbarStateDefault);

  const handleSnackbar = (message: string, variant: string) => {
    setSnackbarInfo({
      isOpen: true,
      variant,
      message
    });
  };

  return (
    <Container>
      {
        <PopUpSnackbar
          isOpen={snackbar.isOpen}
          variant={snackbar.variant}
          message={snackbar.message}
          handleClose={() => setSnackbarInfo({ ...snackbar, isOpen: false })}
        />
      }
      <Header />
      <ContentContainer>
        <SnackbarContext.Provider value={{ handleSnackbar }}>
          <Root />
        </SnackbarContext.Provider>
      </ContentContainer>
    </Container>
  );
};

export default Layout;
