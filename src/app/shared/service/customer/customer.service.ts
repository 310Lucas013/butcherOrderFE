import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../../model/customer';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {TokenStorageService} from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public bearerToken = '';

  public customerSource = environment.gatewayPath + '/customers';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authentication: this.bearerToken }),
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.updateBearerToken();
  }

  getCustomerById(id: number): Observable<Customer> {
    this.updateBearerToken();
    return this.http.get<Customer>(this.customerSource + '/' + id, this.httpOptions);
  }

  updateBearerToken(): void {
    this.bearerToken = this.tokenStorageService.getToken();
  }
}
