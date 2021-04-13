export class AddAccount {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumbers: string[];

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumbers: string[],
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumbers = phoneNumbers;
  }
}
