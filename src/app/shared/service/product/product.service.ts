import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';
import {ProductDto} from '../../model/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public bearerToken = '';

  public productSource = environment.gatewayPath + '/products';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authentication: this.bearerToken }),
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.updateBearerToken();
  }

  createProduct(productDto: ProductDto): Observable<Product> {
    this.updateBearerToken();
    return this.http.post<Product>(this.productSource, productDto, this.httpOptions);
  }

  getProductById(productId: number): Observable<Product> {
    this.updateBearerToken();
    return this.http.get<Product>(this.productSource + '/' + productId, this.httpOptions);
  }

  getAllProducts(): Observable<Product[]> {
    this.updateBearerToken();
    return this.http.get<Product[]>(this.productSource, this.httpOptions);
  }

  updateBearerToken(): void {
    this.bearerToken = this.tokenStorageService.getToken();
  }
}
