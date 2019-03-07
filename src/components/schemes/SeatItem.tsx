import React from 'react';
import styled from 'styled-components';

import {
  seatFreeBg,
  seatFreeTxt,
  seatBookedBg,
  seatBookedTxt
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
  background: ${({ isFree }: any) => (isFree ? seatFreeBg : seatBookedBg)};
  color: ${({ isFree }: any) => (isFree ? seatFreeTxt : seatBookedTxt)};
  font-size: 12px;
  cursor: ${({ isFree }: any) => (isFree ? 'pointer' : 'not-allowed')};

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const SeatItem = ({ row, seat, isFree }: any) => {
  return <Container isFree={isFree}>{seat}</Container>;
};

export default SeatItem;
