import { Validator, ValidationResult } from './Validator';

export class CompositeValidator<T> implements Validator<T> {
  private validators: Validator<T>[];

  constructor(validators: Validator<T>[]) {
    this.validators = validators;
  }

  validate(data: T): ValidationResult {
    const errors: string[] = [];
    this.validators.forEach(validator => {
      const result = validator.validate(data);
      if (!result.isValid && result.errors) {
        errors.push(...result.errors);
      }
    });
    return { isValid: errors.length === 0, errors };
  }
}
