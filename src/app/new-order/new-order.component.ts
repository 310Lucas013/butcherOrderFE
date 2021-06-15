import {Component, OnInit, ViewChild} from '@angular/core';
import {MatCalendar} from '@angular/material/datepicker';
import {Router} from '@angular/router';
import {ProductCategory} from '../shared/formData/ProductCategory';
import {Product} from '../shared/model/product';
import {OrderProduct} from '../shared/model/order-product';
import {ShoppingProduct} from '../shared/formData/shopping-product';
import {CustomDateAdapter} from '../shared/pipe/custom-date-adapter';
import {DateAdapter} from '@angular/material/core';
import {ProductService} from '../shared/service/product/product.service';
import {OrderService} from '../shared/service/order/order.service';
import {OrderDto} from '../shared/model/order-dto';
import {Order} from '../shared/model/order';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {OrderProductDto} from '../shared/model/order-product-dto';
import {Butcher} from '../shared/model/butcher';
import {ButcherService} from '../shared/service/butcher/butcher.service';
import {LocationService} from '../shared/service/location/location.service';
import {FunctionsService} from '../shared/service/functions/functions.service';


@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css'],
  providers: [{provide: DateAdapter, useClass: CustomDateAdapter }]
})
export class NewOrderComponent implements OnInit {

  currentPage: number;
  lastPage: number;

  @ViewChild('calendar') calendar: MatCalendar<Date>;

  accountType: string;
  selectedDate: Date;
  customerId: number;
  totalPrice: number;

  selectedProducts: ShoppingProduct[];

  productCategories: ProductCategory[];

  products: Product[];

  orderDto: OrderDto;
  order: Order;

  butchers: Butcher[];
  selectedButcher: Butcher;

  constructor(private router: Router, private tokenService: TokenStorageService,
              private productService: ProductService, private orderService: OrderService,
              private butcherService: ButcherService, private locationService: LocationService,
              private functionService: FunctionsService) {
    this.accountType = tokenService.getType();
    if (this.accountType !== 'CUSTOMER') {
      this.router.navigate(['/home']);
    } else {
      this.customerId = Number(tokenService.getId());
      this.selectedDate = new Date();
      this.currentPage = 0;
      this.lastPage = 2;
      this.products = [];
      this.productCategories = [];
      this.productCategories.push(new ProductCategory('../../assets/images/bbq.png', 'BBQ'));
      this.productCategories.push(new ProductCategory('../../assets/images/gourmet.png', 'GOURMET'));
      this.productCategories.push(new ProductCategory('../../assets/images/hooligan.png', 'GRILLPRODUCTEN'));
      this.selectedProducts = [];
      // todo get all butchers
      // todo get the location of the butchers by location id
      this.butcherService.getAllButchers().subscribe(data => {
        this.butchers = data;
        console.log(this.butchers);
        for (let i = 0; i < this.butchers.length; i++) {
          this.locationService.getLocationById(this.butchers[i].locationId).subscribe(location => {
            this.butchers[i].location = location;
            console.log(this.butchers);
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  selectLocation(butcher: Butcher): void {
    this.selectedButcher = butcher;
  }

  selectedCategory(index: number): void {
    console.log(index);
  }

  addToShoppingCart(product: Product): void {
    let newProduct = true;
    for (const p of this.selectedProducts) {
      if (p.product === product) {
        newProduct = false;
        p.amount += 1;
        console.log(p);
        this.functionService.getTotalOrderPrice(this.selectedProducts).subscribe(total => {
          console.log(total);
          this.totalPrice = Number(total);
          console.log(this.totalPrice);
        });
        break;
      }
    }
    console.log(this.selectedProducts);
    if (newProduct === true) {
      const sp = new ShoppingProduct();
      sp.product = product;
      sp.amount = 1;
      this.selectedProducts.push(sp);
      // console.log(JSON.stringify(this.selectedProducts));
      this.functionService.getTotalOrderPrice(this.selectedProducts).subscribe(total => {
        this.totalPrice = Number(total);
      });
    }
  }

  completeOrder(): void {
    // todo add all inputs
    this.orderDto = new OrderDto();
    this.orderDto.pickupDate = this.selectedDate;
    this.orderDto.customerId = this.customerId;
    // todo set actual locationId by getting it from selected butcher
    console.log(this.selectedButcher);
    this.orderDto.locationId = this.selectedButcher.locationId;
    this.orderDto.butcherId = this.selectedButcher.id;
    const orderProductDtos = [];
    for (const p of this.selectedProducts) {
      const op = new OrderProductDto();
      op.productId = p.product.id;
      op.amount = p.amount;
      orderProductDtos.push(op);
    }
    this.orderDto.products = orderProductDtos;
    console.log(this.orderDto);
    this.orderService.createOrder(this.orderDto).subscribe(data => {
      this.order = data;
    });
  }

  dateSelected(event: Date): void {
    console.log(event);
    this.selectedDate = event;
    console.log(this.selectedDate);
  }

  nextPage(): void {
    if (this.currentPage < this.lastPage) {
      this.currentPage += 1;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
    }
  }

}
