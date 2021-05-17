import {MeatType} from '../enum/meat-type.enum';
import {ProductCategory} from '../formData/ProductCategory';
import {QuantityMeasurement} from '../enum/quantity-measurement.enum';

export class ProductDto {
  productNumber: string;
  name: string;
  price: number;
  meatTypes: MeatType[];
  productCategory: ProductCategory;
  shortName: string;
  quantityMeasurement: QuantityMeasurement;
}
