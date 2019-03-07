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
  seatSelectedTxt
} from '../../../constants';

const Container = styled.div<any>`
  width: 30px;
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
  cursor: ${({ isFree }: any) => (isFree ? 'pointer' : 'not-allowed')};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const SeatItem = ({ row, seat, isReserved, isPurchased }: any) => {
  const computeColors = () => {
    if (isReserved) {
      return {
        bgColor: seatReservedBg,
        txtColor: seatReservedTxt
      };
    }
    if (isPurchased) {
      return {
        bgColor: seatPurchasedBg,
        txtColor: seatPurchasedTxt
      };
    }
    return {
      bgColor: seatFreeBg,
      txtColor: seatFreeTxt
    };
  };

  const [isSelected, setSelected] = useState(false);
  const [theme, setTheme] = useState(computeColors());

  useEffect(() => {
    if (isSelected) {
      setTheme({
        bgColor: seatSelectedBg,
        txtColor: seatSelectedTxt
      });
    } else {
      setTheme(computeColors());
    }
  });

  const toggleSelect = (e: any) => {
    if (isReserved || isPurchased) {
      return;
    }
    setSelected(!isSelected);
  };

  return (
    <Container
      isFree={!isReserved && !isPurchased}
      theme={theme}
      onClick={toggleSelect}
      data-seat={seat}
      data-row={row}
      data-free={!isReserved && !isPurchased}
      data-selected={!isSelected}
    >
      {seat}
    </Container>
  );
};

export default SeatItem;
