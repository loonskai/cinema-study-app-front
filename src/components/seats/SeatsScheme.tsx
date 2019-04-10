import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Screen from './elements/Screen';
import Row from './elements/Row';
import RowTitle from './elements/RowTitle';
import SeatItem from './elements/SeatItem';
import { containerGreyColor } from '../../constants';

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2rem 0;
  background: ${containerGreyColor};
  overflow-x: scroll;
`;

const SeatsScheme = ({
  rowCategories,
  // order,
  handleSeatPick,
  seats,
  orderTimeExpired
}: any) => {
  // const { seatsPicked } = order;

  const renderSeats = () => {
    if (!seats || !seats.rows || !seats.rows.length) {
      return 'No seats found';
    }
    const { rows } = seats;
    const rowCategoriesKeys = Object.keys(rowCategories);
    return rows.map((row: any, rowIndex: number) => {
      const seatsArr = new Array(row.seats).fill(true);
      return (
        <Row key={`row-${rowIndex + 1}`} lastInSection={row.lastInSection}>
          <RowTitle row={rowIndex + 1} />
          {seatsArr.map((el, seatIndex) => {
            /*             const isSelected = seatsPicked.some(
              (item: any) =>
                item && item.row === rowIndex + 1 && item.seat === seatIndex + 1
            ); */
            const isMuted =
              !rowCategories[row.categoryId].value &&
              rowCategoriesKeys.some((key: any) => rowCategories[key].value);

            return (
              <SeatItem
                key={`seat-${seatIndex + 1}`}
                categoryId={row.categoryId}
                row={rowIndex + 1}
                seat={seatIndex + 1}
                price={row.price}
                isSelected={isSelected}
                isReserved={
                  orderTimeExpired || row.reserved.includes(seatIndex + 1)
                }
                isOrdered={row.ordered.includes(seatIndex + 1)}
                isMuted={isMuted && !isSelected}
              />
            );
          })}
        </Row>
      );
    });
  };

  return (
    <Container>
      <Screen>Screen</Screen>
      <div onClick={handleSeatPick}>{renderSeats()}</div>
    </Container>
  );
};

export default connect(({ seats }: any, ownProps: any) => ({
  seats: seats.find((hallSeats: any) => hallSeats.hallId === ownProps.hallId)
}))(SeatsScheme);
