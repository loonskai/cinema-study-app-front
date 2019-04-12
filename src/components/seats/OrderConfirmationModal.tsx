import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';

import Bonus from '../../classes/Bonus';
import bonusService from '../../services/Bonus';
import orderService from '../../services/Order';
import actions from '../../redux/actions';
import BonusContainer from '../../components/bonus/BonusContainer';
import SubmitButton from '../buttons/SubmitButton';
import CloseModalButton from '../buttons/CloseModalButton';
import { whiteColor, greyColor } from '../../constants';
import calculateTotalPrice from '../../helpers/calculateTotalPrice';
import parseOrderForAPI from '../../helpers/parseOrderForAPI';
import { OrderType } from '../../interfaces/Api';

interface Props {
  cinemaID: number;
  order: OrderType;
  handleClose: any;
  handleSnackbar: any;
  setTimerOff: any;
  setOrderInfo: any;
}

export interface BonusOrderType {
  id: number;
  quantity: number;
  price: number;
}

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

const OrderConfirmationModal: React.FC<Props> = ({
  cinemaID,
  order,
  handleClose,
  handleSnackbar,
  setTimerOff,
  setOrderInfo
}) => {
  const { sessionID, seatsPicked } = order;

  const [loadedBonuses, setLoadedBonuses] = useState<Bonus[] | null>(null);
  const { bonuses } = order;

  useEffect(() => {
    if (!loadedBonuses) {
      bonusService.getAll({ cinemaID }, setLoadedBonuses);
    } else if (!bonuses) {
      const initialPickedBonuses = loadedBonuses.reduce(
        (acc, bonus) => {
          acc[bonus.title] = {
            id: bonus.id,
            quantity: 0,
            price: bonus.price
          };
          return acc;
        },
        {} as { [key: string]: BonusOrderType }
      );
      setOrderInfo({ ...order, bonuses: initialPickedBonuses });
    }
  }, [loadedBonuses]);

  const handleBonusesUpdate = (type: string, bonus: Bonus) => {
    let updatedPickedBonuses;
    switch (type) {
      case 'add': {
        updatedPickedBonuses = {
          ...bonuses,
          [bonus.title]: {
            ...bonuses[bonus.title],
            quantity: bonuses[bonus.title].quantity + 1
          }
        };
        break;
      }
      case 'remove': {
        updatedPickedBonuses = {
          ...bonuses,
          [bonus.title]: {
            ...bonuses[bonus.title],
            quantity: bonuses[bonus.title].quantity - 1
          }
        };
        break;
      }
      default:
        return null;
    }
    if (updatedPickedBonuses) {
      setOrderInfo({ ...order, bonuses: updatedPickedBonuses });
    }
  };

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    if (e.target === e.currentTarget) {
      handleClose(false);
    }
  };

  const handleSubmitOrder = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    try {
      e.preventDefault();
      const parsedOrder = parseOrderForAPI(order);
      const result = await orderService.create(parsedOrder);
      if (result) {
        setOrderInfo({
          sessionID: order.sessionID,
          hallID: order.hallID,
          seatsPicked: [],
          bonuses: null
        });
        handleClose(false);
        setTimerOff();
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
        <TotalPrice>Total price: ${calculateTotalPrice(order)}</TotalPrice>
        <TicketsAmount>Tickets amount: {seatsPicked.length}</TicketsAmount>
        {loadedBonuses && bonuses && (
          <BonusContainer
            bonuses={bonuses}
            loadedBonuses={loadedBonuses}
            handleBonusesUpdate={handleBonusesUpdate}
          />
        )}
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
  const domNode: Element | null = document.getElementById('modal');
  if (!domNode) {
    return null;
  }
  return createPortal(element, domNode);
};

export default connect(
  ({ order }: { order: OrderType }) => ({ order }),
  actions
)(OrderConfirmationModal);
