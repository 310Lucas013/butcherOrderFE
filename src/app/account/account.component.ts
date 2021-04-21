import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from '../shared/service/customer/customer.service';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {Customer} from '../shared/model/customer';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: number;
  customer: Customer;

  constructor(private router: Router, private customerService: CustomerService, private tokenService: TokenStorageService) {
    console.log('Hello');
    this.id = Number(tokenService.getId());
    console.log(this.id);
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = data;
      console.log(this.customer);
    });
  }

  ngOnInit(): void {
  }

  navigateToNewOrder(): void {
    this.router.navigate(['/new-order']);
  }

}
