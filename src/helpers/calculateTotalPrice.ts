interface BonusType {
  quantity: number;
  price: number;
}

interface SeatPickedType {
  row: number;
  seat: number;
  price: number;
}

interface OrderType {
  bonuses: { [key: string]: BonusType };
  hallId: number;
  seatsPicked: SeatPickedType[];
  sessionId: number;
}

export default (order: OrderType): number => {
  const { seatsPicked, bonuses } = order;

  const bonusesPrice = bonuses
    ? Object.keys(bonuses).reduce((sum, key) => {
        return bonuses[key].quantity * bonuses[key].price + sum;
      }, 0)
    : 0;

  const seatsPrice = seatsPicked.reduce(
    (sum: number, seat: any) => seat.price + sum,
    0
  );
  return bonusesPrice + seatsPrice;
};
