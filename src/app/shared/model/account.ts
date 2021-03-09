import {Location} from './location';

export class Account {
  id: number;
  email: string;
  uid: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  location: Location;

  constructor(
    id: number,
    email: string,
    uid: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumber: string,
    location: Location
  ) {
    this.id = id;
    this.email = email;
    this.uid = uid;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumber = phoneNumber;
    this.location = location;
  }

}
