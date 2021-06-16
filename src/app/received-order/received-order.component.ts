import {Component, OnInit} from '@angular/core';
import {OrderService} from '../shared/service/order/order.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {Order} from '../shared/model/order';
import {CustomerService} from '../shared/service/customer/customer.service';
import {Customer} from '../shared/model/customer';
import {ProductService} from '../shared/service/product/product.service';
import {Butcher} from '../shared/model/butcher';
import {ButcherService} from '../shared/service/butcher/butcher.service';
import {ShoppingProduct} from '../shared/formData/shopping-product';
import {FunctionsService} from '../shared/service/functions/functions.service';

@Component({
  selector: 'app-received-order',
  templateUrl: './received-order.component.html',
  styleUrls: ['./received-order.component.css']
})
export class ReceivedOrderComponent implements OnInit {

  accountType: string;
  butcherCredentialsId: number;
  orders: Order[];
  customers: Customer[];
  butcher: Butcher;
  selectedOrder: Order;
  totalPrices: number[];
  shoppingProducts: ShoppingProduct[][];

  constructor(private router: Router, private tokenService: TokenStorageService, private orderService: OrderService,
              private customerService: CustomerService, private productService: ProductService,
              private butcherService: ButcherService, private functionService: FunctionsService) {
    this.accountType = tokenService.getType();
    this.totalPrices = [];
    console.log(this.accountType);
    if (this.accountType !== 'BUTCHER') {
      this.router.navigate(['/home']);
    } else {
      this.butcherCredentialsId = Number(tokenService.getId());
      console.log(this.butcherCredentialsId);
      this.customers = [];
      this.orders = [];
      this.butcherService.getButcherByCredentialId(this.butcherCredentialsId).subscribe(butcher => {
        this.butcher = butcher;
        this.orderService.getButcherOrdersByCreatedStatus(this.butcher.id).subscribe(data => {
          this.orders = data;
          for (let i = 0; i < this.orders.length; i++) {
            this.customerService.getCustomerById(this.orders[i].customerId).subscribe(customer => {
              this.customers[i] = customer;
            });
            for (let j = 0; j < this.orders[i].products.length; j++) {
              this.productService.getProductById(this.orders[i].products[j].productId).subscribe(product => {
                console.log('begin product check');
                this.orders[i].products[j].product = product;
                this.shoppingProducts[i][j].product = product;
                this.shoppingProducts[i][j].amount = this.orders[i].products[j].amount;
                this.functionService.getOnlineTotalOrderPrice(this.shoppingProducts[i]).subscribe(price => {
                  this.totalPrices[i] = price.total;
                  console.log('end price check');
                });
              });
            }
            console.log(this.orders);
          }
        });
      });
    }
  }

  ngOnInit(): void {
    console.log(this.orders);
  }

  orderSelected(order: Order): void {

  }

  acceptOrder(): void {
    // todo use selectedOrder

  }

  declineOrder(): void {
    // todo use selectedOrder

  }

}
