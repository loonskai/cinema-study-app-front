import React, { useState } from 'react';
import styled from 'styled-components';

import Router from './Router';
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

interface SnackbarState {
  isOpen: boolean;
  variant: string;
  message: string;
}

interface SnackbarProviderStore {
  handleSnackbar: (message: string, variant: string) => void;
}

export const SnackbarContext = React.createContext({} as SnackbarProviderStore);

const snackbarStateDefault = {
  isOpen: false,
  variant: 'info',
  message: ''
};

const Layout: React.FC = () => {
  const [snackbar, setSnackbarInfo] = useState<SnackbarState>(
    snackbarStateDefault
  );

  const handleSnackbar = (message: string, variant: string): void => {
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
          <Router />
        </SnackbarContext.Provider>
      </ContentContainer>
    </Container>
  );
};

export default Layout;
