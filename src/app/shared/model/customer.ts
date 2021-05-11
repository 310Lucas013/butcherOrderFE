import {Location} from './location';
import {PhoneNumber} from './phone-number';

export class Customer {
  id: number;
  credentialsId: number;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumbers: PhoneNumber[];
  locationId: number;
  location: Location;

  constructor(
    id: number,
    credentialsId: number,
    firstName: string,
    lastName: string,
    middleName: string,
    phoneNumbers: PhoneNumber[],
    locationId: number
  ) {
    this.id = id;
    this.credentialsId = credentialsId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumbers = phoneNumbers;
    this.locationId = locationId;
  }

}
