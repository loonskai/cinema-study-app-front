import { OrderType } from '../interfaces/Api';
import { BonusOrderType } from '../components/seats/OrderConfirmationModal';
import { OrderAPIType } from '../services/Order';

export default (order: OrderType): OrderAPIType => ({
  sessionID: order.sessionID,
  seats: order.seatsPicked.map(item => ({ row: item.row, seat: item.seat })),
  bonuses: Object.values(order.bonuses)
    .filter((bonus: BonusOrderType) => !!bonus.quantity)
    .map((bonus: BonusOrderType) => ({
      id: bonus.id,
      quantity: bonus.quantity
    }))
});
