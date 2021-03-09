export class FieldValidator {

  static checkValidKvkNumberFormat(kvkNumber: string): boolean {
    const NUMBER_REGEXP = /^([0-9]*)$/;

    if (kvkNumber === undefined || (kvkNumber.length <= 8 || !NUMBER_REGEXP.test(kvkNumber))) {
      return false;
    }

    return true;
  }

  static checkValidNameFormat(name: string): boolean {
    const NAME_REGEXP = /^([^0-9]*)$/i;

    if (name === undefined || (name.length <= 1 || NAME_REGEXP.test(name))) {
      return false;
    }

    return true;
  }

  static checkValidPhoneNumberFormat(phoneNumber: string): boolean {
    const PHONENUMBER_REGEXP = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (phoneNumber === undefined || (phoneNumber.length <= 9 || PHONENUMBER_REGEXP.test(phoneNumber))) {
      return false;
    }

    return true;
  }
}
