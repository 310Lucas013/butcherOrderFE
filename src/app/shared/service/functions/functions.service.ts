import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {ShoppingProduct} from '../../formData/shopping-product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  public httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  public functionSource = environment.functionPath;
  public onlineFunctionSource = environment.onlineFunctionPath;

  constructor(private http: HttpClient) {

  }

  getTotalOrderPrice(shoppingProducts: ShoppingProduct[]): Observable<number> {
    return this.http.post<number>(this.functionSource, shoppingProducts, this.httpOptions);
  }

  getOnlineTotalOrderPrice(shoppingProducts: ShoppingProduct[]): Observable<any> {
    return this.http.post<any>(this.onlineFunctionSource, shoppingProducts, this.httpOptions);
  }
}
