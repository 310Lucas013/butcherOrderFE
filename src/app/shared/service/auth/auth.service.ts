import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Credentials} from '../../model/credentials';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {UserDto} from '../../model/user-dto';
import {JwtRequest} from '../../formData/JwtRequest';
import {catchError} from 'rxjs/operators';

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
    console.log(credentials.email);
    console.log(credentials.password);
    return this.http.post(
      this.authSource + '/authenticate',
        {email: credentials.email,
              password: credentials.password}
      ,
      httpOptions
    );
  }

  register(userDto: UserDto): Observable<string> {
    return this.http.post<string>(
      this.authSource + '/register',
      userDto
      ,
      httpOptions
    );
  }

  // private handleError = (error: HttpErrorResponse) => {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }
}
