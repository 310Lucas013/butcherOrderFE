import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EmailValidator} from '../shared/pipe/EmailValidator';
import {AuthService} from '../shared/service/auth/auth.service';
import {LoginService} from '../shared/service/login/login.service';
import {Credentials} from '../shared/model/credentials';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';

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

  constructor(private authService: AuthService, private router: Router, private loginService: LoginService,
              private tokenService: TokenStorageService) {
    this.email = '';
    this.password = '';
    this.allowed = false;
    this.componentError = '';
  }

  ngOnInit(): void {
    if (this.tokenService.getToken() !== null) {
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
    if (this.tokenService.saveToken(token)) {
      this.router.navigate(['/home']);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

}
