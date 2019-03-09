import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions';
import api from '../../ApiService';
import SeatsMenu from './SeatsMenu';
import OrderController from './OrderController';
import SeatsScheme from './SeatsScheme';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  @media screen and (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const StyledTitle = styled.span`
  font-weight: 700;
  font-size: 1.25rem;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

const SeatsContainer = ({
  sessionId,
  order,
  setOrderInfo,
  clearOrderInfo,
  toggleOrderConfirmationModal
}: {
  sessionId: number;
  order: any;
  setOrderInfo: any;
  clearOrderInfo: any;
  toggleOrderConfirmationModal: any;
}) => {
  const [hall, setHall]: [any, any] = useState('');
  const [options, setOptions]: [any, any] = useState({
    vip: {
      label: 'VIP',
      value: false
    },
    basic: {
      label: 'Basic',
      value: false
    }
  });

  useEffect(() => {
    setOrderInfo({
      sessionId,
      seatsPicked: order.seatsPicked,
      totalPrice: order.totalPrice
    });
    api.reserve({
      sessionId,
      hall,
      seatsPicked: order.seatsPicked
    });
  }, []);

  const changeHall = (value: any) => {
    setHall(value);
    setOrderInfo({
      sessionId: order.sessionId,
      seatsPicked: [],
      totalPrice: 0
    });
  };

  const changeOptions = (key: any) => {
    const newOptions = Object.assign({}, options, {
      [key]: {
        label: options[key].label,
        value: !options[key].value
      }
    });
    setOptions(newOptions);
  };

  const handleSeatPick = (e: any) => {
    const { seatsPicked } = order;
    const pickedRow = +e.target.dataset.row;
    const pickedSeat = +e.target.dataset.seat;
    const free = e.target.dataset.free === 'true';
    const price = +e.target.dataset.price;
    if (!pickedRow || !pickedSeat || !free) return;
    let newSeatsPicked;
    const pickedBefore = seatsPicked.some(
      (seat: any) => seat.row === pickedRow && seat.seat === pickedSeat
    );
    if (!pickedBefore) {
      newSeatsPicked = seatsPicked.concat({
        row: pickedRow,
        seat: pickedSeat,
        price
      });
    } else {
      newSeatsPicked = seatsPicked.filter(
        (item: any) => !(item.row === pickedRow && item.seat === pickedSeat)
      );
    }
    const newTotalPrice = newSeatsPicked.reduce(
      (sum: number, seat: any) => seat.price + sum,
      0
    );
    setOrderInfo({
      sessionId: order.sessionId,
      seatsPicked: newSeatsPicked,
      totalPrice: newTotalPrice
    });
  };

  return (
    <Container>
      <StyledTitle>Seats</StyledTitle>
      <SeatsMenu
        onHallChange={changeHall}
        onOptionsChange={changeOptions}
        options={options}
        hallSelected={hall}
      />
      {hall && (
        <Fragment>
          <OrderController
            handleOrderClear={() => clearOrderInfo()}
            order={order}
            toggleModal={(value: boolean) =>
              toggleOrderConfirmationModal(value)
            }
          />
          <SeatsScheme
            seatsPicked={order.seatsPicked}
            options={options}
            hall={hall}
            handleSeatPick={handleSeatPick}
            totalPrice={order.totalPrice}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default connect(
  ({ orders }: any) => ({
    order: orders.data
  }),
  actions
)(SeatsContainer);
