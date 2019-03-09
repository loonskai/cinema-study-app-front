import React from 'react';
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
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  background: ${whiteColor};
`;

const OrderConfirmationModal = () => {
  return (
    <Container>
      <ModalWindow>Modal order</ModalWindow>
    </Container>
  );
};

export default OrderConfirmationModal;
