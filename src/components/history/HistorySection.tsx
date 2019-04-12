import React, { useState } from 'react';
import styled from 'styled-components';

import Order from '../../classes/Order';
import HistorySectionTabs from './HistorySectionTabs';
import { greyColor, whiteColor, containerGreyColor } from '../../constants';

interface Props {
  orders: Order[] | null;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  border-radius: 0.625rem;
  border: 1px solid ${greyColor};
  overflow: hidden;
`;

const HistoryContent = styled.div`
  width: 100%;
  padding: 2rem;
`;

const OrderContainer = styled.div<any>`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: ${({ isRelevant }: { isRelevant: boolean }) =>
    isRelevant ? whiteColor : containerGreyColor};
  border-radius: 0.625rem;
  box-shadow: ${({ isRelevant }: { isRelevant: boolean }) =>
    isRelevant ? '0px 0px 20px -5px rgba(0, 0, 0, 0.3)' : 'none'};
`;

const MainTextRow = styled.div`
  font-weight: 700;
  margin-bottom: 0.3rem;

  &:last-child {
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 1.175rem;
  }
`;

const TextRow = styled.div`
  margin-bottom: 0.3rem;
`;

const HistorySection: React.FC<Props> = ({ orders }) => {
  const [tabSelected, setTebSelected] = useState('upcoming');

  const handleTabSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name } = e.target.dataset;
    if (tabSelected === name) {
      return;
    }
    switch (name) {
      case 'upcoming':
      case 'past': {
        setTebSelected(name);
      }
      default:
        return;
    }
  };

  const filterOrdersOnDate = () => {
    const now = new Date();
    const filteredOrders =
      orders &&
      orders.filter(order => {
        switch (tabSelected) {
          case 'upcoming':
            return order.session.dateOriginalFormat >= now;
          case 'past':
            return order.session.dateOriginalFormat < now;
          default:
            return false;
        }
      });
    return filteredOrders;
  };

  const renderOrders = () => {
    const ordersToRender = orders && filterOrdersOnDate();
    if (!ordersToRender) {
      return 'Nothing found';
    }
    return ordersToRender.map((order, index: number) => {
      return (
        <OrderContainer
          key={index.toString()}
          isRelevant={tabSelected === 'upcoming'}
        >
          <MainTextRow>
            {order.cinema.city}, {order.cinema.title} cinema
          </MainTextRow>
          <MainTextRow>
            {order.session.date}, {order.session.time}
          </MainTextRow>
          <TextRow>Movie: {order.movie.title}</TextRow>
          <TextRow>Tickets amount: {order.seats.length}</TextRow>
        </OrderContainer>
      );
    });
  };

  return (
    <Container>
      <HistorySectionTabs
        handleTabSelect={handleTabSelect}
        tabSelected={tabSelected}
      />
      <HistoryContent>{renderOrders()}</HistoryContent>
    </Container>
  );
};

export default HistorySection;
