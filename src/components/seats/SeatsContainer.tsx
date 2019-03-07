import React, { useState, useEffect, createContext } from 'react';
import styled from 'styled-components';

import SeatsMenu from './SeatsMenu';
import SchemeContainer from '../schemes/SchemeContainer';
import api from '../../ApiService';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  @media screen and (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const StyledTitle = styled.span`
  font-weight: 700;
  font-size: 20px;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

export const ReservationContext = createContext({});

const SeatsContainer = ({ sessionId }: { sessionId: number }) => {
  const [hall, setHall]: [any, any] = useState('');
  const [options, setOptions]: [any, any] = useState({
    vip: {
      label: 'VIP',
      value: true
    },
    forCouples: {
      label: 'For Couples',
      value: false
    },
    frontSeats: {
      label: 'Front Seats',
      value: false
    }
  });
  const [seatsReserved, setReservation]: [any, any] = useState([]);

  const reserve = async () => {
    try {
      await api.reserve({
        sessionId,
        hall,
        seatsReserved
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reserve();
  }, [seatsReserved]);

  const changeHall = (value: any) => {
    setHall(value);
  };

  const changeOptions = (key: any) => {
    const newOptions = Object.assign({}, options, {
      [key]: {
        label: options[key].label,
        value: !options[key].value
      }
    });
    setOptions(newOptions);
  };

  const handleReservation = (include: boolean, row: number, seat: number) => {
    let newSeatsReserved;
    if (include) {
      newSeatsReserved = seatsReserved.concat({ row, seat });
    } else {
      newSeatsReserved = seatsReserved.filter(
        (item: any) => !(item.row === row && item.seat === seat)
      );
    }
    setReservation(newSeatsReserved);
  };

  return (
    <Container>
      <StyledTitle>Seats</StyledTitle>
      <SeatsMenu
        onHallChange={changeHall}
        onOptionsChange={changeOptions}
        options={options}
        hallSelected={hall}
      />
      <ReservationContext.Provider value={{ handleReservation }}>
        <SchemeContainer options={options} hall={hall} />
      </ReservationContext.Provider>
    </Container>
  );
};

export default SeatsContainer;
