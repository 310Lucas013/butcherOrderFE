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

  public bearerToken = '' as string;

  public butcherSource = environment.gatewayPath + '/butchers';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: this.updateBearerToken() }),
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

  getButcherByCredentialId(credentialId: number): Observable<Butcher> {
    this.updateBearerToken();
    console.log(this.bearerToken);
    console.log(this.httpOptions);
    return this.http.get<Butcher>(this.butcherSource + '/credentials/' + credentialId, this.httpOptions);
  }

  updateBearerToken(): string {
    this.bearerToken = this.tokenStorageService.getToken();
    console.log(this.bearerToken);
    return this.bearerToken;
  }
}
