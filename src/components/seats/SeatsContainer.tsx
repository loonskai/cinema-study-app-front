import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import SeatsMenu from './SeatsMenu';
import OrderController from './OrderController';
import SeatsScheme from './SeatsScheme';
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
  const [seatsPicked, setPickedSeats]: [any, any] = useState([]);
  const [totalPrice, setTotalPrice]: [any, any] = useState(0);

  useEffect(() => {
    api.reserve({
      sessionId,
      hall,
      seatsPicked
    });
  }, [seatsPicked]);

  const changeHall = (value: any) => {
    setHall(value);
    setTotalPrice(0);
    setPickedSeats([]);
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

  const handleSeatPick = (e: any) => {
    const pickedRow = +e.target.dataset.row;
    const pickedSeat = +e.target.dataset.seat;
    const free = e.target.dataset.free === 'true';
    const price = +e.target.dataset.price;
    if (!pickedRow || !pickedSeat || !free) return;
    let newSeatsPicked;
    const pickedBefore = seatsPicked.some(
      (seat: any) => seat.row === pickedRow && seat.seat === pickedSeat
    );
    if (!pickedBefore) {
      newSeatsPicked = seatsPicked.concat({
        row: pickedRow,
        seat: pickedSeat,
        price
      });
    } else {
      newSeatsPicked = seatsPicked.filter(
        (item: any) => !(item.row === pickedRow && item.seat === pickedSeat)
      );
    }
    const newTotalPrice = newSeatsPicked.reduce(
      (sum: number, seat: any) => seat.price + sum,
      0
    );
    setTotalPrice(newTotalPrice);
    setPickedSeats(newSeatsPicked);
  };

  const clearOrder = () => {
    setPickedSeats([]);
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
      <OrderController
        handleOrderClear={clearOrder}
        totalPrice={totalPrice.toFixed(2)}
        order={{ sessionId, seatsPicked }}
      />
      <SeatsScheme
        seatsPicked={seatsPicked}
        options={options}
        hall={hall}
        handleSeatPick={handleSeatPick}
        totalPrice={totalPrice}
        clearOrder={clearOrder}
      />
    </Container>
  );
};

export default SeatsContainer;
