import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { whiteColor, greyColor } from '../../constants';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  z-index: 500;
`;

const ModalWindow = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  background: ${whiteColor};
`;

const OrderConfirmationModal = ({ order }: any) => {
  const { sessionId, seatsPicked, totalPrice } = order;
  return (
    <Container>
      <ModalWindow>
        <div>Session id: {sessionId}</div>
        <div>Total price: ${totalPrice}</div>
        <div>Tickets amount: {seatsPicked.length}</div>
      </ModalWindow>
    </Container>
  );
};

export default connect(({ orders }: { orders: any }) => ({
  order: orders.data
}))(OrderConfirmationModal);
