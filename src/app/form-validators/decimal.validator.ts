import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function DecimalValidator(decimalPlace: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const decimalError = `Value must be lower than ${decimalPlace} decimal place(s)`;

    const decimals = Number(control.value).toFixed(decimalPlace);
    if (control.value == decimals || !control.value) {
      return null;
    }
    return { decimalError };
  };
}
