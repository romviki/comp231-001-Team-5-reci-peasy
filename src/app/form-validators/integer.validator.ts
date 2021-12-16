import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function IntegerValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const integerError = `Value must be an integer`;
    try {
      if (Number.isInteger(+control.value)) {
        return null;
      }
    } catch (e) {
      return { integerError };
    }
    return { integerError };
  };
}
