import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AddAccount} from '../../formData/add-account';
import {Observable} from 'rxjs';
import {Account} from '../../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public source = environment.source + '/accounts';

  save(addAccount: AddAccount): Observable<Account> {
    const body = JSON.stringify(addAccount);
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<Account>(this.source, body, options);
  }


}
