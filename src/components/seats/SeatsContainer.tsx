import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions';
import { loadCategoryCheckboxesByHall } from '../../helpers/loadSelectOptions';
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
  const [rowCategories, setRowCategories] = useState<any>(null);
  const [isModalDisplayed, setModalDisplay] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [orderTimeExpired, setOrderTimeExpired] = useState<boolean>(false);

  useEffect(() => {
    setOrderInfo({
      sessionId,
      hallId: order.hallId,
      seatsPicked: order.seatsPicked,
      bonuses: order.bonuses
    });
    if (!rowCategories) {
      loadCategoryCheckboxesByHall(hallId, setRowCategories);
    }
  }, []);

  const changeRowCategory = (key: any) => {
    const newCategories = Object.assign({}, rowCategories, {
      [key]: {
        label: rowCategories[key].label,
        value: !rowCategories[key].value
      }
    });
    setRowCategories(newCategories);
  };

  const handleSeatPick = (
    e: React.BaseSyntheticEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    const { seatsPicked } = order;
    const pickedRow = +e.target.dataset.row;
    const pickedSeat = +e.target.dataset.seat;
    const free = e.target.dataset.free === 'true';
    const price = +e.target.dataset.price;
    if (!pickedRow || !pickedSeat || !free) {
      return;
    }

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
      {rowCategories && (
        <SeatsMenu
          obChangeRowCategory={changeRowCategory}
          rowCategories={rowCategories}
        />
      )}
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
              timerStarted={timerStarted}
              setTimerOff={() => setTimerStarted(false)}
              handleExpire={(showSnackbar: boolean) => {
                setModalDisplay(false);
                setOrderTimeExpired(true);
                handleOrderClear();
                if (showSnackbar) {
                  handleSnackbar('Reservation time expired', 'warning');
                }
              }}
              handleSnackbar={handleSnackbar}
            />
            {isModalDisplayed && (
              <OrderConfirmationModal
                handleSnackbar={handleSnackbar}
                handleClose={() => {
                  setModalDisplay(false);
                }}
                setTimerOff={() => setTimerStarted(false)}
              />
            )}
          </OrderStateContainer>
        )}
      </SnackbarContext.Consumer>
      {rowCategories && (
        <SeatsScheme
          hallId={hallId}
          order={order}
          rowCategories={rowCategories}
          handleSeatPick={handleSeatPick}
          orderTimeExpired={orderTimeExpired}
        />
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
