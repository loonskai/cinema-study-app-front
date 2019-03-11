import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '../../ApiService';
import Screen from './elements/Screen';
import Row from './elements/Row';
import RowTitle from './elements/RowTitle';
import SeatItem from './elements/SeatItem';
import { containerGreyColor } from '../../constants';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  background: ${containerGreyColor};
  overflow-x: scroll;
`;

const SchemeWrapper = styled.div`
  width: 100%;
`;

const SeatsScheme = ({ options, hallId, handleSeatPick, seatsPicked }: any) => {
  const [seats, setSeats]: [any, any] = useState(null);

  const loadSeats = async () => {
    try {
      const seatsLoaded: any = await api.loadHallSeats(hallId, options);
      setSeats(seatsLoaded);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSeats();
  }, [hallId]);

  const renderSeats = () => {
    if (!seats || !seats.length) return 'No seats found';
    const { rows } = seats;
    const optionsKeys = Object.keys(options);
    return rows.map((row: any, rowIndex: number) => {
      const seatsArr = new Array(row.seats).fill(true);
      return (
        <Row key={`row-${rowIndex + 1}`} lastInSection={row.lastInSection}>
          <RowTitle row={rowIndex + 1} />
          {seatsArr.map((el, seatIndex) => {
            const isSelected = seatsPicked.some(
              (item: any) =>
                item && item.row === rowIndex + 1 && item.seat === seatIndex + 1
            );
            const isMuted =
              !options[row.category].value &&
              optionsKeys.some((key: any) => options[key].value);
            return (
              <SeatItem
                key={`seat-${seatIndex + 1}`}
                category={row.category}
                row={rowIndex + 1}
                seat={seatIndex + 1}
                price={row.price}
                isSelected={isSelected}
                isReserved={row.reserved.includes(seatIndex + 1)}
                isOrdered={row.ordered.includes(seatIndex + 1)}
                isMuted={isMuted && !isSelected}
              />
            );
          })}
        </Row>
      );
    });
  };

  return (
    <Container>
      <Screen>Screen</Screen>
      <SchemeWrapper onClick={handleSeatPick}>{renderSeats()}</SchemeWrapper>
    </Container>
  );
};

export default SeatsScheme;
