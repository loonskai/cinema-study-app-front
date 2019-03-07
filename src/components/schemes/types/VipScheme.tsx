import React from 'react';
import styled from 'styled-components';

import SeatItem from '../elements/SeatItem';
import RowTitle from '../elements/RowTitle';

const Container = styled.div``;

const RowItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const VipScheme = ({ items, handleClick }: any) => {
  const renderItems = () => {
    return items.map((row: any, rowIndex: number) => {
      const seatsArr = new Array(row.seatsNumber).fill(true);
      return (
        <RowItem key={rowIndex.toString()}>
          <RowTitle row={rowIndex + 1} />
          {seatsArr.map((el, seatIndex) => (
            <SeatItem
              key={seatIndex}
              row={rowIndex + 1}
              seat={seatIndex + 1}
              isReserved={row.seatsReserved.includes(seatIndex + 1)}
              isPurchased={row.seatsPurchased.includes(seatIndex + 1)}
            />
          ))}
        </RowItem>
      );
    });
  };

  return <Container onClick={handleClick}>{renderItems()}</Container>;
};

export default VipScheme;
