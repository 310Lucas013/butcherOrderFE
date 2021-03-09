export class AddAccount {
  email: string;
  uid: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  streetName: string;
  streetNumber: string;
  streetNumberAddition: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(
    email: string,
    uid: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    streetName: string,
    streetNumber: string,
    streetNumberAddition: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    this.email = email;
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumber = phoneNumber;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.streetNumberAddition = streetNumberAddition;
    this.postalCode = postalCode;
    this.city = city;
    this.country = country;
  }
}
