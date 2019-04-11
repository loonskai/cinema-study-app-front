import { OrderType } from '../interfaces/Api';
import { BonusOrderType } from '../components/seats/OrderConfirmationModal';

export default (order: OrderType) => ({
  sessionID: order.sessionID,
  seats: order.seatsPicked.map(item => ({ row: item.row, seat: item.seat })),
  bonuses: Object.values(order.bonuses)
    .filter((bonus: BonusOrderType) => !!bonus.quantity)
    .map((bonus: BonusOrderType) => ({
      id: bonus.id,
      quantity: bonus.quantity
    }))
});
