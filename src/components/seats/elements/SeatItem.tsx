import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import {
  seatFreeBg,
  seatFreeTxt,
  seatReservedBg,
  seatReservedTxt,
  seatOrderedBg,
  seatOrderedTxt,
  seatSelectedBg,
  seatSelectedTxt,
  goldColor
} from '../../../constants';

const Container = styled.div<any>`
  min-width: 1.875rem;
  height: 1.875rem;
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

  &.seat {
    background-color: ${seatFreeBg};
    color: ${seatFreeTxt};
  }

  &.seat-vip {
    background-color: ${goldColor};
    color: ${seatFreeTxt};
  }

  &.seat-selected {
    background-color: ${seatSelectedBg};
    color: ${seatSelectedTxt};
  }

  &.seat-reserved {
    background-color: ${seatReservedBg};
    color: ${seatReservedTxt};
  }

  &.seat-ordered {
    background-color: ${seatOrderedBg};
    color: ${seatOrderedTxt};
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
  const seatClass = classnames({
    seat: true,
    'seat-vip': category === 'vip',
    'seat-selected': isSelected,
    'seat-reserved': isReserved,
    'seat-ordered': isOrdered
  });

  return (
    <Container
      isFree={!isReserved && !isOrdered}
      isMuted={isMuted}
      className={seatClass}
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
