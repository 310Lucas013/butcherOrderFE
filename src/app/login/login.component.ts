import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmailValidator} from '../shared/pipe/EmailValidator';
import {AuthService} from '../shared/service/auth/auth.service';
import {LoginService} from '../shared/service/login/login.service';
import * as firebase from 'firebase/app';
import {Credentials} from '../shared/model/credentials';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  tempBool: boolean;
  componentError: string;
  allowed: boolean;

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService) {
    this.email = '';
    this.password = '';
    this.allowed = false;
    this.componentError = '';
  }

  ngOnInit(): void {
    const credentials = firebase.auth().getRedirectResult();
    console.log(credentials);
    if (this.authService.getBearerToken() !== '') {
      this.router.navigate(['/home']);
    }
  }

  enterCheck(event: any): void {
    if (event.key === 'Enter') {
      this.logIn();
    }
  }

  async logIn(): Promise<any> {
    this.checkEverything();
    if (this.allowed) {
      const credentials = new Credentials(this.email, this.password);
      this.authService.login(credentials).subscribe(token => {
        if (token !== null && token !== '') {
          this.updateLoggedIn(token);
        }
      });
    } else {
      console.log('gets into the else');
      this.checkEverything();
    }
  }

  checkEverything(): void {
    this.allowed = true;
    this.checkPassword();
    this.checkEmail();
  }

  checkEmail(): void {
    let errorMessage = '';
    if (this.checkEmpty(this.email)) {
      errorMessage = 'Email is niet ingevuld';
    } else if (!EmailValidator.checkValidMailFormat(this.email)) {
      errorMessage = 'Een geldig email adres is vereist';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
    }
  }

  checkPassword(): void {
    let errorMessage = '';
    if (this.checkEmpty(this.password)) {
      errorMessage = 'Wachtwoord is niet ingevuld';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
    }
  }

  checkEmpty(str: string): boolean {
    return !str.replace(/\s/g, '').length;
  }

  updateLoggedIn(token: string): void {
    const result = this.authService.updateBearerToken(token);
    if (result) {
      this.router.navigate(['/home']);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

}
