export class UserDto {
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
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phoneNumbers = phoneNumbers;
  }

}
