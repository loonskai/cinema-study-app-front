export default (order: any) => {
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
