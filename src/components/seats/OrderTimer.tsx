import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 1rem 2rem;

  @media screen and (max-width: 375px) {
    width: 100%;
  }
`;

const Time = styled.div`
  width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
`;

const OrderTimer = () => {
  return (
    <Container>
      <span>Reservation time:</span>
      <Time>15:00</Time>
    </Container>
  );
};

export default OrderTimer;
