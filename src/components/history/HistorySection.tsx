import React, { useState } from 'react';
import styled from 'styled-components';

import HistorySectionTabs from './HistorySectionTabs';
import { greyColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  border-radius: 10px;
  border: 1px solid ${greyColor};
  overflow: hidden;
`;

const HistoryContent = styled.div`
  padding: 2rem;
`;

const HistorySection = ({ orders }: any) => {
  console.log('orders', orders);
  const [tabSelected, setTebSelected] = useState('upcoming');

  const handleTabSelect = (e: any) => {
    const { name }: { name: string } = e.target.dataset;
    if (tabSelected === name) return;
    switch (name) {
      case 'upcoming':
      case 'past': {
        setTebSelected(name);
      }
      default:
        return null;
    }
  };

  const renderOrders = () => {
    const ordersToRender = orders[tabSelected];
    if (!ordersToRender) return 'Nothing found';
    return ordersToRender.map((order: any) => {
      return (
        <div>
          <div>{order.city}</div>
          <div>{order.cinema}</div>
          <div>{order.date}</div>
          <div>{order.time}</div>
          <div>Link: {order.movie.title}</div>
          <div>Tickets amount: {order.order.length}</div>
          <div>Total price: {order.totalPrice}</div>
        </div>
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
