import { Validator, ValidationResult } from './Validator';
import { Article } from '../models/Article';

export const articleValidator: Validator<Article> = {
  validate: (data: Article): ValidationResult => {
    const errors: string[] = [];
    if (!data.title) errors.push("Title is required.");
    if (!data.content) errors.push("Content is required.");
    return { isValid: errors.length === 0, errors };
  }
}
