import { AbstractControl, ValidationErrors } from '@angular/forms';

// Fails if the value is a string made only of whitespace
export function forbiddenValue(forbiddenValue: string): (control: AbstractControl) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (typeof value === 'string' && value === forbiddenValue) {
      return { forbidden: true };
    }
    return null;
  };
}