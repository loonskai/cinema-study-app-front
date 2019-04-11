import { OrderType } from '../interfaces/Api';

export default (order: OrderType): number => {
  const { seatsPicked, bonuses } = order;

  const bonusesPrice = bonuses
    ? Object.keys(bonuses).reduce((sum, key) => {
        return bonuses[key].quantity * bonuses[key].price + sum;
      }, 0)
    : 0;

  const seatsPrice = seatsPicked.reduce(
    (sum: number, seat) => (seat.price ? seat.price + sum : 0),
    0
  );
  return bonusesPrice + seatsPrice;
};
