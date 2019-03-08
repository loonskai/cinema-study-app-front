import React from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

import HeaderButton from '../buttons/HeaderButton';

const Container = styled.div`
  padding: 1rem 0;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const OrderController = ({ handleOrderClear, totalPrice, order }: any) => {
  return (
    <Container>
      <TotalPrice>Total price: ${totalPrice}</TotalPrice>
      <HeaderButton
        handleClick={handleOrderClear}
        disabled={order.seatsPicked.length === 0}
        text="Reset"
        icon={<DeleteIcon />}
      />
    </Container>
  );
};

export default OrderController;
