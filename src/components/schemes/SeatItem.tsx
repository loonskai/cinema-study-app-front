import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  seatFreeBg,
  seatFreeTxt,
  seatBookedBg,
  seatBookedTxt,
  seatSelectedBg,
  seatSelectedTxt
} from './../../constants';

const Container = styled.div<any>`
  width: 30px;
  height: 30px;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 5px;
  background: ${({ theme }: any) => theme.bgColor};
  color: ${({ theme }: any) => theme.txtColor};
  font-size: 12px;
  cursor: ${({ isFree }: any) => (isFree ? 'pointer' : 'not-allowed')};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const SeatItem = ({ row, seat, isFree }: any) => {
  const initialTheme = {
    bgColor: isFree ? seatFreeBg : seatBookedBg,
    txtColor: isFree ? seatFreeTxt : seatBookedTxt
  };
  const [isSelected, setSelected] = useState(false);
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    if (isSelected) {
      setTheme({
        bgColor: seatSelectedBg,
        txtColor: seatSelectedTxt
      });
    } else {
      setTheme(initialTheme);
    }
  });

  const toggleSelect = (e: any) => {
    if (!isFree) return;
    setSelected(!isSelected);
    console.log('selected ---', 'row: ', row, 'seat: ', seat);
  };

  return (
    <Container isFree={isFree} theme={theme} onClick={toggleSelect}>
      {seat}
    </Container>
  );
};

export default SeatItem;
