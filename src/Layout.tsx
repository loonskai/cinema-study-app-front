import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Root from './Root';
import Header from './components/Header';
import OrderConfirmationModal from './components/seats/OrderConfirmationModal';
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

const Layout = ({ orderModalDisplayed }: any) => (
  <Container>
    {orderModalDisplayed && <OrderConfirmationModal />}
    <Header />
    <ContentContainer>
      <Root />
    </ContentContainer>
  </Container>
);

const mapStateToProps = ({ modals }: any) => ({
  orderModalDisplayed: modals.orderModalDisplayed
});

const connectedLayout: any = connect(mapStateToProps)(Layout);

export default withRouter(connectedLayout);
