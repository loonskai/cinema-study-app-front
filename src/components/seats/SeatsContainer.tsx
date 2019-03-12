import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions';
import SeatsMenu from './SeatsMenu';
import OrderController from './OrderController';
import SeatsScheme from './SeatsScheme';
import { SnackbarContext } from '../../Layout';

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
  setOrderInfo
}: {
  sessionId: number;
  order: any;
  setOrderInfo: any;
}) => {
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
      hallId: order.hallId,
      seatsPicked: order.seatsPicked,
      bonuses: order.bonuses
    });
  }, []);

  const changeHall = (value: any) => {
    setOrderInfo({
      sessionId: order.sessionId,
      hallId: value,
      seatsPicked: [],
      bonuses: null
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
    const pickedBefore = seatsPicked.some(
      (seat: any) => seat.row === pickedRow && seat.seat === pickedSeat
    );
    const newSeatsPicked = pickedBefore
      ? seatsPicked.filter(
          (item: any) => !(item.row === pickedRow && item.seat === pickedSeat)
        )
      : seatsPicked.concat({
          row: pickedRow,
          seat: pickedSeat,
          price
        });
    setOrderInfo({
      sessionId: order.sessionId,
      hallId: order.hallId,
      seatsPicked: newSeatsPicked,
      bonuses: order.bonuses
    });
  };

  const handleOrderClear = () => {
    setOrderInfo({
      sessionId,
      hallId: order.hallId,
      seatsPicked: [],
      bonuses: null
    });
  };

  return (
    <Container>
      <StyledTitle>Seats</StyledTitle>
      <SeatsMenu
        onHallChange={changeHall}
        onOptionsChange={changeOptions}
        options={options}
        hallSelected={order.hallId || ''}
      />
      {order.hallId && (
        <Fragment>
          <SnackbarContext.Consumer>
            {({ handleSnackbar }: any) => (
              <OrderController
                handleOrderClear={handleOrderClear}
                order={order}
                handleSnackbar={handleSnackbar}
              />
            )}
          </SnackbarContext.Consumer>

          <SeatsScheme
            order={order}
            options={options}
            handleSeatPick={handleSeatPick}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default connect(
  ({ order }: any) => ({
    order
  }),
  actions
)(SeatsContainer);
