import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Root from './Root';
import Header from './components/Header';
import OrderConfirmationModal from './components/seats/OrderConfirmationModal';
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

const Layout = ({ orderModalDisplayed }: any) => {
  const snackbarStateDefault = {
    isOpen: false,
    variant: '',
    message: ''
  };
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
      {orderModalDisplayed && (
        <OrderConfirmationModal handleSnackbar={handleSnackbar} />
      )}
      <Header />
      <ContentContainer>
        <Root />
      </ContentContainer>
      <PopUpSnackbar
        isOpen={snackbar.isOpen}
        variant={snackbar.variant}
        message={snackbar.message}
        handleClose={() => setSnackbarInfo({ ...snackbar, isOpen: false })}
      />
    </Container>
  );
};

const mapStateToProps = ({ modals }: any) => ({
  orderModalDisplayed: modals.orderModalDisplayed
});

const connectedLayout: any = connect(mapStateToProps)(Layout);

export default withRouter(connectedLayout);
