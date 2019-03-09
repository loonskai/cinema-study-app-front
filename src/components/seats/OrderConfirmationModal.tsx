import React, { useState, useEffect } from 'react';
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
  toggleOrderConfirmationModal
}: any) => {
  const { sessionId, seatsPicked } = order;
  const totalPrice = +order.totalPrice;

  const [loadedBonuses, setLoadedBonuses]: [any, any] = useState(null);
  const [pickedBonuses, setPickedBonuses]: [any, any] = useState(null);

  useEffect(() => {
    if (!loadedBonuses) {
      loadBonuses();
    } else if (!pickedBonuses) {
      const bonusesKeys = Object.keys(loadedBonuses);
      const initialPickedBonuses = bonusesKeys.reduce((acc: any, bonus) => {
        acc[bonus] = 0;
        return acc;
      }, {});
      setPickedBonuses(initialPickedBonuses);
    }
  }, [pickedBonuses, loadedBonuses]);

  const loadBonuses = async () => {
    try {
      const data: any = await api.loadSessionBonuses(sessionId);
      setLoadedBonuses(data);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    if (!loadedBonuses || !pickedBonuses) return totalPrice;
    const bonusesTotalPrice = Object.keys(loadedBonuses)
      .map(key => loadedBonuses[key].price * pickedBonuses[key])
      .reduce((sum, num: any) => Math.round((sum + num) * 10) / 10);
    return bonusesTotalPrice + totalPrice;
  };

  const handleBonusesUpdate = (type: any, bonus: any) => {
    const bonusType = Object.keys(bonus)[0];
    let updatedPickedBonuses;
    switch (type) {
      case 'add': {
        updatedPickedBonuses = Object.assign({}, pickedBonuses, {
          [bonusType]: pickedBonuses[bonusType] + 1
        });
        break;
      }
      case 'remove': {
        updatedPickedBonuses = Object.assign({}, pickedBonuses, {
          [bonusType]: pickedBonuses[bonusType] - 1
        });
        break;
      }
      default:
        return null;
    }
    if (updatedPickedBonuses) {
      setPickedBonuses(updatedPickedBonuses);
    }
  };

  const handleBackgroundClick = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleOrderConfirmationModal(false);
    }
  };

  const handleSubmitOrder = (e: any) => {
    e.preventDefault();
    const orderComplete = Object.assign({}, order, pickedBonuses);
    console.log('submit order', orderComplete);
  };

  return (
    <Container onClick={handleBackgroundClick}>
      <ModalWindow>
        <CloseModalButton
          handleClick={() => toggleOrderConfirmationModal(false)}
        />
        <TotalPrice>Total price: ${calculateTotalPrice()}</TotalPrice>
        <TicketsAmount>Tickets amount: {seatsPicked.length}</TicketsAmount>
        <BonusContainer
          pickedBonuses={pickedBonuses}
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
};

export default connect(
  ({ orders }: { orders: any }) => ({
    order: orders.data
  }),
  actions
)(OrderConfirmationModal);
