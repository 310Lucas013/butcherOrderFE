export class AddAccount {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumbers: string[];
  streetName: string;
  streetNumber: string;
  streetNumberAddition: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumbers: string[],
    streetName: string,
    streetNumber: string,
    streetNumberAddition: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumbers = phoneNumbers;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.streetNumberAddition = streetNumberAddition;
    this.postalCode = postalCode;
    this.city = city;
    this.country = country;
  }
}
