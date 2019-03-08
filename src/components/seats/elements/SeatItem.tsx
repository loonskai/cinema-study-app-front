import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  seatFreeBg,
  seatFreeTxt,
  seatReservedBg,
  seatReservedTxt,
  seatPurchasedBg,
  seatPurchasedTxt,
  seatSelectedBg,
  seatSelectedTxt,
  goldColor
} from '../../../constants';

const Container = styled.div<any>`
  min-width: 30px;
  height: 30px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.3125rem;
  background: ${({ theme }: any) => theme.bgColor};
  color: ${({ theme }: any) => theme.txtColor};
  font-size: 0.75rem;
  cursor: ${({ isFree }: { isFree: boolean }) =>
    isFree ? 'pointer' : 'not-allowed'};
  opacity: ${({ isMuted }: { isMuted: boolean }) => (isMuted ? '0.3' : '1')};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const SeatItem = ({
  row,
  seat,
  price,
  category,
  isSelected,
  isReserved,
  isOrdered,
  isMuted
}: any) => {
  const computeColors = () => {
    if (isReserved) {
      return {
        bgColor: seatReservedBg,
        txtColor: seatReservedTxt
      };
    }
    if (isOrdered) {
      return {
        bgColor: seatPurchasedBg,
        txtColor: seatPurchasedTxt
      };
    }
    if (isSelected) {
      return {
        bgColor: seatSelectedBg,
        txtColor: seatSelectedTxt
      };
    }
    if (category === 'vip') {
      return {
        bgColor: goldColor,
        txtColor: seatFreeTxt
      };
    }
    return {
      bgColor: seatFreeBg,
      txtColor: seatFreeTxt
    };
  };

  const [theme, setTheme] = useState(computeColors());

  useEffect(() => {
    setTheme(computeColors());
  }, [isSelected]);

  return (
    <Container
      isFree={!isReserved && !isOrdered}
      isMuted={isMuted}
      theme={theme}
      category={category}
      data-seat={seat}
      data-row={row}
      data-price={price}
      data-free={!isReserved && !isOrdered}
    >
      {seat}
    </Container>
  );
};

export default SeatItem;
