import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import api from './../ApiService';
import {
  screenBgColor,
  screenTxtColor,
  containerGreyColor
} from './../constants';
import SeatItem from './SeatItem';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem;
  background: ${containerGreyColor};
`;

const Screen = styled.div`
  width: 100%;
  max-width: 300px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 1rem;
  text-transform: uppercase;
  background: ${screenBgColor};
  color: ${screenTxtColor};
`;

const SeatsScheme = ({ options, hall }: any) => {
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
    // if (!seats || seats.length === 0) return 'No seats found';
    console.log(seats);
  };

  // if (!hall) return <div>Please, choose a hall</div>;

  return (
    <Container>
      <Screen>Screen</Screen>
      {renderSeats()}
    </Container>
  );
};

export default SeatsScheme;
