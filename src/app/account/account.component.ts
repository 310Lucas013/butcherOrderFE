import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from '../shared/service/customer/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
  }

  navigateToNewOrder(): void {
    this.router.navigate(['/new-order']);
  }

}
