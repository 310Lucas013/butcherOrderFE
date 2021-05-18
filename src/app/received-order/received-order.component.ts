import { Component, OnInit } from '@angular/core';
import {OrderService} from '../shared/service/order/order.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {Order} from '../shared/model/order';
import {CustomerService} from '../shared/service/customer/customer.service';
import {Customer} from '../shared/model/customer';
import {ProductService} from '../shared/service/product/product.service';

@Component({
  selector: 'app-received-order',
  templateUrl: './received-order.component.html',
  styleUrls: ['./received-order.component.css']
})
export class ReceivedOrderComponent implements OnInit {

  butcherId: number;
  orders: Order[];
  customers: Customer[];

  constructor(private router: Router, private tokenService: TokenStorageService, private orderService: OrderService,
              private customerService: CustomerService, private productService: ProductService) {
    this.butcherId = Number(tokenService.getId());
    this.customers = [];
    this.orders = [];
    this.orderService.getButcherOrdersByCreatedStatus(this.butcherId).subscribe(data => {
      this.orders = data;
      for (let i = 0; i < this.orders.length; i++) {
        this.customerService.getCustomerById(this.orders[i].customerId).subscribe(customer => {
          this.customers[i] = customer;
        });
        for (let j = 0; j < this.orders[i].products.length; j++) {
          this.productService.getProductById(this.orders[i].products[j].productId).subscribe(product => {
            this.orders[i].products[j].product = product;
          });
        }
        console.log(this.orders);
      }
    });
  }

  ngOnInit(): void {
    console.log(this.orders);
  }

  acceptOrder(order: Order): void {

  }

  declineOrder(order: Order): void {

  }

}
