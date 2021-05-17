import {OrderProductDto} from './order-product-dto';

export class OrderDto {
  pickupDate: Date;
  products: OrderProductDto[];
  locationId: number;
  customerId: number;
}
