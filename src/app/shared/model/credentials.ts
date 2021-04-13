export class Credentials {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumbers: string[];

  constructor(email: string, password: string,
              firstName: string, middleName: string, lastName: string,
              phoneNumbers: string[]) {
    this.email = email;
    this.password = password;
  }

}
