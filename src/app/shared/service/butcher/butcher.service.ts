import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {Observable} from 'rxjs';
import {Butcher} from '../../model/butcher';

@Injectable({
  providedIn: 'root'
})
export class ButcherService {

  public bearerToken = '';

  public butcherSource = environment.gatewayPath + '/butchers';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authentication: this.bearerToken }),
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.updateBearerToken();
  }

  getAllButchers(): Observable<Butcher[]> {
    this.updateBearerToken();
    return this.http.get<Butcher[]>(this.butcherSource, this.httpOptions);
  }

  getButcherById(butcherId: number): Observable<Butcher> {
    this.updateBearerToken();
    return this.http.get<Butcher>(this.butcherSource + '/' + butcherId, this.httpOptions);
  }

  updateBearerToken(): void {
    this.bearerToken = this.tokenStorageService.getToken();
  }
}
