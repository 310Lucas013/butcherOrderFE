import * as firebase from 'firebase/app';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
    this.updateLocalStorage();
  }

  // stores the state that determines if someone is logged in or not.
  userState: any;

  // Sends Email Verification Mail to the user.
  static sendEmailVerification(): void {
    firebase.default.auth().currentUser.sendEmailVerification()
      .then(data => {
        console.log(data);
      });
  }

  // checks if the current user is logged in or not.
  currentUser(): boolean {
    this.userState = JSON.parse(localStorage.getItem('user'));
    return !!this.userState;
  }

  // Sends Password Reset Email.
  async sendPasswordResetEmail(email: string): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase.default.auth().sendPasswordResetEmail(email).then(res => {
        console.log(res);
        console.log('Password Reset email is send to the user');
        resolve(res);
      }).catch(errors => {
        console.log('an error occurred sending Password Reset email to user');
        console.log(errors);
        reject(errors);
      });
    });
  }

  // Register User.
  createAccount(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().createUserWithEmailAndPassword(email, password).then(res => {
        resolve(res);
        console.log('Account created succesfully');
      }, error => {
        reject(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('there was an error in the creating of the account');
        console.log('error code: ' + errorCode + ' error message: ' + errorMessage);
      });
    });
  }

  // Sign out
  SignOut(): Promise<any> {
    return new Promise<any>(resolve => {
      this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        resolve(true);
      });
    });
  }

  async GoogleAuth(): Promise<any> {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    await this.afAuth.signInWithRedirect(provider);
    const credentials = await this.afAuth.getRedirectResult();
    console.log(credentials);
    return credentials.user;
  }

  AuthLogin(provider): any {
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        console.log('You have been successfully logged in!');
      }).catch((error) => {
        console.log(error);
      });
  }

  async persistenceLogin(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      firebase.default.auth().setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
        .then(result => {
          console.log('Success Login');
          this.afAuth.signInWithEmailAndPassword(email, password)
            .then(loginResult => {
              resolve(loginResult);
            }).catch(error => {
            reject(error);
          });
          console.log('Actually logged in');
        }, error => {
          console.log('Failure Login');
          reject(error);
        })
        .catch(error => {
          // alert(error);
          reject(error);
        });
    });
  }

  async updateLocalStorage(): Promise<any> {
    return new Promise<boolean>(resolve => {
      this.afAuth.authState.subscribe(async user => {
        let loggedIn: boolean;
        loggedIn = true;
        JSON.parse(localStorage.getItem('user'));
        if (await user) {
          this.userState = user;
          localStorage.setItem('user', JSON.stringify(this.userState));
          JSON.parse(localStorage.getItem('user'));
          loggedIn = true;
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
          loggedIn = false;
        }
        resolve(loggedIn);
      });
    });
  }

  async setUser(user: any): Promise<any> {
    this.userState = user;
    localStorage.setItem('user', JSON.stringify(this.userState));
  }
}
