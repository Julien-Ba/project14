import validateForm from './createEmployeeFormVaildation';

export default function submitEmployeeCreation(formData, setEmployeeList) {
    const validations = Object.keys(formData).map((fieldName) => ({
        fieldName,
        ...validateForm(fieldName, formData[fieldName]),
    }));

    const hasErrors = validations.some((result) => !result.isValid);
    const errorField = hasErrors ? validations.find((result) => !result.isValid) : null;

    if (!hasErrors) {
        setEmployeeList((prev) => [...prev, formData]);
    }

    return {
        isValid: !hasErrors,
        error: errorField,
    };
}
