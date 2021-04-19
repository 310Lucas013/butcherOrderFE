import {Location} from './location';

export class Customer {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumbers: string[];
  location: Location;

  constructor(
    id: number,
    email: string,
    uid: string,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumbers: string[],
    location: Location
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumbers = phoneNumbers;
    this.location = location;
  }

}
