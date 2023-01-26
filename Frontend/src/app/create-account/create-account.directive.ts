import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function forbiddenPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character
    const forbidden =
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}/.test(
        control.value
      );
    return forbidden ? null : { forbiddenPassword: { value: control.value } };
  };
}
