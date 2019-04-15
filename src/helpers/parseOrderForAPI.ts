import { OrderReduxType } from '../interfaces/Api';
import { OrderAPIType } from '../services/Order';

export default (order: OrderReduxType): OrderAPIType => ({
  sessionID: order.sessionID,
  seats: order.seatsPicked.map(item => ({ row: item.row, seat: item.seat })),
  bonuses: Object.values(order.bonuses)
    .filter((bonus: any) => !!bonus.quantity)
    .map((bonus: any) => ({
      id: bonus.id,
      quantity: bonus.quantity
    }))
});
