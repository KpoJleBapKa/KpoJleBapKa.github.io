export class CompositeValidator {
    validators;
    constructor(validators) {
        this.validators = validators;
    }
    validate(data) {
        const errors = [];
        this.validators.forEach(validator => {
            const result = validator.validate(data);
            if (!result.isValid && result.errors) {
                errors.push(...result.errors);
            }
        });
        return { isValid: errors.length === 0, errors };
    }
}
