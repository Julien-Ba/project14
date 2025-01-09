export default function validateForm(fieldName, value) {
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            return {
                isValid: /^[a-zA-Z]{2,}$/.test(value),
                error: 'Must be at least 2 characters and contain only letters',
            };

        case 'dateOfBirth': {
            const date = new Date(value);
            return {
                isValid: !isNaN(date) && date < new Date(),
                error: 'Please enter a valid past date',
            };
        }

        case 'startDate':
            return {
                isValid: !isNaN(new Date(value)),
                error: 'Please enter a valid date',
            };

        case 'street':
            return {
                isValid: value.length >= 5,
                error: 'Street address must be at least 5 characters',
            };

        case 'city':
            return {
                isValid: /^[a-zA-Z\s]{2,}$/.test(value),
                error: 'City must contain only letters and spaces',
            };

        case 'zipCode':
            return {
                isValid: /^\d{5}(-\d{4})?$/.test(value),
                error: 'Enter a valid ZIP code (e.g., 12345 or 12345-6789)',
            };

        // state and department are already validated by being selects with fixed options
        default:
            return { isValid: true, error: null };
    }
}
