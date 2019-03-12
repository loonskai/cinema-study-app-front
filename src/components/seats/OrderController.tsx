import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import OrderConfirmationModal from './OrderConfirmationModal';
import HeaderButton from '../buttons/HeaderButton';
import SubmitButton from '../buttons/SubmitButton';
import calculateTotalPrice from '../../helpers/calculateTotalPrice';

const Container = styled.form`
  padding: 1rem 0;
`;

const TotalPrice = styled.div`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const TicketsAmount = styled.div`
  margin-bottom: 1rem;
`;

const OrderController = ({ handleOrderClear, order, handleSnackbar }: any) => {
  const [isModalDisplayed, setModalDisplay]: [boolean, any] = useState(false);

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    setModalDisplay(true);
  };

  const isEmpty = !order.seatsPicked.length;

  return (
    <Container onSubmit={handleOrderSubmit}>
      {isModalDisplayed && (
        <OrderConfirmationModal
          handleSnackbar={handleSnackbar}
          handleClose={() => {
            setModalDisplay(false);
          }}
        />
      )}
      <TotalPrice>Total price: ${calculateTotalPrice(order)}</TotalPrice>
      <TicketsAmount>Tickets amount: {order.seatsPicked.length}</TicketsAmount>
      <SubmitButton
        text="Buy tickets"
        icon={<LocalGroceryStoreIcon />}
        disabled={isEmpty}
      />
      <HeaderButton
        handleClick={handleOrderClear}
        disabled={isEmpty}
        text="Clear order"
        icon={<DeleteIcon />}
      />
    </Container>
  );
};

export default OrderController;
