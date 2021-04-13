import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth/auth.service';
import {Router} from '@angular/router';
import {AccountService} from '../shared/service/account/account.service';
import {EmailValidator} from '../shared/pipe/EmailValidator';
import {FieldValidator} from '../shared/pipe/field-validator';
import {AddAccount} from '../shared/formData/add-account';
import {Credentials} from '../shared/model/credentials';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Form Data
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  repeatPassword: string;

  // Register Properties
  id: number;
  uid: string;
  tempUid: string;

  addAccount: AddAccount;

  allowed: boolean;
  componentError: string;
  errorCause: string;

  constructor(private service: AccountService, private authService: AuthService, private router: Router) {
    this.email = '';
    this.password = '';
    this.allowed = false;
    this.componentError = '';
    this.errorCause = '';
  }


  ngOnInit(): void {
  }

  register(): void {
    this.checkEverything();
    if (this.allowed) {
      this.authService.register(new Credentials(this.email, this.password, this.firstName, this.middleName,
        this.lastName, [this.phoneNumber])).subscribe(result => {
        console.log(result);
      });
    }
  }

  checkEverything(): void {
    this.allowed = true;
    this.checkFirstName();
    this.checkMiddleName();
    this.checkLastName();
    this.checkPhoneNumber();
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
      this.errorCause = 'email';
    } else if (this.errorCause === 'email' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  checkPassword(): void {
    let errorMessage = this.checkRepeatPassword();
    console.log(errorMessage);
    if (this.checkEmpty(this.password)) {
      errorMessage = 'Wachtwoord is niet ingevuld';
    } else if (this.checkEmpty(this.repeatPassword)) {
      errorMessage = 'Herhaling van het wachtwoord is niet ingevuld';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
      this.errorCause = 'password';
    } else if (this.errorCause === 'password' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  checkEmpty(str: string): boolean {
    if (str === undefined) {
      return true;
    }
    return !str.replace(/\s/g, '').length;
  }

  checkRepeatPassword(): string {
    let errorMessage = '';
    if (this.password !== this.repeatPassword) {
      errorMessage = 'Wachtwoord en herhaling van wachtwoord komen niet overeen met elkaar';
    }
    return errorMessage;
  }

  checkFirstName(): void {
    let errorMessage = '';
    if (this.checkEmpty(this.firstName)) {
      errorMessage = 'Voornaam is niet ingevuld';
    } else if (FieldValidator.checkValidNameFormat(this.firstName)) {
      errorMessage = 'Voornaam bevat cijfers';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
      this.errorCause = 'firstName';
    } else if (this.errorCause === 'firstName' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  checkMiddleName(): void {
    let errorMessage = '';
    if (FieldValidator.checkValidNameFormat(this.middleName)) {
      errorMessage = 'Tussenvoegsel bevat cijfers';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
      this.errorCause = 'middleName';
    } else if (this.errorCause === 'middleName' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  checkLastName(): void {
    let errorMessage = '';
    if (this.checkEmpty(this.lastName)) {
      errorMessage = 'Achternaam is niet ingevuld';
    } else if (FieldValidator.checkValidNameFormat(this.lastName)) {
      errorMessage = 'Achternaam bevat cijfers';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
      this.errorCause = 'lastName';
    } else if (this.errorCause === 'lastName' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  checkPhoneNumber(): void {
    let errorMessage = '';
    if (this.checkEmpty(this.phoneNumber)) {
      errorMessage = 'Telefoonnummer is niet ingevuld';
    } else if (FieldValidator.checkValidPhoneNumberFormat(this.phoneNumber)) {
      errorMessage = 'Telefoonnummer mag alleen uit cijfers bestaan';
    }
    if (errorMessage !== '') {
      this.allowed = false;
      this.componentError = errorMessage;
      this.errorCause = 'phoneNumber';
    } else if (this.errorCause === 'phoneNumber' && errorMessage === '') {
      this.componentError = errorMessage;
      this.errorCause = '';
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
