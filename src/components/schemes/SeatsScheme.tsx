import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '../../ApiService';
import Screen from './elements/Screen';
import Row from './elements/Row';
import RowTitle from './elements/RowTitle';
import SeatItem from './elements/SeatItem';
import { containerGreyColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  background: ${containerGreyColor};
`;

const SchemeWrapper = styled.div`
  width: 100%;
`;

const SeatsScheme = ({ options, hall, handleReservation }: any) => {
  const [seats, setSeats]: [any, any] = useState(null);

  const loadSeats = async () => {
    try {
      const seatsLoaded: any = await api.loadHallSeats(hall, options);
      setSeats(seatsLoaded);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSeats();
  }, [hall]);

  const renderSeats = () => {
    if (!seats || seats.length === 0) return 'No seats found';
    const { rows } = seats;
    return rows.map((row: any, rowIndex: number) => {
      const seatsArr = new Array(row.seats).fill(true);
      return (
        <Row key={rowIndex.toString()} lastInSection={row.lastInSection}>
          <RowTitle row={rowIndex + 1} />
          {seatsArr.map((el, seatIndex) => (
            <SeatItem
              key={seatIndex}
              row={rowIndex + 1}
              seat={seatIndex + 1}
              isReserved={row.reserved.includes(seatIndex + 1)}
              isOrdered={row.ordered.includes(seatIndex + 1)}
            />
          ))}
        </Row>
      );
    });
  };

  // if (!hall) return <div>Please, choose a hall</div>;

  return (
    <Container>
      <Screen>Screen</Screen>
      <SchemeWrapper onClick={handleReservation}>{renderSeats()}</SchemeWrapper>
    </Container>
  );
};

export default SeatsScheme;
