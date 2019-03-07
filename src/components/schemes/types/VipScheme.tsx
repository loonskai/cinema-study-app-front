import React from 'react';
import styled from 'styled-components';

import { ReservationContext } from '../../seats/SeatsContainer';
import SeatItem from '../elements/SeatItem';
import RowTitle from '../elements/RowTitle';
import { seats } from '../../../mocks';

const Container = styled.div``;

const RowItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const VipScheme = ({ items }: any) => {
  const renderItems = (handleReservation: any) => {
    return items.map((item: { row: number; seats: any }, index: number) => (
      <RowItem key={index}>
        <RowTitle row={item.row} />
        {item.seats.map((seat: any, index: number) => (
          <SeatItem
            key={index}
            row={item.row}
            seat={seat.id}
            isFree={seat.free}
            handleClick={handleReservation}
          />
        ))}
      </RowItem>
    ));
  };

  return (
    <Container>
      <ReservationContext.Consumer>
        {({ handleReservation }: any) => {
          return renderItems(handleReservation);
        }}
      </ReservationContext.Consumer>
    </Container>
  );
};

export default VipScheme;
