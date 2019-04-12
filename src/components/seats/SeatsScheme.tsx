import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import actions from '../../redux/actions';
import Screen from './elements/Screen';
import Row from './elements/Row';
import RowTitle from './elements/RowTitle';
import SeatItem from './elements/SeatItem';
import { containerGreyColor } from '../../constants';
import { OrderReduxType, RowAPIType } from '../../interfaces/Api';

interface Props {
  rowCategories: any;
  order: OrderReduxType;
  handleSeatPick: (
    e: React.BaseSyntheticEvent<HTMLDivElement, MouseEvent>
  ) => Promise<void>;
  seats: {
    hallID: number;
    rows: RowAPIType[];
  };
  orderTimeExpired: boolean;
  loadAllSeats: any;
}

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

const SeatsScheme: React.FC<Props> = ({
  rowCategories,
  order,
  handleSeatPick,
  seats,
  orderTimeExpired,
  loadAllSeats
}) => {
  useEffect(() => {
    if (!seats) {
      loadAllSeats();
    }
  }, []);
  const { seatsPicked } = order;

  const renderSeats = () => {
    if (!seats || !seats.rows || !seats.rows.length) {
      return 'No seats found';
    }
    const { rows } = seats;
    const rowCategoriesKeys = Object.keys(rowCategories);
    return rows.map((row, rowIndex: number) => {
      const seatsArr = new Array(row.quantity).fill('row');
      return (
        <Row key={`row-${rowIndex + 1}`} lastInSection={row.lastInSection}>
          <RowTitle row={rowIndex + 1} />
          {seatsArr.map((el, seatIndex) => {
            const isSelected = seatsPicked.some(
              item =>
                item && item.row === rowIndex + 1 && item.seat === seatIndex + 1
            );
            const isMuted =
              !rowCategories[row['category-id']].value &&
              rowCategoriesKeys.some((key: string) => rowCategories[key].value);
            return (
              <SeatItem
                key={`seat-${seatIndex + 1}`}
                categoryId={row['category-id']}
                row={rowIndex + 1}
                seat={seatIndex + 1}
                price={row.price}
                isSelected={isSelected}
                isReserved={
                  orderTimeExpired ||
                  (row.reserved && row.reserved.includes(seatIndex + 1))
                }
                isOrdered={row.ordered && row.ordered.includes(seatIndex + 1)}
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

const mapStateToProps = ({ seats }: any, ownProps: any) => {
  const { sessionID } = ownProps;
  return {
    seats:
      seats && seats.find((hallSeats: any) => hallSeats.sessionID === sessionID)
  };
};

export default connect(
  mapStateToProps,
  actions
)(SeatsScheme);
