import React, { useState } from 'react';
import styled from 'styled-components';

import SeatsMenu from './SeatsMenu';
import SeatsItems from './SeatsItems';

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

const SeatsContainer = () => {
  const [hall, setHall]: [any, any] = useState(null);
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

  return (
    <Container>
      <StyledTitle>Seats</StyledTitle>
      <SeatsMenu
        onHallChange={changeHall}
        onOptionsChange={changeOptions}
        options={options}
      />
      <SeatsItems />
    </Container>
  );
};

export default SeatsContainer;
