import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Credentials} from '../../model/credentials';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public authSource = environment.authPath;

  login(credentials: Credentials): Observable<any> {
    return this.http.post(
      this.authSource + '/authenticate',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(credentials: Credentials): Observable<any> {
    return this.http.post(
      this.authSource + '/register',
      {
        email: credentials.email,
        password: credentials.password,
      },
      httpOptions
    );
  }
}
