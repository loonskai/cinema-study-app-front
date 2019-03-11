import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import OrderConfirmationModal from './OrderConfirmationModal';
import HeaderButton from '../buttons/HeaderButton';
import SubmitButton from '../buttons/SubmitButton';

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

const OrderController = ({ handleOrderClear, order, toggleModal }: any) => {
  const [isModalDisplayed, setModalDisplay]: [boolean, any] = useState(false);

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    setModalDisplay(true);
  };

  /*   const handleSnackbar = (message: string, variant: string) => {
    setSnackbarInfo({
      isOpen: true,
      variant,
      message
    });
  }; */

  const isEmpty = order.seatsPicked.length === 0;

  return (
    <Container onSubmit={handleOrderSubmit}>
      {isModalDisplayed && (
        <OrderConfirmationModal
          handleClose={() => {
            setModalDisplay(false);
          }}
        />
      )}
      <TotalPrice>Total price: ${order.totalPrice}</TotalPrice>
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
