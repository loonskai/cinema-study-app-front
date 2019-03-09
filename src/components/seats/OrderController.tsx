import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import actions from '../../redux/actions';
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

const OrderController = ({
  handleOrderClear,
  order,
  setOrderInfo,
  toggleOrderConfirmationModal
}: any) => {
  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    setOrderInfo(order);
    toggleOrderConfirmationModal(true);
  };

  const isEmpty = order.seatsPicked.length === 0;

  return (
    <Container onSubmit={handleOrderSubmit}>
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

export default connect(
  null,
  actions
)(OrderController);
