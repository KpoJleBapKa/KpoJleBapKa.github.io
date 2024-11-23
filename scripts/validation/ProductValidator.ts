import { Validator, ValidationResult } from './Validator';
import { Product } from '../models/Product';

export const productValidator: Validator<Product> = {
  validate: (data: Product): ValidationResult => {
    const errors: string[] = [];
    if (!data.name) errors.push("Name is required.");
    if (data.price < 0) errors.push("Price must be non-negative.");
    return { isValid: errors.length === 0, errors };
  }
}
