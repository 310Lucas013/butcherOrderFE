export class Location {
  id: number;
  streetName: string;
  streetNumber: string;
  streetNumberAddition: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(
    id: number,
    streetName: string,
    streetNumber: string,
    streetNumberAddition: string,
    postalCode: string,
    city: string,
    country: string
  ) {
    this.id = id;
    this.streetName = streetName;
    this.streetNumber = streetNumber;
    this.streetNumberAddition = streetNumberAddition;
    this.postalCode = postalCode;
    this.city = city;
    this.country = country;
  }
}
