import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from '../../ApiService';
import VipScheme from './types/VipScheme';
import BasicScheme from './types/BasicScheme';
import Screen from './elements/Screen';
import { containerGreyColor } from '../../constants';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  background: ${containerGreyColor};
`;

const SeatsContainer = styled.div`
  width: 100%;
`;

const SchemeContainer = ({ options, hall, handleReservation }: any) => {
  const [seats, setSeats]: [any, any] = useState(null);

  const loadSeats = async () => {
    try {
      const seatsLoaded: any = await api.loadHallSeats(hall, options);
      setSeats(seatsLoaded && seatsLoaded.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadSeats();
  }, [hall]);

  const renderSeats = () => {
    if (!seats || seats.length === 0) return 'No seats found';
    const seatElements = seats.map((type: any) => {
      switch (type.category) {
        case 'vip':
          return (
            <VipScheme
              key={type.category}
              items={type.items}
              handleClick={handleReservation}
            />
          );
        case 'basic':
          return (
            <BasicScheme
              key={type.category}
              items={type.items}
              handleClick={handleReservation}
            />
          );
        default:
          return null;
      }
    });
    return seatElements;
  };

  // if (!hall) return <div>Please, choose a hall</div>;

  return (
    <Container>
      <Screen>Screen</Screen>
      <SeatsContainer>{renderSeats()}</SeatsContainer>
    </Container>
  );
};

export default SchemeContainer;
