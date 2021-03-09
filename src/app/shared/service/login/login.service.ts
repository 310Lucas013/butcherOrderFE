import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  @Output() loggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  login(): void {
    this.loggedIn.emit('success');
  }

  getLoginEmitter(): EventEmitter<any> {
    return this.loggedIn;
  }
}

