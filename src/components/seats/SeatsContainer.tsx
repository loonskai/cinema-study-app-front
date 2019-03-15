import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions';
import SeatsMenu from './SeatsMenu';
import OrderConfirmationModal from './OrderConfirmationModal';
import OrderController from './OrderController';
import OrderTimer from './OrderTimer';
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

const OrderStateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media screen and (max-width: 375px) {
    justify-content: center;
  }
`;

const SeatsContainer = ({
  sessionId,
  hallId,
  order,
  setOrderInfo
}: {
  sessionId: number;
  hallId: number;
  order: any;
  setOrderInfo: any;
}) => {
  const [categoryCheckboxes, setCategoryCheckboxes]: [any, any] = useState({
    vip: {
      label: 'VIP',
      value: false
    },
    basic: {
      label: 'Basic',
      value: false
    }
  });
  const [isModalDisplayed, setModalDisplay]: [boolean, any] = useState(false);
  const [timerStarted, setTimerStarted]: [boolean, any] = useState(false);

  // We assing it to the function from OrderTimer child component and run it on the first seat pick
  let startTimerFunc = () => {};

  useEffect(() => {
    setOrderInfo({
      sessionId,
      hallId: order.hallId,
      seatsPicked: order.seatsPicked,
      bonuses: order.bonuses
    });
  }, []);

  const changeCategoryCheckboxes = (key: any) => {
    const newOptions = Object.assign({}, categoryCheckboxes, {
      [key]: {
        label: categoryCheckboxes[key].label,
        value: !categoryCheckboxes[key].value
      }
    });
    setCategoryCheckboxes(newOptions);
  };

  const handleSeatPick = (e: any) => {
    if (!timerStarted && startTimerFunc) {
      setTimerStarted(true);
      startTimerFunc();
    }
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
        onOptionsChange={changeCategoryCheckboxes}
        options={categoryCheckboxes}
      />
      <SnackbarContext.Consumer>
        {({ handleSnackbar }: any) => (
          <OrderStateContainer>
            <OrderController
              handleOrderClear={handleOrderClear}
              handleOrderSubmit={() => setModalDisplay(true)}
              order={order}
              handleSnackbar={handleSnackbar}
            />
            <OrderTimer
              startTimer={(func: any) => (startTimerFunc = func)}
              handleExpire={() => {
                setModalDisplay(false);
                handleOrderClear();
                handleSnackbar('Reservation time expired', 'warning');
              }}
              handleSnackbar={handleSnackbar}
            />
            {isModalDisplayed && (
              <OrderConfirmationModal
                handleSnackbar={handleSnackbar}
                handleClose={() => {
                  setModalDisplay(false);
                }}
              />
            )}
          </OrderStateContainer>
        )}
      </SnackbarContext.Consumer>
      <SeatsScheme
        hallId={hallId}
        order={order}
        options={categoryCheckboxes}
        handleSeatPick={handleSeatPick}
      />
    </Container>
  );
};

export default connect(
  ({ order }: any) => ({
    order
  }),
  actions
)(SeatsContainer);
