import { Component, OnInit } from '@angular/core';
import {OrderService} from '../shared/service/order/order.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {Order} from '../shared/model/order';

@Component({
  selector: 'app-received-order',
  templateUrl: './received-order.component.html',
  styleUrls: ['./received-order.component.css']
})
export class ReceivedOrderComponent implements OnInit {

  butcherId: number;
  orders: Order[];

  constructor(private router: Router, private tokenService: TokenStorageService, private orderService: OrderService) {
    this.butcherId = Number(tokenService.getId());
    orderService.getButcherOrdersByCreatedStatus(this.butcherId).subscribe(data => {
      this.orders = data;
    });
  }

  ngOnInit(): void {
  }

}
