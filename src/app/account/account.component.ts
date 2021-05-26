import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CustomerService} from '../shared/service/customer/customer.service';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';
import {Customer} from '../shared/model/customer';
import {LocationDto} from '../shared/model/location-dto';
import {LocationService} from '../shared/service/location/location.service';
import {Location} from '../shared/model/location';
import {PhoneNumber} from '../shared/model/phone-number';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: number;
  customer: Customer;
  editInfo: boolean;
  // firstName: string;
  // middleName: string;
  // lastName: string;
  // streetName: string;
  // streetNumber: number;
  // streetNumberAddition: string;
  // zipCode: string;
  // city: string;
  // country: string;
  // phoneNumber: string;
  location: Location;

  constructor(private router: Router, private customerService: CustomerService, private tokenService: TokenStorageService,
              private locationService: LocationService) {
    console.log('Hello');
    this.editInfo = false;
    // this.firstName = 'Luuk';
    // this.lastName = 'Vermeer';
    // this.streetName = 'Burgemeester Rauppstraat';
    // this.streetNumber = 1;
    // this.zipCode = '5037MG';
    // // this.phoneNumber = '0657357895';
    // this.city = 'Tilburg';
    // this.country = 'Nederland';
    this.id = Number(tokenService.getId());
    console.log(this.id);
    this.customerService.getCustomerById(this.id).subscribe(data => {
      this.customer = data;
      console.log(this.customer);
      this.locationService.getLocationById(this.customer.locationId).subscribe(l => {
        this.customer.location = l;
      });
    });
  }

  ngOnInit(): void {
  }

  navigateToNewOrder(): void {
    this.router.navigate(['/new-order']);
  }

  editInformation(): void {
    this.editInfo = true;
  }

  saveInformation(): void {
    const locationDto = new LocationDto();
    locationDto.streetName = this.customer.location.streetName;
    locationDto.streetNumber = this.customer.location.streetNumber;
    locationDto.streetNumberAddition = this.customer.location.streetNumberAddition;
    locationDto.postalCode = this.customer.location.postalCode;
    locationDto.city = this.customer.location.city;
    locationDto.country = this.customer.location.country;
    this.locationService.createLocation(locationDto).subscribe(data => {
      this.location = data;
      console.log(this.location);
      // const phoneNumbers = [];
      // const p = new PhoneNumber();
      // p.id = null;
      // p.phoneNumber = this.phoneNumber;
      // phoneNumbers.push(p);
      const updateCustomer = new Customer(this.customer.id, this.customer.credentialsId,
        this.customer.firstName, this.customer.lastName, this.customer.middleName,
        this.customer.phoneNumbers, this.location.id);
      this.customerService.updateCustomer(updateCustomer).subscribe(c => {
        this.customer = c;
        console.log(this.customer);
      });

    });

    this.editInfo = false;
  }

  phoneNumberChange(): void {
    console.log(this.customer.phoneNumbers);
  }
}
