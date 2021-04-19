import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Credentials} from '../../model/credentials';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserDto} from '../../model/user-dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authSource = environment.gatewayPath + '/credentials';
  public bearerToken: string;

  constructor(private http: HttpClient) {
    this.bearerToken = '';
  }

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

  register(userDto: UserDto): Observable<any> {
    return this.http.post(
      this.authSource + '/register',
      userDto
      ,
      httpOptions
    );
  }
}
