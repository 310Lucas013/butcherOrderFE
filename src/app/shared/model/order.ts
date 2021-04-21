import {OrderStatus} from '../enum/order-status.enum';
import {OrderProduct} from './order-product';

export class Order {
  id: number;
  pickupDate: Date;
  orderStatus: OrderStatus;
  products: OrderProduct[];
  locationId: number;
  customerId: number;
}
