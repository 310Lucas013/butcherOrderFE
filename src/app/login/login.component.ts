import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmailValidator} from '../shared/pipe/EmailValidator';
import {AuthService} from '../shared/service/auth/auth.service';
import {LoginService} from '../shared/service/login/login.service';
import * as firebase from 'firebase/app';

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
    const credentials = firebase.default.auth().getRedirectResult();
    console.log(credentials);
    if (this.authService.currentUser()) {
      this.router.navigate(['/home']);
      if (!this.authService.userState.emailVerified) {
        AuthService.sendEmailVerification();
      }
    }
  }

  enterCheck(event: any): void {
    if (event.key === 'Enter') {
      this.logIn();
    }
  }

  async googleSignIn(): Promise<any> {
    this.authService.GoogleAuth()
      .then(async result => {
        console.log(result);
        this.authService.updateLocalStorage()
          .then(data => {
            if (data) {
              this.router.navigate(['/home']);
            }
          });
      });
  }

  forgotPassword(): void {
    this.router.navigate(['/forgotpassword'])
      .then(routerBoolean => {
        console.log('boolean from navigating to forgotpassword component is ' + routerBoolean);
      });
  }

  async logIn(): Promise<any> {
    // todo check if they are even filled and correctly formatted;
    // Checks if the status Valid is meaning everything is okay and no errors -> try login.
    this.checkEverything();
    if (this.allowed) {
      // Checks if the email adress or password is empty which is not possible.
      console.log(this.email);
      console.log(this.password);
      await this.authService.persistenceLogin(this.email, this.password)
        .then(data => {
          console.log(data);
          this.updateLoggedIn();
        }).catch(error => {
          let errorMessage = '';
          console.log('error');
          if (error.message === 'The password is invalid or the user does not have a password.') {
            errorMessage = 'Email en wachtwoord komen niet overeen';
            console.log(errorMessage);
          } else if (error.message === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
            errorMessage = 'Email en wachtwoord komen niet overeen';
            console.log(errorMessage);
          } else if (error.code.slice(0, 4) === 'auth') {
            errorMessage = 'Er is een fout opgetreden, controleer uw ingevoerde email en wachtwoord';
            console.log(errorMessage);
          } else {
            errorMessage = 'Het platform is momenteel in onderhoud probeer het later opnieuw';
            console.log(errorMessage);
          }
          console.log(error);
          console.log(error.message);
          this.componentError = errorMessage;
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

  async updateLoggedIn(): Promise<any> {
    this.tempBool = await this.authService.updateLocalStorage();
    if (this.tempBool) {
      this.loginService.login();
      this.router.navigate(['/account'])
        .then(routerBoolean => {
          console.log(routerBoolean);
        });
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

}
