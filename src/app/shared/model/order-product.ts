import {Order} from './order';
import {Product} from './product';

export class OrderProduct {
  productId: number;
  order: Order;
  amount: number;
  product: Product;
}
