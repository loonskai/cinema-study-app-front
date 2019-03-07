import React from 'react';
import styled from 'styled-components';

import SeatItem from './../SeatItem';
import { seats } from '../../mocks';

const Container = styled.div``;

const RowItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const RowTitle = styled.span`
  height: 30px;
  margin-left: -50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  font-size: 12px;
`;

const VipScheme = ({ items }: any) => {
  const renderItems = () => {
    return items.map((item: { row: number; seats: any }, index: number) => (
      <RowItem key={index}>
        <RowTitle>row {item.row}</RowTitle>
        {item.seats.map((seat: any, index: number) => (
          <SeatItem
            key={index}
            row={item.row}
            seat={seat.id}
            isFree={seat.free}
          />
        ))}
      </RowItem>
    ));
  };

  return <Container>{renderItems()}</Container>;
};

export default VipScheme;