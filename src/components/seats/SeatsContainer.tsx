import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SeatsMenu from './SeatsMenu';
import SeatsScheme from '../schemes/SeatsScheme';
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
  font-size: 1.25rem;
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
`;

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
  const [totalPrice, setTotalPrice]: [any, any] = useState(0);

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

  const handleReservation = (e: any) => {
    const row = +e.target.dataset.row;
    const seat = +e.target.dataset.seat;
    const free = e.target.dataset.free === 'true';
    const selected = e.target.dataset.selected === 'true';
    const price = +e.target.dataset.price;
    if (!row || !seat || !free) return;
    let newSeatsReserved;

    if (selected) {
      newSeatsReserved = seatsReserved.concat({ row, seat, price });
    } else {
      newSeatsReserved = seatsReserved.filter(
        (item: any) => !(item.row === row && item.seat === seat)
      );
    }
    const newTotalPrice = newSeatsReserved.reduce(
      (sum: number, seat: any) => seat.price + sum,
      0
    );
    setTotalPrice(newTotalPrice);
    setReservation(newSeatsReserved);
  };

  const clearOrder = () => {
    setReservation([]);
    setTotalPrice(0);
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
      <SeatsScheme
        seatsReserved={seatsReserved}
        options={options}
        hall={hall}
        handleReservation={handleReservation}
        totalPrice={totalPrice}
        clearOrder={clearOrder}
      />
    </Container>
  );
};

export default SeatsContainer;
