import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import orderService from '../../services/Order';
import actions from '../../redux/actions';
import { OrderReduxType } from '../../interfaces/Api';
import { loadCategoryCheckboxesByHall } from '../../helpers/loadSelectOptions';
import SeatsMenu from './SeatsMenu';
import OrderConfirmationModal from './OrderConfirmationModal';
import OrderController from './OrderController';
import OrderTimer from './OrderTimer';
import SeatsScheme from './SeatsScheme';
import { SnackbarContext } from '../../Layout';

interface Props {
  sessionID: number;
  cinemaID: number;
  hallID: number;
  order: OrderReduxType;
  setOrderInfo: any;
}

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

const SeatsContainer: React.FC<Props> = ({
  sessionID,
  cinemaID,
  hallID,
  order,
  setOrderInfo
}) => {
  const [rowCategories, setRowCategories] = useState<any>(null);
  const [isModalDisplayed, setModalDisplay] = useState<boolean>(false);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [orderTimeExpired, setOrderTimeExpired] = useState<boolean>(false);

  useEffect(() => {
    setOrderInfo({
      sessionID,
      hallID: order.hallID,
      seatsPicked: order.seatsPicked,
      bonuses: order.bonuses
    });
    if (!rowCategories) {
      loadCategoryCheckboxesByHall(hallID, setRowCategories);
    }
  }, []);

  const changeRowCategory = (key: number): void => {
    const newCategories = {
      ...rowCategories,
      [key]: {
        label: rowCategories[key].label,
        value: !rowCategories[key].value
      }
    };
    setRowCategories(newCategories);
  };

  const handleSeatPick = async (
    e: React.BaseSyntheticEvent<HTMLDivElement, MouseEvent>
  ): Promise<void> => {
    if (!timerStarted) {
      setTimerStarted(true);
    }
    const pickedRow = +e.target.dataset.row;
    const pickedSeat = +e.target.dataset.seat;
    const price = +e.target.dataset.price;
    const free = e.target.dataset.free === 'true';
    if (!pickedRow || !pickedSeat || !free) {
      return;
    }

    const { seatsPicked } = order;
    const pickedBefore = seatsPicked.some(
      item => item.row === pickedRow && item.seat === pickedSeat
    );
    /* API query*/
    const isReservationSuccesful = await orderService.toggleReservation(
      sessionID,
      { row: pickedRow, seat: pickedSeat }
    );

    if (isReservationSuccesful) {
      const newSeatsPicked = pickedBefore
        ? seatsPicked.filter(
            item => !(item.row === pickedRow && item.seat === pickedSeat)
          )
        : seatsPicked.concat({
            price,
            row: pickedRow,
            seat: pickedSeat
          });

      setOrderInfo({
        sessionID: order.sessionID,
        hallID: order.hallID,
        seatsPicked: newSeatsPicked,
        bonuses: order.bonuses
      });
    }
  };

  const handleOrderClear = async (seats?: any) => {
    await orderService.clearReservation(sessionID, order.seatsPicked);
    setOrderInfo({
      sessionID,
      hallID: order.hallID,
      seatsPicked: [],
      bonuses: null
    });
  };

  return (
    <Container>
      <StyledTitle>Seats</StyledTitle>
      {rowCategories && (
        <SeatsMenu
          handleChangeRowCategory={changeRowCategory}
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
                cinemaID={cinemaID}
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
          hallID={hallID}
          sessionID={sessionID}
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
  ({ order }: { order: OrderReduxType }) => ({
    order
  }),
  actions
)(SeatsContainer);
