import { employeeService } from '@services/api/employee';
import validateForm from './createEmployeeFormVaildation';

/*
export default async function submitEmployeeCreation(formData) {
    const validations = Object.keys(formData).map((fieldName) => ({
        fieldName,
        ...validateForm(fieldName, formData[fieldName]),
    }));

    const hasErrors = validations.some((result) => !result.isValid);
    const errorField = hasErrors ? validations.find((result) => !result.isValid) : null;

    if (!hasErrors) {
        const result = await employeeService.createEmployee(formData);
        if (result.success) {
            console.log('Employee created:', result.data);
        } else {
            console.error('Error:', result.error);
        }
    }

    return {
        isValid: !hasErrors,
        error: errorField,
    };
}
*/

export default async function submitEmployeeCreation(formData) {
    for (const fieldName in formData) {
        const validation = validateForm(fieldName, formData[fieldName]);
        if (!validation.isValid) {
            return {
                isValid: false,
                error: { fieldName: fieldName, error: validation.error },
            };
        }
    }
    const result = await employeeService.createEmployee(formData);
    if (result.success) {
        console.log('Employee created:', result.data);
    } else {
        console.error('Error:', result.error);
    }
    return {
        isValid: true,
        error: null,
    };
}
