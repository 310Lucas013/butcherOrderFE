import {Product} from './product';
import {Schedule} from './schedule';
import {Location} from './location';

export class Butcher {
  id: number;
  name: string;
  scheduleList: Schedule[];
  products: Product[];
  locationId: number;
  phoneNumber: string;
  location: Location;

}
