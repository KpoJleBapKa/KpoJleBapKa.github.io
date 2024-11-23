export const productValidator = {
    validate: (data) => {
        const errors = [];
        if (!data.name)
            errors.push("Name is required.");
        if (data.price < 0)
            errors.push("Price must be non-negative.");
        return { isValid: errors.length === 0, errors };
    }
};
