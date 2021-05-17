import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {OrderDto} from '../../model/order-dto';
import {Observable} from 'rxjs';
import {Order} from '../../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public bearerToken = '';

  public orderSource = environment.gatewayPath + '/orders';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authentication: this.bearerToken }),
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.updateBearerToken();
  }

  createOrder(orderDto: OrderDto): Observable<Order> {
    return this.http.post<Order>(this.orderSource, orderDto, this.httpOptions);
  }

  updateBearerToken(): void {
    this.bearerToken = this.tokenStorageService.getToken();
  }
}
