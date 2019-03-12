import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import api from '../../ApiService';
import actions from '../../redux/actions';
import BonusContainer from '../../components/bonus/BonusContainer';
import SubmitButton from '../buttons/SubmitButton';
import CloseModalButton from '../buttons/CloseModalButton';
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
  font-family: 'Bitter', serif;
  z-index: 500;
`;

const ModalWindow = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  box-shadow: 0px 0px 0px 1px ${greyColor};
  background: ${whiteColor};
`;

const TotalPrice = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
`;

const TicketsAmount = styled.div`
  width: 100%;
  font-size: 0.875rem;
`;

const OrderConfirmationModal = ({
  order,
  handleClose,
  handleSnackbar,
  setOrderInfo // from redux
}: any) => {
  const { sessionId, seatsPicked } = order;

  const [loadedBonuses, setLoadedBonuses]: [any, any] = useState(null);
  // const [pickedBonuses, setPickedBonuses]: [any, any] = useState(null);
  const { bonuses } = order;

  useEffect(() => {
    if (!loadedBonuses) {
      loadBonuses();
    } else if (!bonuses) {
      const bonusesKeys = Object.keys(loadedBonuses);
      const initialPickedBonuses = bonusesKeys.reduce((acc: any, bonus) => {
        acc[bonus] = 0;
        return acc;
      }, {});
      setOrderInfo({ ...order, bonuses: initialPickedBonuses });
    }
  }, [/*pickedBonuses, */ loadedBonuses]);

  const loadBonuses = async () => {
    try {
      const data: any = await api.loadSessionBonuses(sessionId);
      setLoadedBonuses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    if (!loadedBonuses || !bonuses) return order.totalPrice;
    const bonusesTotalPrice = Object.keys(loadedBonuses)
      .map(key => loadedBonuses[key].price * bonuses[key])
      .reduce((sum, num: any) => Math.round((sum + num) * 10) / 10);
    return bonusesTotalPrice + order.totalPrice;
  };

  const handleBonusesUpdate = (type: any, bonus: any) => {
    const bonusType = Object.keys(bonus)[0];
    let updatedPickedBonuses;
    switch (type) {
      case 'add': {
        updatedPickedBonuses = Object.assign({}, bonuses, {
          [bonusType]: bonuses[bonusType] + 1
        });
        break;
      }
      case 'remove': {
        updatedPickedBonuses = Object.assign({}, bonuses, {
          [bonusType]: bonuses[bonusType] - 1
        });
        break;
      }
      default:
        return null;
    }
    if (updatedPickedBonuses) {
      setOrderInfo({ ...order, bonuses: updatedPickedBonuses });
    }
  };

  const handleBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleClose(false);
    }
  };

  const handleSubmitOrder = async (e: any) => {
    try {
      e.preventDefault();
      /*       const orderComplete = {
        ...order
      }; */
      const result = await api.submitOrder(order);
      if (result) {
        setOrderInfo({
          sessionId: order.sessionId,
          hallId: order.hallId,
          seatsPicked: [],
          totalPrice: 0
        });
        handleClose(false);
        handleSnackbar('Tickets ordered successfully!', 'success');
      } else {
        handleClose(false);
        handleSnackbar('Something went wrong', 'error');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const element = (
    <Container onClick={handleBackgroundClick}>
      <ModalWindow>
        <CloseModalButton handleClick={() => handleClose(false)} />
        <TotalPrice>Total price: ${calculateTotalPrice()}</TotalPrice>
        <TicketsAmount>Tickets amount: {seatsPicked.length}</TicketsAmount>
        <BonusContainer
          pickedBonuses={bonuses}
          loadedBonuses={loadedBonuses}
          handleBonusesUpdate={handleBonusesUpdate}
        />
        <form onSubmit={handleSubmitOrder}>
          <SubmitButton
            icon={<LocalGroceryStoreIcon />}
            text="Submit Order"
            disabled={false}
          />
        </form>
      </ModalWindow>
    </Container>
  );
  const domNode: any = document.getElementById('modal');
  return createPortal(element, domNode);
};

export default connect(
  ({ order }: { order: any }) => ({ order }),
  actions
)(OrderConfirmationModal);
